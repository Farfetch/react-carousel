import { CarouselContext } from '#context';
import { SwipeSlider } from '#components';
import React from 'react';

const SwipeSliderContainer = (props) => (
    <CarouselContext.Consumer>
        {({
            activeItem,
            isRTL,
            itemsToShow,
            isInfinite,
            goNext,
            goPrev,
            setItemsLength,
            setIsMovementBlocked,
            isMovementBlocked,
            direction,
        }) => (
            <SwipeSlider
                {...props}
                activeItem={activeItem}
                isRTL={isRTL}
                itemsToShow={itemsToShow}
                isInfinite={isInfinite}
                goNext={goNext}
                goPrev={goPrev}
                setItemsLength={setItemsLength}
                setIsMovementBlocked={setIsMovementBlocked}
                isMovementBlocked={isMovementBlocked}
                direction={direction}
            />
        )}
    </CarouselContext.Consumer>
);

export default SwipeSliderContainer;
