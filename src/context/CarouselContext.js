import React from 'react';

export default React.createContext({
    goNext: () => null,
    goPrev: () => null,
    goTo: () => null,
    setActiveItem: () => null,
    setItemsLength: () => null,
    setIsMovementBlocked: () => null,
    activeItem: 0,
    isMovementBlocked: false,
    isRTL: false,
    itemsToShow: 0,
    itemsLength: 0,
    itemsToScroll: 0,
    direction: null,
});
