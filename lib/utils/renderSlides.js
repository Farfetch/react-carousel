"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _ = require("./");

var renderSlides = function renderSlides(children, itemsToShow, style) {
  return _react.Children.map(children, function (child, index) {
    return (0, _.cloneSlide)(child, index, false, null, style);
  });
};

var _default = renderSlides;
exports["default"] = _default;
module.exports = exports.default;