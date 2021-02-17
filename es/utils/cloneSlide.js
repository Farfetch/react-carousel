function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { cloneElement } from 'react';
import Styles from "../components/Slider.css";
import cx from 'classnames';
import memoize from 'fast-memoize';

var getElementStyle = function getElementStyle(style, styleChild) {
  return _objectSpread(_objectSpread({}, style), styleChild);
};

var memoizedGetElementStyle = memoize(getElementStyle);

var cloneSlide = function cloneSlide(child, index, isCloned, className, style) {
  var newStyle = memoizedGetElementStyle(style, child.props.style);
  return /*#__PURE__*/cloneElement(child, {
    className: cx(className, Styles.slide, child.props.className),
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

export default cloneSlide;