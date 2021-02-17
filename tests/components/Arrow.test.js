import { shallow } from 'enzyme';
import Arrow from '../../src/components/Arrow';
import React from 'react';
import mockCarouselContext from '../context/mockCarouselContext';
import mockCarouselContextTypes from '../context/mockCarouselContextTypes';

describe('<Arrow />', () => {
    const generateWrapper = (props, children, context = mockCarouselContext) =>
        shallow(<Arrow {...props}>{children}</Arrow>, {
            context,
        });
    const MockComponent = jest.fn((props) => (
        <div {...props}>Test component</div>
    ));

    beforeAll(() => {
        Arrow.contextTypes = mockCarouselContextTypes;
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call, on click, the context goPrev() when the flow is prev', () => {
        const wrapper = generateWrapper({ flow: 'prev' }, MockComponent);

        wrapper.simulate('click');

        expect(mockCarouselContext.goPrev).toHaveBeenCalledTimes(1);
    });

    it('should call, on click, the context goPrev() when the flow is next', () => {
        const wrapper = generateWrapper({ flow: 'next' }, MockComponent);

        wrapper.simulate('click');

        expect(mockCarouselContext.goNext).toHaveBeenCalledTimes(1);
    });

    it('should call onClick() when it is passed', () => {
        const mockOnClick = jest.fn();
        const wrapper = generateWrapper(
            {
                flow: 'prev',
                onClick: mockOnClick,
            },
            MockComponent
        );

        wrapper.simulate('click');

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should not call context functions with an invalid flow', () => {
        const wrapper = generateWrapper({ flow: 'testing' }, MockComponent);

        wrapper.simulate('click');

        expect(mockCarouselContext.goNext).not.toHaveBeenCalled();
        expect(mockCarouselContext.goPrev).not.toHaveBeenCalled();
    });

    it('should call the on click, even with an invalid flow', () => {
        const mockOnClick = jest.fn();
        const wrapper = generateWrapper(
            { flow: 'testing', onClick: mockOnClick },
            MockComponent
        );

        wrapper.simulate('click');

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should set isLastItem to true when is last item', () => {
        const anotherContext = {
            ...mockCarouselContext,
            activeItem: 1,
            itemsLength: 2,
        };

        const wrapper = generateWrapper(
            { flow: 'next' },
            MockComponent,
            anotherContext
        );

        expect(wrapper.find('div').prop('isLastItem')).toBe(true);
        expect(wrapper.find('div').prop('isFirstItem')).toBe(false);
    });

    it('should set isFirstItem to true when is first item', () => {
        const anotherContext = {
            ...mockCarouselContext,
            activeItem: 0,
            itemsLength: 2,
        };

        const wrapper = generateWrapper(
            { flow: 'next' },
            MockComponent,
            anotherContext
        );

        expect(wrapper.find('div').prop('isLastItem')).toBe(false);
        expect(wrapper.find('div').prop('isFirstItem')).toBe(true);
    });

    it('should set isFirstItem and isLastItem to false when is not first/last item', () => {
        const anotherContext = {
            ...mockCarouselContext,
            activeItem: 1,
            itemsLength: 4,
        };

        const wrapper = generateWrapper(
            { flow: 'next' },
            MockComponent,
            anotherContext
        );

        expect(wrapper.find('div').prop('isLastItem')).toBe(false);
        expect(wrapper.find('div').prop('isFirstItem')).toBe(false);
    });
});
