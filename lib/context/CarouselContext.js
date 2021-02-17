"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = /*#__PURE__*/_react["default"].createContext({
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

exports["default"] = _default;
module.exports = exports.default;