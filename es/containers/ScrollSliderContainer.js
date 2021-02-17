function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { CarouselContext } from "../context";
import { ScrollSlider } from "../components";
import React from 'react';

var ScrollSliderContainer = function ScrollSliderContainer(props) {
  return /*#__PURE__*/React.createElement(CarouselContext.Consumer, null, function (_ref) {
    var activeItem = _ref.activeItem,
        isRTL = _ref.isRTL,
        itemsToShow = _ref.itemsToShow,
        setItemsLength = _ref.setItemsLength,
        goTo = _ref.goTo;
    return /*#__PURE__*/React.createElement(ScrollSlider, _extends({}, props, {
      isRTL: isRTL,
      activeItem: activeItem,
      itemsToShow: itemsToShow,
      setItemsLength: setItemsLength,
      goTo: goTo
    }));
  });
};

export default ScrollSliderContainer;