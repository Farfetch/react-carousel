import { UnevenItemsScrollSlider } from '#components';
import { useCarousel } from '#hooks';
import React from 'react';

const UnevenItemsScrollSliderContainer = (props) => {
    const {
        isRTL,
        activeItem,
        itemsLength,
        setItemsLength,
        goTo,
        isInfinite,
        direction,
        containerRef,
    } = useCarousel();

    return (
        <UnevenItemsScrollSlider
            {...props}
            ref={containerRef}
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
