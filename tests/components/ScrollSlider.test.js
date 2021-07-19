import { ScrollSlider } from '../../src/components';
import { createSerializer } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import React from 'react';

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

            expect(wrapper).toMatchSnapshot();
        });
    });
});
