function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { CarouselContext } from "../context";
import { SwipeSlider } from "../components";
import React from 'react';

var SwipeSliderContainer = function SwipeSliderContainer(props) {
  return /*#__PURE__*/React.createElement(CarouselContext.Consumer, null, function (_ref) {
    var activeItem = _ref.activeItem,
        isRTL = _ref.isRTL,
        itemsToShow = _ref.itemsToShow,
        isInfinite = _ref.isInfinite,
        goNext = _ref.goNext,
        goPrev = _ref.goPrev,
        setItemsLength = _ref.setItemsLength,
        setIsMovementBlocked = _ref.setIsMovementBlocked,
        isMovementBlocked = _ref.isMovementBlocked,
        direction = _ref.direction;
    return /*#__PURE__*/React.createElement(SwipeSlider, _extends({}, props, {
      activeItem: activeItem,
      isRTL: isRTL,
      itemsToShow: itemsToShow,
      isInfinite: isInfinite,
      goNext: goNext,
      goPrev: goPrev,
      setItemsLength: setItemsLength,
      setIsMovementBlocked: setIsMovementBlocked,
      isMovementBlocked: isMovementBlocked,
      direction: direction
    }));
  });
};

export default SwipeSliderContainer;