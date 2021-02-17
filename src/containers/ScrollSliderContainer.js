import { CarouselContext } from '#context';
import { ScrollSlider } from '#components';
import React from 'react';

const ScrollSliderContainer = (props) => (
    <CarouselContext.Consumer>
        {({ activeItem, isRTL, itemsToShow, setItemsLength, goTo }) => (
            <ScrollSlider
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
