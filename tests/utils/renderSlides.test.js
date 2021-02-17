import React from 'react';
import renderSlides from '../../src/utils/renderSlides';

describe('renderSlides()', () => {
    test('should return slides array', () => {
        const children = [
            <div key="0">First slide</div>,
            <div key="1">Second slide</div>,
            <div key="2">Third slide</div>,
            <div key="3">Fourth slide</div>,
        ];

        const itemsToShow = 2;
        const style = { width: `${(100 / itemsToShow).toFixed(6)}%` };

        const slides = renderSlides(children, itemsToShow, style);

        expect(slides).toMatchSnapshot();
        expect(slides.length).toBe(children.length);
    });
});
