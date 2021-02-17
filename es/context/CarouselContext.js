import React from 'react';
export default /*#__PURE__*/React.createContext({
  goNext: function goNext() {
    return null;
  },
  goPrev: function goPrev() {
    return null;
  },
  goTo: function goTo() {
    return null;
  },
  setActiveItem: function setActiveItem() {
    return null;
  },
  setItemsLength: function setItemsLength() {
    return null;
  },
  setIsMovementBlocked: function setIsMovementBlocked() {
    return null;
  },
  activeItem: 0,
  isMovementBlocked: false,
  isRTL: false,
  itemsToShow: 0,
  itemsLength: 0,
  itemsToScroll: 0,
  direction: null
});