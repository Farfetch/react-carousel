import { Bullets } from '#components';
import { CarouselContext } from '#context';
import React from 'react';

const BulletsContainer = (props) => (
    <CarouselContext.Consumer>
        {({ activeItem, itemsToShow, itemsLength, isRTL, itemsToScroll }) => (
            <Bullets
                {...props}
                itemsToShow={itemsToShow}
                activeItem={activeItem}
                itemsLength={itemsLength}
                isRTL={isRTL}
                itemsToScroll={itemsToScroll}
            />
        )}
    </CarouselContext.Consumer>
);

export default BulletsContainer;
