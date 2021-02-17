"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../utils");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

var _ScrollSlider = _interopRequireDefault(require("./ScrollSlider.css"));

var _Slider = _interopRequireDefault(require("./Slider.css"));

var _UnevenItemsScrollSlider = _interopRequireDefault(require("./UnevenItemsScrollSlider.css"));

var _classnames = _interopRequireDefault(require("classnames"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _throttle = _interopRequireDefault(require("lodash/throttle"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useUpdateEffect = function useUpdateEffect(effect, deps) {
  var isFirstRender = (0, _react.useRef)(true);
  (0, _react.useEffect)(function () {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      effect();
    } // The effect function is not needed in the dependency array here because
    // passing its dependencies (deps) are sufficient to keep effect and deps
    // in sync as is done with useEffect.  Passing the effect function to dependency
    // array would force the client to wrap it in a useCallback as well in order
    // to prevent unnecessary runs, so overspecifying dependencies is not an option
    // either.
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [deps]);
};

var useResizeObserver = function useResizeObserver(el, handleResize, observationOptions) {
  var savedHandler = (0, _react.useRef)(handleResize); // Allows us to avoid creating a new Observer each time handleResize changes

  (0, _react.useEffect)(function () {
    savedHandler.current = handleResize;
  }, [handleResize]);
  var observer = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var observationHandler = function observationHandler(entries, observer) {
      return savedHandler.current(entries, observer);
    };

    observer.current = new _resizeObserverPolyfill["default"](observationHandler);
    return function disconnect() {
      observer.current.disconnect();
    };
  }, []);
  (0, _react.useEffect)(function () {
    if (!(el instanceof Element)) {
      return;
    }

    observer.current.observe(el, observationOptions);
    return function unobserve() {
      observer.current.unobserve(el);
    };
  }, [el, observationOptions]);
};

var calculateFixedItemWidth = function calculateFixedItemWidth(offsetWidth, ratioToScroll) {
  return offsetWidth * ratioToScroll;
}; // Divide into fixed size items depending on ratioToScroll and visible part of carousel


var calculateItemsLength = function calculateItemsLength(container, wrapper, ratioToScroll, isInfinite) {
  if (isInfinite) {
    return 0;
  }

  var offsetWidth = container.offsetWidth,
      scrollWidth = container.scrollWidth;
  var fixedItemWidth = calculateFixedItemWidth(offsetWidth, ratioToScroll); // Because you cannot scroll past last offsetWidth,
  // the lastItem cannot be divided and its "fixedItemWidth"
  // will always be offsetWidth of the carousel

  var scrollableWidth = scrollWidth - offsetWidth;
  var itemsLengthExceptLast = Math.ceil(scrollableWidth / fixedItemWidth);
  return itemsLengthExceptLast + 1;
};
/* Given a container element and ratioToScroll, calculates the activeItem based on
 * container's current scroll position.
 */


var calculateActiveItem = function calculateActiveItem(containerEl, ratioToScroll, itemsLength, isRTL, isInfinite) {
  if (isInfinite) {
    return;
  }

  var scrollLeft = containerEl.scrollLeft,
      offsetWidth = containerEl.offsetWidth,
      scrollWidth = containerEl.scrollWidth; // Floor because reading scrollLeft always gives an integer and our "item" starts in the beginning
  // This wouldn't be as obvious of a problem if our "item" started in the middle instead

  var ratioToScrollPx = Math.floor(calculateFixedItemWidth(offsetWidth, ratioToScroll));
  var isLastItem = scrollLeft + offsetWidth === scrollWidth;
  var newActiveItem = isLastItem ? itemsLength - 1 : Math.floor(scrollLeft / ratioToScrollPx);

  if (isRTL) {
    newActiveItem = itemsLength - 1 - newActiveItem;
  }

  return newActiveItem;
};
/**
 * A slider that supports items with varying widths.
 */


var UnevenItemsScrollSlider = function UnevenItemsScrollSlider(props) {
  var _cx;

  var activeItem = props.activeItem,
      goToOnSizeChange = props.goToOnSizeChange,
      className = props.className,
      children = props.children,
      goTo = props.goTo,
      isRTL = props.isRTL,
      ratioToScroll = props.ratioToScroll,
      itemsLength = props.itemsLength,
      setItemsLength = props.setItemsLength,
      isInfinite = props.isInfinite,
      direction = props.direction,
      otherProps = _objectWithoutProperties(props, ["activeItem", "goToOnSizeChange", "className", "children", "goTo", "isRTL", "ratioToScroll", "itemsLength", "setItemsLength", "isInfinite", "direction"]);

  var containerRef = (0, _react.useRef)(null);
  var wrapperRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var newItemsLength = calculateItemsLength(containerRef.current, wrapperRef.current, ratioToScroll, isInfinite);

    if (itemsLength !== newItemsLength) {
      setItemsLength(newItemsLength);
    }
  }, [isInfinite, itemsLength, ratioToScroll, setItemsLength]);
  useUpdateEffect(function () {
    var displayedActiveItem = calculateActiveItem(containerRef.current, ratioToScroll, itemsLength, isRTL);
    var alreadySynced = displayedActiveItem === activeItem;

    if (!alreadySynced && !isInfinite) {
      var moveToItem = function moveToItem() {
        var el = containerRef.current;

        if (!el) {
          return null;
        }

        var offsetWidth = el.offsetWidth;
        var itemToMoveTo = isRTL ? itemsLength - 1 - activeItem : activeItem;
        var itemWidth = offsetWidth * ratioToScroll;
        var finalPosition = itemWidth * itemToMoveTo;
        (0, _utils.animateScroll)(el, finalPosition, 0.3);
      };

      moveToItem();
    }
  }, [activeItem, ratioToScroll, itemsLength, isRTL, isInfinite]);
  useUpdateEffect(function () {
    if (isInfinite) {
      (0, _utils.infiniteScroll)(containerRef.current, wrapperRef.current, ratioToScroll, direction, itemsLength, activeItem, isRTL);
    }
  }, [ratioToScroll, isRTL, isInfinite]);
  var syncActiveItemAndLength = (0, _react.useCallback)(function () {
    if (isInfinite) {
      return;
    }

    var newItemsLength = calculateItemsLength(containerRef.current, wrapperRef.current, ratioToScroll, isInfinite);
    var validGoToOnSizeChange = typeof goToOnSizeChange !== 'undefined' && goToOnSizeChange > -1 && goToOnSizeChange < newItemsLength;
    var newActiveItem = validGoToOnSizeChange ? goToOnSizeChange : calculateActiveItem(containerRef.current, ratioToScroll, newItemsLength, isRTL);

    if (itemsLength !== newItemsLength) {
      setItemsLength(newItemsLength);
    }

    goTo(newActiveItem);
  }, [itemsLength, ratioToScroll, isRTL, isInfinite, goTo, goToOnSizeChange, setItemsLength]);
  var handleResize = (0, _react.useCallback)(function () {
    return (0, _throttle["default"])(syncActiveItemAndLength, 150)();
  }, [syncActiveItemAndLength]);
  useResizeObserver(containerRef.current, handleResize);
  useResizeObserver(wrapperRef.current, handleResize);

  var syncActiveItem = function syncActiveItem() {
    var newActiveItem = calculateActiveItem(containerRef.current, ratioToScroll, itemsLength, isRTL);
    goTo(newActiveItem);
  };

  var handleScroll = isInfinite ? null : (0, _debounce["default"])(syncActiveItem, 100);
  var touchStart = (0, _react.useRef)(null);
  var handleSwipe = {
    onTouchStart: function onTouchStart(e) {
      touchStart.current = e.touches[0].clientX;
    },
    onTouchMove: function onTouchMove(e) {
      if (!touchStart.current) {
        return;
      }

      var moveXDiff = e.touches[0].clientX - touchStart.current;
      var swipeDir = moveXDiff < 0 ? 'next' : 'prev';

      if (moveXDiff != 0) {
        (0, _utils.infiniteScroll)(containerRef.current, wrapperRef.current, ratioToScroll, swipeDir, isRTL, swipeDir === 'next' ? moveXDiff : moveXDiff * -1);
      }

      touchStart.current = e.touches[0].clientX;
    },
    onTouchEnd: function onTouchEnd() {
      touchStart.current = null;
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    ref: containerRef,
    className: (0, _classnames["default"])(_Slider["default"].slider, className, (_cx = {}, _defineProperty(_cx, _ScrollSlider["default"].container, !isInfinite), _defineProperty(_cx, _UnevenItemsScrollSlider["default"].container, isInfinite), _cx)),
    onScroll: handleScroll
  }, otherProps), /*#__PURE__*/_react["default"].createElement("div", _extends({
    ref: wrapperRef,
    className: _UnevenItemsScrollSlider["default"].wrapper
  }, handleSwipe), (0, _utils.renderSlides)(children)));
};

UnevenItemsScrollSlider.propTypes = {
  activeItem: _propTypes["default"].number.isRequired,
  goToOnSizeChange: _propTypes["default"].number,
  className: _propTypes["default"].string,
  children: _propTypes["default"].node.isRequired,
  isRTL: _propTypes["default"].bool.isRequired,
  setItemsLength: _propTypes["default"].func.isRequired,
  itemsLength: _propTypes["default"].number.isRequired,
  goTo: _propTypes["default"].func.isRequired,

  /* ratioToScroll is a decimal value from 0 to 1.  1 means scroll the entire viewport of the carousel and
  less than 1 means to scroll that percentage of the viewport.   */
  ratioToScroll: _propTypes["default"].number,
  isInfinite: _propTypes["default"].bool,
  direction: _propTypes["default"].string
};
UnevenItemsScrollSlider.defaultProps = {
  ratioToScroll: 1
};
var _default = UnevenItemsScrollSlider;
exports["default"] = _default;
module.exports = exports.default;