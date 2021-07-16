import './Carousel.css';
import { Arrow, Carousel, SwipeSlider } from '../src';
import React from 'react';

export default {
    component: Carousel,
    title: 'Carousel/SwipeSlider',
};

const Template = (args) => (
    <div className="area">
        <Carousel
            isInfinite={args.isInfinite}
            isRTL={args.isRTL}
            itemsToShow={args.itemsToShow}
            itemsToScroll={args.itemsToScroll}
        >
            <SwipeSlider
                disableSwipe={args.disableSwipe}
                hasKeysNavigation={args.hasKeysNavigation}
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
            </SwipeSlider>
            <Arrow flow={'prev'}>
                {({ onClick }) => <button onClick={onClick}>Previous</button>}
            </Arrow>

            <Arrow flow={'next'}>
                {({ onClick }) => <button onClick={onClick}>Next</button>}
            </Arrow>
        </Carousel>
    </div>
);

export const SwipeSliderCarousel = Template.bind({});
SwipeSliderCarousel.args = {
    isInfinite: false,
    isRTL: false,
    itemsToShow: 1.25,
    itemsToScroll: 1,
    disableSwipe: false,
    hasKeysNavigation: true,
};
