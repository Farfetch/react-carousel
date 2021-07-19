import { createSerializer } from 'enzyme-to-json';
// At the time of writing, enzyme still does not support shallow for useEffect
import { UnevenItemsScrollSlider } from '../../src/components';
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
    });
});
