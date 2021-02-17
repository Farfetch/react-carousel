import { shallow } from 'enzyme';
import Bullets from '../../src/components/Bullets';
import React from 'react';
import StylesBulletsMock from './StylesMockBullets.css';
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

describe('<Bullets> - props for default', () => {
    it('should render correctly the basic', () => {
        const wrapper = shallow(<Bullets {...mockPropsDefault} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly bullets with a custom theme', () => {
        const wrapper = shallow(
            <Bullets {...mockPropsDefault} theme={StylesBulletsMock} />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly with correct state', () => {
        const wrapper = shallow(<Bullets {...mockPropsDefault} />);

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
        const wrapper = shallow(<Bullets {...mockPropsDefault} />, {
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

describe('<Bullets> - props for infinite bullets', () => {
    it('should render correctly when activeItem is the first one', () => {
        const wrapper = shallow(<Bullets {...mockPropsInfinite} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly when activeItem is the second one', () => {
        const wrapper = shallow(
            <Bullets {...mockPropsInfinite} activeItem={1} />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly when activeItem is the last one', () => {
        const wrapper = shallow(
            <Bullets
                {...mockPropsInfinite}
                activeItem={mockPropsInfinite.itemsLength - 1}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly when activeItem is the penultimate one', () => {
        const wrapper = shallow(
            <Bullets
                {...mockPropsInfinite}
                activeItem={mockPropsInfinite.itemsLength - 2}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly when activeItem is one of the middle with dataTestAttr and a custom theme', () => {
        const wrapper = shallow(
            <Bullets
                {...mockPropsInfinite}
                activeItem={mockPropsInfinite.itemsLength - 3}
                dataTestAttr="infinite"
                theme={StylesBulletsMock}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });
});

describe('<Bullets> - lifecycling for infinite bullets', () => {
    it('should update secondaryBullets and bullets when newProp.activeItem is not equal to the current one', () => {
        const spyGetSecondaryBullets = jest.spyOn(
            Bullets.prototype,
            'getSecondaryBullets'
        );
        const wrapper = shallow(<Bullets {...mockPropsInfinite} />, {
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
            Bullets.prototype,
            'getSecondaryBullets'
        );

        const wrapper = shallow(<Bullets {...mockPropsInfinite} />, {
            disableLifecycleMethods: false,
        });

        wrapper.setProps({
            activeItem: mockPropsInfinite.activeItem,
        });

        expect(wrapper.prop('data-active')).toBe(mockPropsInfinite.activeItem);
        expect(spyGetSecondaryBullets).toHaveBeenCalledTimes(1);
    });

    it('should update isInfinite when newProps.itemsLength is changed', () => {
        const wrapper = shallow(<Bullets {...mockPropsDefault} />);

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
