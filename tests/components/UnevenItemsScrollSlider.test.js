import { animateScroll } from '../../src/utils';
import { createSerializer } from 'enzyme-to-json';
// At the time of writing, enzyme still does not support shallow for useEffect
import { mount, shallow } from 'enzyme';
import React from 'react';
import UnevenItemsScrollSlider from '../../src/components/UnevenItemsScrollSlider';

jest.mock('../../src/utils/animate', () => ({
    __esModule: true,
    default: jest.fn((callback) => {
        callback.progress();
        callback.done();
    }),
    animateScroll: jest.fn(),
}));

Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
    configurable: true,
    get: function () {
        return this._scrollWidth || 0;
    },
    set(val) {
        this._scrollWidth = val;
    },
});

Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get: function () {
        return this._offsetWidth || 0;
    },
    set(val) {
        this._offsetWidth = val;
    },
});

const children = [
    <div key="0">First slide</div>,
    <div key="1">Second slide</div>,
    <div key="2">Third slide</div>,
    <div key="3">Fourth slide</div>,
];

const mockRequiredProps = {
    activeItem: 0,
    children,
    isRTL: false,
    itemsLength: 5,
    setItemsLength: jest.fn(),
    goTo: jest.fn(),
};

describe('<UnevenItemsScrollSlider />', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        expect.addSnapshotSerializer(createSerializer());
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    describe('<UnevenItemsScrollSlider /> - props', () => {
        it('should render correctly with the required props', () => {
            const wrapper = shallow(
                <UnevenItemsScrollSlider {...mockRequiredProps} />
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('should render correctly with additional props', () => {
            const mockProps = {
                ...mockRequiredProps,
                ratioToScroll: 1,
                className: 'dummyClassName',
            };
            const wrapper = shallow(<UnevenItemsScrollSlider {...mockProps} />);

            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('Synchronizing itemsLength', () => {
        it('should call setItemsLength after first mount', () => {
            mount(<UnevenItemsScrollSlider {...mockRequiredProps} />);

            expect(mockRequiredProps.setItemsLength).toHaveBeenCalledTimes(1);
            // Cannot test arguments for setItemsLength for mount scenario due to limitations with JSDOM
        });

        it('should call setItemsLength when ratioToScroll changes sufficiently', () => {
            const wrapper = mount(
                <UnevenItemsScrollSlider {...mockRequiredProps} />
            );

            const containerElement = wrapper.childAt(0).getDOMNode();
            containerElement.offsetWidth = 500;
            containerElement.scrollWidth = 980;

            const ratioToScrollThatWouldChangeItemsLength = 0.2;
            wrapper.setProps({
                ratioToScroll: ratioToScrollThatWouldChangeItemsLength,
            });
            expect(mockRequiredProps.setItemsLength).toHaveBeenCalledTimes(2);
            expect(mockRequiredProps.setItemsLength).toHaveBeenCalledWith(6);
        });
    });

    describe('Synchronizing scroll position of UnevenItemsScrollSlider', () => {
        it('should call animateScroll when active item changes', () => {
            const wrapper = mount(
                <UnevenItemsScrollSlider {...mockRequiredProps} />
            );

            wrapper.setProps({ activeItem: 1 });

            expect(animateScroll).toHaveBeenCalledTimes(1);
        });

        it('should not call animateScroll when active item does not change', () => {
            const wrapper = shallow(
                <UnevenItemsScrollSlider {...mockRequiredProps} />
            );

            wrapper.setProps({ activeItem: 0 });

            expect(animateScroll).toHaveBeenCalledTimes(0);
        });

        it('should call animateScroll to correct position when active item changes and RTL is set', () => {
            const wrapper = mount(
                <UnevenItemsScrollSlider
                    {...mockRequiredProps}
                    isRTL
                    ratioToScroll={0.3}
                />
            );
            const containerElement = wrapper.childAt(0).getDOMNode();
            containerElement.offsetWidth = 500;
            containerElement.scrollWidth = 980;

            wrapper.setProps({
                activeItem: 3,
            });

            expect(animateScroll).toHaveBeenCalledTimes(1);
            expect(animateScroll).toHaveBeenCalledWith(
                containerElement,
                150,
                0.3
            );
        });

        it('should call animateScroll to correct position when ratioToScroll changes sufficiently', () => {
            const wrapper = mount(
                <UnevenItemsScrollSlider
                    {...mockRequiredProps}
                    ratioToScroll={1}
                />
            );

            const containerElement = wrapper.childAt(0).getDOMNode();
            containerElement.offsetWidth = 500;
            containerElement.scrollWidth = 980;

            wrapper.setProps({
                activeItem: 1,
            });

            const ratioToScrollThatWouldChangeActiveItem = 0.4;
            wrapper.setProps({
                ratioToScroll: ratioToScrollThatWouldChangeActiveItem,
            });

            expect(animateScroll).toHaveBeenCalledTimes(2);
            expect(animateScroll).toHaveBeenLastCalledWith(
                containerElement,
                200,
                0.3
            );
        });
    });

    describe('Manual scrolling', () => {
        it('should call goTo with correct active item when scrolls to a different active item', () => {
            const wrapper = mount(
                <UnevenItemsScrollSlider
                    {...mockRequiredProps}
                    ratioToScroll={0.5}
                />
            );

            const containerWrapper = wrapper.childAt(0);
            const containerElement = containerWrapper.getDOMNode();
            containerElement.offsetWidth = 500;
            containerElement.scrollWidth = 980;
            const startScrollForActiveItem1 = 250;
            containerElement.scrollLeft = startScrollForActiveItem1;
            wrapper.setProps({ itemsLength: 3 });

            containerWrapper.simulate('scroll');
            jest.runAllTimers();
            expect(mockRequiredProps.goTo).toHaveBeenCalledTimes(1);
            expect(mockRequiredProps.goTo).toHaveBeenCalledWith(1);
        });

        it('should call goTo with correct active item when scrolls to a different active item with RTL enabled', () => {
            jest.clearAllTimers();
            const wrapper = mount(
                <UnevenItemsScrollSlider
                    {...mockRequiredProps}
                    ratioToScroll={0.5}
                    isRTL
                />
            );

            jest.runAllTimers();
            const containerWrapper = wrapper.childAt(0);
            const containerElement = containerWrapper.getDOMNode();
            containerElement.offsetWidth = 500;
            containerElement.scrollWidth = 980;
            const startScrollForActiveItem2 = 0;
            containerElement.scrollLeft = startScrollForActiveItem2;

            wrapper.setProps({ itemsLength: 3 });
            containerWrapper.simulate('scroll');
            jest.runAllTimers();
            expect(mockRequiredProps.goTo).toHaveBeenCalledTimes(1);
            expect(mockRequiredProps.goTo).toHaveBeenCalledWith(2);
        });
    });
});
