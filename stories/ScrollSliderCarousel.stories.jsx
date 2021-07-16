import './Carousel.css';
import { Arrow, Carousel, ScrollSlider } from '../src';
import React from 'react';

export default {
    component: Carousel,
    title: 'Carousel/ScrollSlider',
};

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
                <a
                    href="#"
                    className="card"
                    style={{
                        backgroundColor: '#72147E',
                    }}
                >
                    <svg viewBox="0 0 7 2"></svg>
                    <p>1</p>
                </a>
                <a
                    href="#"
                    className="card"
                    style={{
                        backgroundColor: '#F21170',
                    }}
                >
                    <svg viewBox="0 0 7 2"></svg>
                    <p>2</p>
                </a>
                <a
                    href="#"
                    className="card"
                    style={{
                        backgroundColor: '#FA9905',
                    }}
                >
                    <svg viewBox="0 0 7 2"></svg>
                    <p>3</p>
                </a>
                <a
                    href="#"
                    className="card"
                    style={{
                        backgroundColor: '#FF5200',
                    }}
                >
                    <svg viewBox="0 0 7 2"></svg>
                    <p>4</p>
                </a>
                <a
                    href="#"
                    className="card"
                    style={{
                        backgroundColor: '#CF0000',
                    }}
                >
                    <svg viewBox="0 0 7 2"></svg>
                    <p>5</p>
                </a>
            </ScrollSlider>
            <Arrow flow={'prev'}>
                {({ onClick }) => <button onClick={onClick}>Previous</button>}
            </Arrow>

            <Arrow flow={'next'}>
                {({ onClick }) => <button onClick={onClick}>Next</button>}
            </Arrow>
        </Carousel>
    </div>
);

export const ScrollSliderCarousel = Template.bind({});
ScrollSliderCarousel.args = {
    isInfinite: false,
    isRTL: false,
    itemsToShow: 1.25,
    itemsToScroll: 1,
    animationDuration: 0.3,
    animationTimingFunction: function quad(timeFraction) {
        return Math.pow(timeFraction, 2);
    },
};
