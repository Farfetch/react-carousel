import { CarouselContext } from '#context';
import { UnevenItemsScrollSlider } from '#components';
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
        <UnevenItemsScrollSlider
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
