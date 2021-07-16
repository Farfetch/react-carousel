import { BaseScrollSlider } from '#base';
import { CarouselContext } from '#context';
import React from 'react';

const ScrollSliderContainer = (props) => (
    <CarouselContext.Consumer>
        {({ activeItem, isRTL, itemsToShow, setItemsLength, goTo }) => (
            <BaseScrollSlider
                {...props}
                isRTL={isRTL}
                activeItem={activeItem}
                itemsToShow={itemsToShow}
                setItemsLength={setItemsLength}
                goTo={goTo}
            />
        )}
    </CarouselContext.Consumer>
);

export default ScrollSliderContainer;
