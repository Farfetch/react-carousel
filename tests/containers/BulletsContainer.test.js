import { createSerializer } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import BulletsContainer from '../../src/containers/BulletsContainer';
import React from 'react';

const mockContextCarousel = {
    activeItem: 1,
    itemsLength: 10,
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

    it('should render correctly with correct Context', () => {
        const tree = shallow(<BulletsContainer />).renderProp('children')({
            ...mockContextCarousel,
        });

        expect(tree.find('BaseBullets').prop('activeItem')).toBe(
            mockContextCarousel.activeItem
        );
        expect(tree.find('BaseBullets').prop('itemsLength')).toBe(
            mockContextCarousel.itemsLength
        );
    });
});
