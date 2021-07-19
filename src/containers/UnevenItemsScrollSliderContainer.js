import { BaseUnevenItemsScrollSlider } from '#base';
import { CarouselContext } from '#context';
import React, { useContext } from 'react';

const UnevenItemsScrollSliderContainer = (props) => {
    const {
        isRTL,
        activeItem,
        itemsLength,
        setItemsLength,
        goTo,
        isInfinite,
        direction,
    } = useContext(CarouselContext);

    return (
        <BaseUnevenItemsScrollSlider
            {...props}
            isRTL={isRTL}
            activeItem={activeItem}
            itemsLength={itemsLength}
            setItemsLength={setItemsLength}
            goTo={goTo}
            isInfinite={isInfinite}
            direction={direction}
        />
    );
};

export default UnevenItemsScrollSliderContainer;
