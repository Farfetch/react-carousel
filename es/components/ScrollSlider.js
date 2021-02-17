function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import { animateScroll, renderSlides } from "../utils";
import PropTypes from 'prop-types';
import React, { Children, Component, createRef } from 'react';
import ScrollStyles from "./ScrollSlider.css";
import Styles from "./Slider.css";
import cx from 'classnames';
import debounce from 'lodash/debounce';

var ScrollSlider = /*#__PURE__*/function (_Component) {
  _inherits(ScrollSlider, _Component);

  var _super = _createSuper(ScrollSlider);

  function ScrollSlider(props) {
    var _this;

    _classCallCheck(this, ScrollSlider);

    _this = _super.call(this, props);
    _this._verifyActiveItemDebounce = debounce(_this._verifyActiveItem, 25);
    _this._handleScroll = _this._handleScroll.bind(_assertThisInitialized(_this));
    _this.itemsLength = Children.count(props.children);
    _this.activeItem = 0;
    _this.shouldMoveToItem = false;
    _this.isPreventingScroll = false;
    _this.containerRef = /*#__PURE__*/createRef();
    return _this;
  }

  _createClass(ScrollSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.setItemsLength(this.itemsLength);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.shouldMoveToItem) {
        this._moveToItem();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          activeItem = _this$props.activeItem,
          className = _this$props.className,
          children = _this$props.children,
          goTo = _this$props.goTo,
          isRTL = _this$props.isRTL,
          itemsToShow = _this$props.itemsToShow,
          limitScroll = _this$props.limitScroll,
          setItemsLength = _this$props.setItemsLength,
          othersProps = _objectWithoutProperties(_this$props, ["activeItem", "className", "children", "goTo", "isRTL", "itemsToShow", "limitScroll", "setItemsLength"]);

      if (activeItem !== this.activeItem) {
        this.activeItem = activeItem;
        this.shouldMoveToItem = true;
      } else {
        this.shouldMoveToItem = false;
      }

      var style = {
        width: "".concat((100 / itemsToShow).toFixed(6), "%")
      };
      return /*#__PURE__*/React.createElement("div", _extends({
        ref: this.containerRef,
        className: cx(Styles.slider, ScrollStyles.container, className),
        onScroll: this._handleScroll
      }, othersProps), renderSlides(children, itemsToShow, style));
    }
  }, {
    key: "_moveToItem",
    value: function _moveToItem() {
      var _this2 = this;

      var el = this.containerRef.current;

      if (!el) {
        return null;
      }

      var offsetWidth = el.offsetWidth;
      var _this$props2 = this.props,
          activeItem = _this$props2.activeItem,
          itemsToShow = _this$props2.itemsToShow,
          isRTL = _this$props2.isRTL;
      var itemToMoveTo = isRTL ? this.itemsLength - 2 - activeItem : activeItem;
      var finalPosition = offsetWidth / itemsToShow * itemToMoveTo;
      animateScroll(el, finalPosition, 0.3, function () {
        _this2.shouldMoveToItem = false;
      });
    }
    /* Don't work on Chrome, but work on iOS */

  }, {
    key: "_forceScrollSnapStop",
    value: function _forceScrollSnapStop(newPosition, newIndex) {
      var _this3 = this;

      var el = this.containerRef.current;

      if (!el) {
        return null;
      }

      el.scrollLeft = newPosition;
      this.isPreventingScroll = true;
      el.style.overflow = 'hidden';
      setTimeout(function () {
        _this3.isPreventingScroll = false;
        el.style.overflow = '';
      }, 80);
      this.props.goTo(newIndex);
    }
  }, {
    key: "_verifyActiveItem",
    value: function _verifyActiveItem() {
      var _this$props3 = this.props,
          goTo = _this$props3.goTo,
          itemsToShow = _this$props3.itemsToShow,
          isRTL = _this$props3.isRTL;
      var _this$containerRef$cu = this.containerRef.current,
          offsetWidth = _this$containerRef$cu.offsetWidth,
          scrollLeft = _this$containerRef$cu.scrollLeft;
      var activeFraction = Math.round(scrollLeft / offsetWidth * 100) / 100;
      var newActiveItem = isRTL ? this.itemsLength - 1 - Math.round(activeFraction * itemsToShow) - (itemsToShow - 1) : Math.round(activeFraction * itemsToShow);

      if (this.activeItem === newActiveItem) {
        return null;
      }

      this.activeItem = newActiveItem;
      goTo(newActiveItem);
    }
  }, {
    key: "_handleScroll",
    value: function _handleScroll(e) {
      if (this.isPreventingScroll) {
        e.stopPropagation();
        e.preventDefault();
        return null;
      }

      if (this.shouldMoveToItem) {
        return null;
      }

      var _this$props4 = this.props,
          limitScroll = _this$props4.limitScroll,
          itemsToShow = _this$props4.itemsToShow;

      if (limitScroll) {
        var _this$containerRef$cu2 = this.containerRef.current,
            offsetWidth = _this$containerRef$cu2.offsetWidth,
            scrollLeft = _this$containerRef$cu2.scrollLeft; // When scrolling too fast, we want to prevent scrolling 2 slides at once...

        var newPrevIndex = this.activeItem - 1;
        var newNextIndex = this.activeItem + 1;
        var limitScrollNext = offsetWidth / itemsToShow * newNextIndex;
        var limitScrollPrev = offsetWidth / itemsToShow * newPrevIndex; // ...so, we need to force a scroll stop limit position when that happens ...

        if (scrollLeft > limitScrollNext) {
          return this._forceScrollSnapStop(limitScrollNext, newNextIndex);
        } else if (scrollLeft < limitScrollPrev) {
          return this._forceScrollSnapStop(limitScrollPrev, newPrevIndex);
        }
      }

      this._verifyActiveItemDebounce();
    }
  }]);

  return ScrollSlider;
}(Component);

ScrollSlider.propTypes = {
  activeItem: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  isRTL: PropTypes.bool.isRequired,
  itemsToShow: PropTypes.number.isRequired,
  setItemsLength: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  limitScroll: PropTypes.bool
};
export default ScrollSlider;