"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _context = require("../context");

var _components = require("../components");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var UnevenItemsScrollSliderContainer = function UnevenItemsScrollSliderContainer(props) {
  var _useContext = (0, _react.useContext)(_context.CarouselContext),
      isRTL = _useContext.isRTL,
      activeItem = _useContext.activeItem,
      itemsLength = _useContext.itemsLength,
      setItemsLength = _useContext.setItemsLength,
      goTo = _useContext.goTo,
      isInfinite = _useContext.isInfinite,
      direction = _useContext.direction;

  return /*#__PURE__*/_react["default"].createElement(_components.UnevenItemsScrollSlider, _extends({}, props, {
    isRTL: isRTL,
    activeItem: activeItem,
    itemsLength: itemsLength,
    setItemsLength: setItemsLength,
    goTo: goTo,
    isInfinite: isInfinite,
    direction: direction
  }));
};

var _default = UnevenItemsScrollSliderContainer;
exports["default"] = _default;
module.exports = exports.default;