import './Carousel.css';
import { Arrow, Bullets, Carousel, ScrollSlider } from '../src';
import React from 'react';

export default {
    component: Carousel,
    title: 'Carousel/ScrollSlider',
};

const children = [
    <a key={1} className="item first">
        <svg viewBox="0 0 7 4"></svg>
        <p>1</p>
    </a>,
    <a key={2} className="item second">
        <svg viewBox="0 0 7 4"></svg>
        <p>2</p>
    </a>,
    <a key={3} className="item third">
        <svg viewBox="0 0 7 4"></svg>
        <p>3</p>
    </a>,
    <a key={4} className="item fourth">
        <svg viewBox="0 0 7 4"></svg>
        <p>4</p>
    </a>,
    <a key={5} className="item fifth">
        <svg viewBox="0 0 7 4"></svg>
        <p>5</p>
    </a>,
    <a key={6} className="item sixth">
        <svg viewBox="0 0 7 4"></svg>
        <p>6</p>
    </a>,
    <a key={7} className="item seventh">
        <svg viewBox="0 0 7 2"></svg>
        <p>7</p>
    </a>,
];

const Template = (args) => (
    <div className="area">
        <Carousel
            isInfinite={args.isInfinite}
            isRTL={args.isRTL}
            itemsToShow={args.itemsToShow}
            itemsToScroll={args.itemsToScroll}
        >
            <ScrollSlider
                animationDuration={args.animationDuration}
                animationTimingFunction={args.animationTimingFunction}
            >
                {children}
            </ScrollSlider>
            <Bullets />
            <Arrow flow={'prev'}>
                {({ onClick }) => <button onClick={onClick}>Previous</button>}
            </Arrow>

            <Arrow flow={'next'}>
                {({ onClick }) => <button onClick={onClick}>Next</button>}
            </Arrow>
        </Carousel>
    </div>
);

export const ScrollCarousel = Template.bind({});
ScrollCarousel.args = {
    isInfinite: false,
    isRTL: false,
    itemsToShow: 1.25,
    itemsToScroll: 1,
    animationDuration: 0.3,
    animationTimingFunction: function quad(timeFraction) {
        return Math.pow(timeFraction, 2);
    },
};
