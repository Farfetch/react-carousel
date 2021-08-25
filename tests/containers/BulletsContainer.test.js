import { createSerializer } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import BulletsContainer from '../../src/containers/BulletsContainer';
import React from 'react';

const mockContextCarousel = {
    activeItem: 1,
    itemsLength: 10,
    containerRef: {
        current: null,
    },
};

beforeAll(() => {
    expect.addSnapshotSerializer(createSerializer());
});

describe('<BulletsContainer/>', () => {
    it('should render correctly', () => {
        const tree = shallow(<BulletsContainer />).renderProp('children')({
            ...mockContextCarousel,
        });

        expect(tree).toMatchSnapshot();
    });

    it('should render correctly with custom Props', () => {
        const mockTheme = {
            container: 'container',
        };
        const tree = shallow(
            <BulletsContainer data-testId="test" theme={mockTheme} />
        ).renderProp('children')({
            ...mockContextCarousel,
        });

        expect(tree.find('Bullets').prop('data-testId')).toBe('test');
        expect(tree.find('Bullets').prop('theme')).toEqual(mockTheme);
    });

    it('should render correctly with correct Context', () => {
        const tree = shallow(<BulletsContainer />).renderProp('children')({
            ...mockContextCarousel,
        });

        expect(tree.find('Bullets').prop('activeItem')).toBe(
            mockContextCarousel.activeItem
        );
        expect(tree.find('Bullets').prop('itemsLength')).toBe(
            mockContextCarousel.itemsLength
        );
    });
});
