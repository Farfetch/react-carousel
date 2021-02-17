"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

exports["default"] = _default;
module.exports = exports.default;