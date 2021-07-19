import { createSerializer } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import React from 'react';
import SwipeSliderContainer from '../../src/containers/SwipeSliderContainer';

const mockContextCarousel = {
    activeItem: 1,
    isRTL: false,
    itemsToShow: 2,
    isInfinite: false,
    setItemsLength: jest.fn(),
    setIsMovementBlocked: jest.fn(),
    goNext: jest.fn(),
    goPrev: jest.fn(),
};

const mockChildren = <div />;

beforeAll(() => {
    expect.addSnapshotSerializer(createSerializer());
});

describe('<SwipeSliderContainer/>', () => {
    it('should render correctly', () => {
        const tree = shallow(
            <SwipeSliderContainer>{mockChildren}</SwipeSliderContainer>
        ).renderProp('children')({
            ...mockContextCarousel,
        });

        expect(tree).toMatchSnapshot();
    });

    it('should render correctly with custom Props', () => {
        const tree = shallow(
            <SwipeSliderContainer data-testId="test">
                {mockChildren}
            </SwipeSliderContainer>
        ).renderProp('children')({
            ...mockContextCarousel,
        });

        expect(tree.find('BaseSwipeSlider').prop('data-testId')).toBe('test');
    });

    it('should render correctly with correct Context', () => {
        const tree = shallow(
            <SwipeSliderContainer>{mockChildren}</SwipeSliderContainer>
        ).renderProp('children')({
            ...mockContextCarousel,
        });

        expect(tree.find('BaseSwipeSlider').prop('activeItem')).toBe(
            mockContextCarousel.activeItem
        );
        expect(tree.find('BaseSwipeSlider').prop('isRTL')).toBe(
            mockContextCarousel.isRTL
        );
        expect(tree.find('BaseSwipeSlider').prop('isInfinite')).toBe(
            mockContextCarousel.isInfinite
        );
        expect(tree.find('BaseSwipeSlider').prop('itemsToShow')).toBe(
            mockContextCarousel.itemsToShow
        );
        expect(tree.find('BaseSwipeSlider').prop('setItemsLength')).toBe(
            mockContextCarousel.setItemsLength
        );
        expect(tree.find('BaseSwipeSlider').prop('goNext')).toBe(
            mockContextCarousel.goNext
        );
        expect(tree.find('BaseSwipeSlider').prop('goPrev')).toBe(
            mockContextCarousel.goPrev
        );
    });
});
