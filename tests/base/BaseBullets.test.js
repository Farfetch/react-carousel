import { shallow } from 'enzyme';
import BaseBullets from '../../src/base/BaseBullets';
import React from 'react';
import serializer from 'enzyme-to-json/serializer';

beforeAll(() => {
    expect.addSnapshotSerializer(serializer);
});

afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
});

const mockPropsDefault = {
    activeItem: 0,
    itemsLength: 3,
};

const mockPropsInfinite = {
    ...mockPropsDefault,
    itemsLength: 10,
};

describe('<BaseBullets> - props for default', () => {
    it('should render correctly the basic', () => {
        const wrapper = shallow(<BaseBullets {...mockPropsDefault} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly with correct state', () => {
        const wrapper = shallow(<BaseBullets {...mockPropsDefault} />);

        const expectedState = {
            maxBullets: 5,
            translationValue: -1.8,
            isInfinite: false,
            itemsToScroll: 1,
            activeBullet: 0,
            bullets: 3,
        };

        expect(wrapper.state()).toEqual(expectedState);
    });

    it('should render correctly with correct state after update props', () => {
        const wrapper = shallow(<BaseBullets {...mockPropsDefault} />, {
            disableLifecycleMethods: false,
        });

        wrapper.setProps({ isRTL: true, itemsLength: 4 });

        const expectedState = {
            maxBullets: 5,
            translationValue: 1.8,
            isInfinite: false,
            itemsToScroll: 1,
            activeBullet: 0,
            bullets: 4,
        };

        expect(wrapper.state()).toEqual(expectedState);
    });
});

describe('<BaseBullets> - props for infinite bullets', () => {
    it('should render correctly when activeItem is the first one', () => {
        const wrapper = shallow(<BaseBullets {...mockPropsInfinite} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly when activeItem is the second one', () => {
        const wrapper = shallow(
            <BaseBullets {...mockPropsInfinite} activeItem={1} />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly when activeItem is the last one', () => {
        const wrapper = shallow(
            <BaseBullets
                {...mockPropsInfinite}
                activeItem={mockPropsInfinite.itemsLength - 1}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly when activeItem is the penultimate one', () => {
        const wrapper = shallow(
            <BaseBullets
                {...mockPropsInfinite}
                activeItem={mockPropsInfinite.itemsLength - 2}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });
});

describe('<BaseBullets> - lifecycling for infinite bullets', () => {
    it('should update secondaryBullets and bullets when newProp.activeItem is not equal to the current one', () => {
        const spyGetSecondaryBullets = jest.spyOn(
            BaseBullets.prototype,
            'getSecondaryBullets'
        );
        const wrapper = shallow(<BaseBullets {...mockPropsInfinite} />, {
            disableLifecycleMethods: false,
        });

        const expectedBefore = {
            first: 2,
            second: 1,
        };

        expect(spyGetSecondaryBullets).toHaveBeenCalledTimes(1);
        expect(spyGetSecondaryBullets).toHaveReturnedWith(expectedBefore);

        const mockIndex = 1;
        const expectedAfter = {
            first: 0,
            second: 2,
        };

        wrapper.setProps({
            activeItem: mockIndex,
        });

        expect(wrapper.prop('data-active')).toBe(mockIndex);
        expect(spyGetSecondaryBullets).toHaveBeenCalledTimes(2);
        expect(spyGetSecondaryBullets).toHaveReturnedWith(expectedAfter);
        expect(wrapper).toMatchSnapshot();
    });

    it('should not update secondaryBullets and bullets when newProp.activeItem is equal to the current one', () => {
        const spyGetSecondaryBullets = jest.spyOn(
            BaseBullets.prototype,
            'getSecondaryBullets'
        );

        const wrapper = shallow(<BaseBullets {...mockPropsInfinite} />, {
            disableLifecycleMethods: false,
        });

        wrapper.setProps({
            activeItem: mockPropsInfinite.activeItem,
        });

        expect(wrapper.prop('data-active')).toBe(mockPropsInfinite.activeItem);
        expect(spyGetSecondaryBullets).toHaveBeenCalledTimes(1);
    });

    it('should update isInfinite when newProps.itemsLength is changed', () => {
        const wrapper = shallow(<BaseBullets {...mockPropsDefault} />);

        wrapper.setProps({
            itemsLength: 4,
        });

        const expectedState = {
            maxBullets: 5,
            translationValue: -1.8,
            isInfinite: false,
            itemsToScroll: 1,
            activeBullet: 0,
            bullets: 4,
        };

        expect(wrapper.state()).toEqual(expectedState);
    });
});
