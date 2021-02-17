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
        const mockTheme = {
            container: 'container',
        };
        const tree = shallow(
            <SwipeSliderContainer data-testId="test" theme={mockTheme}>
                {mockChildren}
            </SwipeSliderContainer>
        ).renderProp('children')({
            ...mockContextCarousel,
        });

        expect(tree.find('SwipeSlider').prop('data-testId')).toBe('test');
        expect(tree.find('SwipeSlider').prop('theme')).toEqual(mockTheme);
    });

    it('should render correctly with correct Context', () => {
        const tree = shallow(
            <SwipeSliderContainer>{mockChildren}</SwipeSliderContainer>
        ).renderProp('children')({
            ...mockContextCarousel,
        });

        expect(tree.find('SwipeSlider').prop('activeItem')).toBe(
            mockContextCarousel.activeItem
        );
        expect(tree.find('SwipeSlider').prop('isRTL')).toBe(
            mockContextCarousel.isRTL
        );
        expect(tree.find('SwipeSlider').prop('isInfinite')).toBe(
            mockContextCarousel.isInfinite
        );
        expect(tree.find('SwipeSlider').prop('itemsToShow')).toBe(
            mockContextCarousel.itemsToShow
        );
        expect(tree.find('SwipeSlider').prop('setItemsLength')).toBe(
            mockContextCarousel.setItemsLength
        );
        expect(tree.find('SwipeSlider').prop('goNext')).toBe(
            mockContextCarousel.goNext
        );
        expect(tree.find('SwipeSlider').prop('goPrev')).toBe(
            mockContextCarousel.goPrev
        );
    });
});
