import { animateScroll } from '../../src/utils';
import { createSerializer } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import React from 'react';
import ScrollSlider from '../../src/components/ScrollSlider';

jest.mock('../../src/utils/animate', () => ({
    __esModule: true,
    default: jest.fn((callback) => {
        callback.progress();
        callback.done();
    }),
    animateScroll: jest.fn(),
}));

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
    itemsToShow: 2,
    setItemsLength: jest.fn(),
    goTo: jest.fn(),
};

describe('<ScrollSlider />', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        expect.addSnapshotSerializer(createSerializer());
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    describe('<ScrollSlider /> - props', () => {
        it('should render correctly with the required props', () => {
            const wrapper = shallow(<ScrollSlider {...mockRequiredProps} />);

            expect(wrapper.find('.slide')).toHaveLength(4);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render correctly with aditional props', () => {
            const mockProps = {
                ...mockRequiredProps,
                limitScroll: true,
                className: 'dummyClassName',
            };
            const wrapper = shallow(<ScrollSlider {...mockProps} />);

            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('<ScrollSlider> - lifecycling', () => {
        it('should call setItemsLength after first mount', () => {
            shallow(<ScrollSlider {...mockRequiredProps} />, {
                disableLifecycleMethods: false,
            });

            expect(mockRequiredProps.setItemsLength).toHaveBeenCalledTimes(1);
            expect(mockRequiredProps.setItemsLength).toHaveBeenCalledWith(4);
        });

        it('should call moveToItem when active item changes', () => {
            const spyMoveToItem = jest.spyOn(
                ScrollSlider.prototype,
                '_moveToItem'
            );

            const wrapper = shallow(<ScrollSlider {...mockRequiredProps} />, {
                disableLifecycleMethods: false,
            });

            wrapper.setProps({ activeItem: 1 });

            expect(spyMoveToItem).toHaveBeenCalledTimes(1);
        });

        it('should not call moveToItem when active item does not change', () => {
            const spyMoveToItem = jest.spyOn(
                ScrollSlider.prototype,
                '_moveToItem'
            );

            const wrapper = shallow(<ScrollSlider {...mockRequiredProps} />, {
                disableLifecycleMethods: false,
            });

            wrapper.setProps({ activeItem: 0 });

            expect(spyMoveToItem).toHaveBeenCalledTimes(0);
        });
    });

    describe('_moveToItem', () => {
        it('should return null when current containerRef is not defined', () => {
            const spyMoveToItem = jest.spyOn(
                ScrollSlider.prototype,
                '_moveToItem'
            );

            const wrapper = shallow(<ScrollSlider {...mockRequiredProps} />);

            const instance = wrapper.instance();

            instance._moveToItem();

            expect(spyMoveToItem).toHaveReturnedWith(null);
            expect(animateScroll).toHaveBeenCalledTimes(0);
        });

        it('should request animation frame when containerRef is defined', () => {
            const wrapper = shallow(<ScrollSlider {...mockRequiredProps} />);

            const instance = wrapper.instance();

            instance.containerRef.current = {
                offsetWidth: 100,
                scrollLeft: 1,
            };

            instance._moveToItem();

            expect(animateScroll).toHaveBeenCalledTimes(1);
        });

        it('should request animation frame when containerRef is defined and is rtl', () => {
            const wrapper = shallow(
                <ScrollSlider {...mockRequiredProps} isRTL />
            );

            const instance = wrapper.instance();

            instance.containerRef.current = {
                offsetWidth: 100,
                scrollLeft: 1,
            };

            instance._moveToItem();

            expect(animateScroll).toHaveBeenCalledTimes(1);
        });
    });

    describe('_forceScrollSnapStop', () => {
        it('should return null when containerRef is not defined', () => {
            const spyForceScrollSnapStop = jest.spyOn(
                ScrollSlider.prototype,
                '_forceScrollSnapStop'
            );

            const wrapper = shallow(<ScrollSlider {...mockRequiredProps} />);

            const instance = wrapper.instance();

            instance._forceScrollSnapStop(50, 1);

            expect(spyForceScrollSnapStop).toHaveReturnedWith(null);
            expect(mockRequiredProps.goTo).toHaveBeenCalledTimes(0);
        });

        it('should call goTo and set timeout for overflow and isPreventingScroll', () => {
            const wrapper = shallow(<ScrollSlider {...mockRequiredProps} />);

            const instance = wrapper.instance();

            instance.containerRef.current = {
                style: {
                    overflow: 'dummy',
                },
            };

            instance._forceScrollSnapStop(50, 1);

            expect(instance.containerRef.current.style.overflow).toBe('hidden');
            expect(instance.isPreventingScroll).toBe(true);

            jest.runAllTimers();

            expect(instance.containerRef.current.style.overflow).toBe('');
            expect(instance.isPreventingScroll).toBe(false);
            expect(mockRequiredProps.goTo).toHaveBeenCalledTimes(1);
            expect(mockRequiredProps.goTo).toHaveBeenCalledWith(1);
        });
    });

    describe('_verifyActiveItem', () => {
        it('should return null when active item does not change', () => {
            const spyVerifyActiveItem = jest.spyOn(
                ScrollSlider.prototype,
                '_verifyActiveItem'
            );

            const wrapper = shallow(<ScrollSlider {...mockRequiredProps} />);

            const instance = wrapper.instance();

            instance.containerRef.current = {
                offsetWidth: 100,
                scrollLeft: 1,
            };

            instance._verifyActiveItem();

            expect(spyVerifyActiveItem).toHaveReturnedWith(null);
            expect(mockRequiredProps.goTo).toHaveBeenCalledTimes(0);
        });

        it('should call goTo and set new active item correctly when active item changes', () => {
            const wrapper = shallow(<ScrollSlider {...mockRequiredProps} />);

            const instance = wrapper.instance();

            instance.containerRef.current = {
                offsetWidth: 100,
                scrollLeft: 51,
            };

            instance._verifyActiveItem();

            expect(mockRequiredProps.goTo).toHaveBeenCalledTimes(1);
            expect(mockRequiredProps.goTo).toHaveBeenCalledWith(1);
        });

        it('should call goTo and set new active item correctly when active item changes and is rtl', () => {
            const wrapper = shallow(
                <ScrollSlider {...mockRequiredProps} isRTL />
            );

            const instance = wrapper.instance();

            instance.containerRef.current = {
                offsetWidth: 100,
                scrollLeft: 51,
            };

            instance._verifyActiveItem();

            expect(mockRequiredProps.goTo).toHaveBeenCalledTimes(1);
            expect(mockRequiredProps.goTo).toHaveBeenCalledWith(1);
        });
    });

    describe('_handleScroll', () => {
        it('should return null when shouldMoveToItem is already true', () => {
            const spyHandleScroll = jest.spyOn(
                ScrollSlider.prototype,
                '_handleScroll'
            );
            const spyVerifyActiveItem = jest.spyOn(
                ScrollSlider.prototype,
                '_verifyActiveItem'
            );

            const wrapper = shallow(<ScrollSlider {...mockRequiredProps} />);

            wrapper.setProps({ activeItem: 1 });

            const instance = wrapper.instance();

            instance._handleScroll();

            expect(instance.shouldMoveToItem).toBe(true);
            expect(spyHandleScroll).toHaveReturnedWith(null);
            expect(spyVerifyActiveItem).toHaveBeenCalledTimes(0);
        });

        it('should return null when scroll is locked', () => {
            const spyHandleScroll = jest.spyOn(
                ScrollSlider.prototype,
                '_handleScroll'
            );
            const spyVerifyActiveItem = jest.spyOn(
                ScrollSlider.prototype,
                '_verifyActiveItem'
            );

            const wrapper = shallow(<ScrollSlider {...mockRequiredProps} />);

            const instance = wrapper.instance();

            instance.isPreventingScroll = true;

            const event = {
                stopPropagation: jest.fn(),
                preventDefault: jest.fn(),
            };

            instance._handleScroll(event);

            expect(event.preventDefault).toHaveBeenCalledTimes(1);
            expect(event.stopPropagation).toHaveBeenCalledTimes(1);
            expect(spyHandleScroll).toHaveReturnedWith(null);
            expect(spyVerifyActiveItem).toHaveBeenCalledTimes(0);
        });

        it('should verify active item when limit scroll is not active', () => {
            const spyVerifyActiveItem = jest.spyOn(
                ScrollSlider.prototype,
                '_verifyActiveItem'
            );

            const wrapper = shallow(<ScrollSlider {...mockRequiredProps} />);

            const instance = wrapper.instance();

            instance.containerRef.current = {
                offsetWidth: 100,
                scrollLeft: 100,
            };

            instance._handleScroll();

            jest.runAllTimers();

            expect(spyVerifyActiveItem).toHaveBeenCalledTimes(1);
        });

        it('should force scroll stop when limit scroll is active and forward scroll exceeds limit', () => {
            const spyForceScrollSnapStop = jest
                .spyOn(ScrollSlider.prototype, '_forceScrollSnapStop')
                .mockImplementation(() => null);

            const wrapper = shallow(
                <ScrollSlider {...mockRequiredProps} limitScroll />
            );

            const instance = wrapper.instance();

            instance.containerRef.current = {
                offsetWidth: 100,
                scrollLeft: 100,
            };

            const event = {
                stopPropagation: jest.fn(),
                preventDefault: jest.fn(),
            };

            instance._handleScroll(event);

            expect(spyForceScrollSnapStop).toHaveBeenCalledTimes(1);
            expect(spyForceScrollSnapStop).toHaveBeenCalledWith(50, 1);
        });

        it('should force scroll stop when limit scroll is active and back scroll exceeds limit', () => {
            const spyForceScrollSnapStop = jest
                .spyOn(ScrollSlider.prototype, '_forceScrollSnapStop')
                .mockImplementation(() => null);

            const wrapper = shallow(
                <ScrollSlider {...mockRequiredProps} limitScroll />
            );

            const instance = wrapper.instance();

            instance.containerRef.current = {
                offsetWidth: 100,
                scrollLeft: -100,
            };

            instance.activeItem = 3;

            const event = {
                stopPropagation: jest.fn(),
                preventDefault: jest.fn(),
            };

            instance._handleScroll(event);

            expect(spyForceScrollSnapStop).toHaveBeenCalledTimes(1);
            expect(spyForceScrollSnapStop).toHaveBeenCalledWith(100, 2);
        });

        it('should verify active item when limit scroll is defined and scroll does not exceed limit', () => {
            const spyVerifyActiveItem = jest.spyOn(
                ScrollSlider.prototype,
                '_verifyActiveItem'
            );

            const wrapper = shallow(
                <ScrollSlider {...mockRequiredProps} limitScroll />
            );

            const instance = wrapper.instance();

            instance.containerRef.current = {
                offsetWidth: 100,
                scrollLeft: 1,
            };

            instance._handleScroll();

            jest.runAllTimers();

            expect(spyVerifyActiveItem).toHaveBeenCalledTimes(1);
        });
    });
});
