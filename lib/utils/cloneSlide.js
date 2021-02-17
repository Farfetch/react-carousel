"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _Slider = _interopRequireDefault(require("../components/Slider.css"));

var _classnames = _interopRequireDefault(require("classnames"));

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getElementStyle = function getElementStyle(style, styleChild) {
  return _objectSpread(_objectSpread({}, style), styleChild);
};

var memoizedGetElementStyle = (0, _fastMemoize["default"])(getElementStyle);

var cloneSlide = function cloneSlide(child, index, isCloned, className, style) {
  var newStyle = memoizedGetElementStyle(style, child.props.style);
  return /*#__PURE__*/(0, _react.cloneElement)(child, {
    className: (0, _classnames["default"])(className, _Slider["default"].slide, child.props.className),
    style: newStyle,
    key: isCloned ? "c.".concat(index) : child.key,
    ref: function ref(node) {
      // Keep ref when use cloneElement - Dan Abramov's tweet:
      // https://twitter.com/dan_abramov/status/752944645018189825?lang=en
      if (child.ref && !isCloned) {
        child.ref(node);
      }
    }
  });
};

var _default = cloneSlide;
exports["default"] = _default;
module.exports = exports.default;