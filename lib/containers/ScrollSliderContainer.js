"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _context = require("../context");

var _components = require("../components");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ScrollSliderContainer = function ScrollSliderContainer(props) {
  return /*#__PURE__*/_react["default"].createElement(_context.CarouselContext.Consumer, null, function (_ref) {
    var activeItem = _ref.activeItem,
        isRTL = _ref.isRTL,
        itemsToShow = _ref.itemsToShow,
        setItemsLength = _ref.setItemsLength,
        goTo = _ref.goTo;
    return /*#__PURE__*/_react["default"].createElement(_components.ScrollSlider, _extends({}, props, {
      isRTL: isRTL,
      activeItem: activeItem,
      itemsToShow: itemsToShow,
      setItemsLength: setItemsLength,
      goTo: goTo
    }));
  });
};

var _default = ScrollSliderContainer;
exports["default"] = _default;
module.exports = exports.default;