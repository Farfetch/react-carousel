function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { CarouselContext } from "../context";
import { UnevenItemsScrollSlider } from "../components";
import React, { useContext } from 'react';

var UnevenItemsScrollSliderContainer = function UnevenItemsScrollSliderContainer(props) {
  var _useContext = useContext(CarouselContext),
      isRTL = _useContext.isRTL,
      activeItem = _useContext.activeItem,
      itemsLength = _useContext.itemsLength,
      setItemsLength = _useContext.setItemsLength,
      goTo = _useContext.goTo,
      isInfinite = _useContext.isInfinite,
      direction = _useContext.direction;

  return /*#__PURE__*/React.createElement(UnevenItemsScrollSlider, _extends({}, props, {
    isRTL: isRTL,
    activeItem: activeItem,
    itemsLength: itemsLength,
    setItemsLength: setItemsLength,
    goTo: goTo,
    isInfinite: isInfinite,
    direction: direction
  }));
};

export default UnevenItemsScrollSliderContainer;