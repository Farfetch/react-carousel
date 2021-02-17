"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "checkSnapSupport", {
  enumerable: true,
  get: function get() {
    return _checkSnapSupport["default"];
  }
});
Object.defineProperty(exports, "cloneSlide", {
  enumerable: true,
  get: function get() {
    return _cloneSlide["default"];
  }
});
Object.defineProperty(exports, "renderSlides", {
  enumerable: true,
  get: function get() {
    return _renderSlides["default"];
  }
});
Object.defineProperty(exports, "animate", {
  enumerable: true,
  get: function get() {
    return _animate["default"];
  }
});
Object.defineProperty(exports, "animateScroll", {
  enumerable: true,
  get: function get() {
    return _animate.animateScroll;
  }
});
Object.defineProperty(exports, "easeInOutQuad", {
  enumerable: true,
  get: function get() {
    return _easeInOutQuad["default"];
  }
});
Object.defineProperty(exports, "infiniteScroll", {
  enumerable: true,
  get: function get() {
    return _unevenInfiniteScroll["default"];
  }
});

var _checkSnapSupport = _interopRequireDefault(require("./checkSnapSupport"));

var _cloneSlide = _interopRequireDefault(require("./cloneSlide"));

var _renderSlides = _interopRequireDefault(require("./renderSlides"));

var _animate = _interopRequireWildcard(require("./animate"));

var _easeInOutQuad = _interopRequireDefault(require("./easeInOutQuad"));

var _unevenInfiniteScroll = _interopRequireDefault(require("./unevenInfiniteScroll"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }