"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function checkSnapSupport() {
  return 'scrollSnapAlign' in document.documentElement.style || 'webkitScrollSnapAlign' in document.documentElement.style || 'msScrollSnapAlign' in document.documentElement.style;
}

var _default = checkSnapSupport;
exports["default"] = _default;
module.exports = exports.default;