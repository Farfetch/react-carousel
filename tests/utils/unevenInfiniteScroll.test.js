import {
    getElementStyleValue,
    getTranslateValue,
    isNodeVisible,
} from '../../src/utils/unevenInfiniteScroll';
import { mount } from 'enzyme';
import React from 'react';
import UnevenItemsScrollSlider from '../../src/components/UnevenItemsScrollSlider';

Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get: function () {
        return this._offsetWidth || 0;
    },
    set(val) {
        this._offsetWidth = val;
    },
});

Object.defineProperty(HTMLElement.prototype, 'offsetLeft', {
    configurable: true,
    get: function () {
        return this._offsetLeft || 0;
    },
    set(val) {
        this._offsetLeft = val;
    },
});

const children = [
    <div key="0" style={{ transform: 'translateX(0px)', marginLeft: '10px' }}>
        First slide
    </div>,
    <div key="1">Second slide</div>,
    <div key="2">Third slide</div>,
    <div key="3">Fourth slide</div>,
    <div key="4">Fifth slide</div>,
    <div key="5">Sixth slide</div>,
    <div key="6">Seventh slide</div>,
];

const mockProps = {
    activeItem: 0,
    children,
    isRTL: false,
    itemsLength: 7,
    setItemsLength: jest.fn(),
    goTo: jest.fn(),
    isInfinite: true,
    ref: {
        current: null,
    },
};

describe('unevenInfiniteScroll', () => {
    const wrapper = mount(<UnevenItemsScrollSlider {...mockProps} />);

    const containerElement = wrapper.find('.unevenItemsContainer');
    const wrapperElement = containerElement.find('.unevenItemsWrapper');
    const nodes = wrapperElement.find('.slide');

    containerElement.getDOMNode().offsetWidth = 600;

    for (let i = 0; i < nodes.length - 1; i++) {
        const nodeDom = nodes.at(i).getDOMNode();
        nodeDom.offsetWidth = Math.floor(Math.random() * 100) + 100;

        if (i > 0) {
            nodeDom.getBoundingClientRect = jest.fn(() => ({
                x: nodes.at(i - 1).getDOMNode().offsetWidth,
                width: nodeDom.offsetWidth,
                left: nodes.at(i - 1).getDOMNode().offsetWidth,
            }));
        }
    }

    it('should return true for isNodeVisible when the item is visible onscreen', () => {
        const node = wrapperElement.childAt(1).getDOMNode();

        const _isNodeVisible = isNodeVisible(
            containerElement.getDOMNode(),
            node,
            'next'
        );

        expect(_isNodeVisible).toBeTruthy();
    });

    it('should return false for isNodeVisible when the item is not visible onscreen', () => {
        const node = wrapperElement.childAt(6).getDOMNode();

        const _isNodeVisible = isNodeVisible(
            containerElement.getDOMNode(),
            node,
            'next'
        );

        expect(_isNodeVisible).toBeFalsy();
    });

    it('should return translate value from an element', () => {
        const node = wrapperElement.childAt(0).getDOMNode();

        expect(getTranslateValue(node, 'X')).toBe(0);
    });

    it('should return the correct value for the selected css style', () => {
        const node = wrapperElement.childAt(0).getDOMNode();

        expect(getElementStyleValue(node, 'marginLeft')).toBe(10);
    });
});
