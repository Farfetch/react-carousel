import { SwipeSlider } from '../../src/components';
import { createSerializer } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import React from 'react';

beforeAll(() => {
    jest.useFakeTimers();
    expect.addSnapshotSerializer(createSerializer());
});

afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
});

const mocksPropsSwipeSlider = {
    activeItem: 0,
    itemsToShow: 2,
    isRTL: false,
    isInfinite: false,
    goNext: jest.fn(),
    goPrev: jest.fn(),
    setItemsLength: jest.fn(),
    setIsMovementBlocked: jest.fn(),
    isMovementBlocked: false,
    direction: null,
};

const children = [
    <div key="0">First slide</div>,
    <div key="1">Second slide</div>,
    <div key="2">Third slide</div>,
    <div key="3">Fourth slide</div>,
    <div key="4">Five slide</div>,
    <div key="5">Sixth slide</div>,
    <div key="6">Seventh slide</div>,
];

describe('<SwipeSlider /> props', () => {
    it('should render correctly the sliders cloned from children elements', () => {
        const tree = shallow(
            <SwipeSlider {...mocksPropsSwipeSlider}>{children}</SwipeSlider>,
            { disableLifecycleMethods: false }
        );
        expect(tree).toMatchSnapshot();
    });
});
