function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { Bullets } from "../components";
import { CarouselContext } from "../context";
import React from 'react';

var BulletsContainer = function BulletsContainer(props) {
  return /*#__PURE__*/React.createElement(CarouselContext.Consumer, null, function (_ref) {
    var activeItem = _ref.activeItem,
        itemsLength = _ref.itemsLength,
        isRTL = _ref.isRTL,
        itemsToScroll = _ref.itemsToScroll;
    return /*#__PURE__*/React.createElement(Bullets, _extends({}, props, {
      activeItem: activeItem,
      itemsLength: itemsLength,
      isRTL: isRTL,
      itemsToScroll: itemsToScroll
    }));
  });
};

export default BulletsContainer;