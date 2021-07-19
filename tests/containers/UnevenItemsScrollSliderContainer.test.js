import { createSerializer } from 'enzyme-to-json';
// At time of writing useContext does not work with enzyme for shallow rendering
import { mount } from 'enzyme';
import CarouselContext from '../../src/context/CarouselContext';
import React from 'react';
import UnevenItemsScrollSliderContainer from '../../src/containers/UnevenItemsScrollSliderContainer';

const mockContextCarousel = {
    activeItem: 1,
    isRTL: false,
    itemsLength: 1,
    setItemsLength: jest.fn(),
    goTo: jest.fn(),
};

const mockChildren = <div />;

beforeAll(() => {
    expect.addSnapshotSerializer(createSerializer());
});

describe('<UnevenItemsScrollSliderContainer/>', () => {
    it('should render correctly', () => {
        const tree = mount(
            <CarouselContext.Provider value={mockContextCarousel}>
                <UnevenItemsScrollSliderContainer>
                    {mockChildren}
                </UnevenItemsScrollSliderContainer>
            </CarouselContext.Provider>
        );

        expect(tree).toMatchSnapshot();
    });

    it('should render correctly with custom Props', () => {
        const mockTheme = {
            container: 'container',
        };
        const tree = mount(
            <CarouselContext.Provider value={mockContextCarousel}>
                <UnevenItemsScrollSliderContainer
                    data-testId="test"
                    theme={mockTheme}
                >
                    {mockChildren}
                </UnevenItemsScrollSliderContainer>
            </CarouselContext.Provider>
        );

        expect(
            tree.find('BaseUnevenItemsScrollSlider').prop('data-testId')
        ).toBe('test');
        expect(tree.find('BaseUnevenItemsScrollSlider').prop('theme')).toEqual(
            mockTheme
        );
    });

    it('should render correctly with correct Context', () => {
        const tree = mount(
            <CarouselContext.Provider value={mockContextCarousel}>
                <UnevenItemsScrollSliderContainer>
                    {mockChildren}
                </UnevenItemsScrollSliderContainer>
            </CarouselContext.Provider>
        );

        expect(tree.find('BaseUnevenItemsScrollSlider').props()).toMatchObject(
            mockContextCarousel
        );
    });
});
