import { createSerializer } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import React from 'react';
import ScrollSliderContainer from '../../src/containers/ScrollSliderContainer';

const mockContextCarousel = {
    activeItem: 1,
    isRTL: false,
    itemsToShow: 2,
    setItemsLength: jest.fn(),
    goTo: jest.fn(),
};

const mockChildren = <div />;

beforeAll(() => {
    expect.addSnapshotSerializer(createSerializer());
});

describe('<ScrollSliderContainer/>', () => {
    it('should render correctly', () => {
        const tree = shallow(
            <ScrollSliderContainer>{mockChildren}</ScrollSliderContainer>
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
            <ScrollSliderContainer data-testId="test" theme={mockTheme}>
                {mockChildren}
            </ScrollSliderContainer>
        ).renderProp('children')({
            ...mockContextCarousel,
        });

        expect(tree.find('ScrollSlider').prop('data-testId')).toBe('test');
        expect(tree.find('ScrollSlider').prop('theme')).toEqual(mockTheme);
    });

    it('should render correctly with correct Context', () => {
        const tree = shallow(
            <ScrollSliderContainer>{mockChildren}</ScrollSliderContainer>
        ).renderProp('children')({
            ...mockContextCarousel,
        });

        expect(tree.find('ScrollSlider').prop('activeItem')).toBe(
            mockContextCarousel.activeItem
        );
        expect(tree.find('ScrollSlider').prop('isRTL')).toBe(
            mockContextCarousel.isRTL
        );
        expect(tree.find('ScrollSlider').prop('itemsToShow')).toBe(
            mockContextCarousel.itemsToShow
        );
        expect(tree.find('ScrollSlider').prop('setItemsLength')).toBe(
            mockContextCarousel.setItemsLength
        );
        expect(tree.find('ScrollSlider').prop('goTo')).toBe(
            mockContextCarousel.goTo
        );
    });
});
