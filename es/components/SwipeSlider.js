function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

import { cloneSlide, renderSlides as _renderSlides } from "../utils";
import PropTypes from "prop-types";
import React, { Children, Component } from "react";
import Styles from "./Slider.css";
import cx from "classnames";
import ReactSwipeEvents from "react-swipe-events";
var LEFT_KEY_CODE = 37;
var RIGHT_KEY_CODE = 39;

var SwipeSlider = /*#__PURE__*/function (_Component) {
  _inherits(SwipeSlider, _Component);

  var _super = _createSuper(SwipeSlider);

  _createClass(SwipeSlider, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var children = props.children,
          itemsToShow = props.itemsToShow,
          isInfinite = props.isInfinite,
          isMovementBlocked = props.isMovementBlocked,
          direction = props.direction;

      if (isMovementBlocked) {
        return state;
      }

      var itemsLength = Children.count(children);
      var activeItemData = {
        transitionResetType: null,
        activeItem: props.activeItem
      };

      if (props.activeItem !== state.activeItem && isInfinite) {
        var previousActiveItem = state.activeItem;
        var newActiveItem = props.activeItem;
        var isMovingToBeginning = direction === "next" && newActiveItem === 0;
        var isMovingToEnd = direction === "prev" && previousActiveItem === 0;

        if (isMovingToBeginning) {
          props.setIsMovementBlocked(true);
          activeItemData = {
            transitionResetType: "last-to-first",
            activeItem: itemsLength
          };
        }

        if (isMovingToEnd) {
          activeItemData = {
            transitionResetType: "first-to-last",
            isFakeTransition: true,
            activeItem: itemsLength
          };
        }
      }

      return _objectSpread(_objectSpread({}, activeItemData), {}, {
        itemsLength: itemsLength,
        hasEnoughChildren: itemsLength > itemsToShow
      });
    }
  }]);

  function SwipeSlider(props) {
    var _this;

    _classCallCheck(this, SwipeSlider);

    _this = _super.call(this, props);
    _this.state = {
      itemsLength: 0,
      activeItem: null,
      isFakeTransition: false,
      hasEnoughChildren: false,
      transitionResetType: null
    };
    _this._handleTransitionEnd = _this._handleTransitionEnd.bind(_assertThisInitialized(_this));
    _this._handleSwipeLeft = _this._handleSwipeLeft.bind(_assertThisInitialized(_this));
    _this._handleSwipeRight = _this._handleSwipeRight.bind(_assertThisInitialized(_this));
    _this._listenKeys = _this._listenKeys.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SwipeSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          hasKeysNavigation = _this$props.hasKeysNavigation,
          setItemsLength = _this$props.setItemsLength;
      var itemsLength = this.state.itemsLength;
      setItemsLength(itemsLength);

      if (hasKeysNavigation) {
        this.addKeyUpListener();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      // This removes the transition: none from the div, should be done after the movement is finished.
      if (this.props.isInfinite && this.state.isFakeTransition) {
        setTimeout(function () {
          _this2.props.setIsMovementBlocked(false);

          _this2.setState({
            isFakeTransition: false
          });
        }, 80); // Slow enough for React to update DOM, fast enough for user to not perceive it
      }

      if (prevProps.hasKeysNavigation && !this.props.hasKeysNavigation) {
        this.removeKeyUpListener();
      }

      if (!prevProps.hasKeysNavigation && this.props.hasKeysNavigation) {
        this.addKeyUpListener();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.hasKeysNavigation && document.removeEventListener("keyup", this._listenKeys);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          disableSwipe = _this$props2.disableSwipe,
          activeItem = _this$props2.activeItem,
          children = _this$props2.children,
          goNext = _this$props2.goNext,
          goPrev = _this$props2.goPrev,
          hasKeysNavigation = _this$props2.hasKeysNavigation,
          isRTL = _this$props2.isRTL,
          itemsToShow = _this$props2.itemsToShow,
          isInfinite = _this$props2.isInfinite,
          isMovementBlocked = _this$props2.isMovementBlocked,
          setItemsLength = _this$props2.setItemsLength,
          setIsMovementBlocked = _this$props2.setIsMovementBlocked,
          otherProps = _objectWithoutProperties(_this$props2, ["className", "disableSwipe", "activeItem", "children", "goNext", "goPrev", "hasKeysNavigation", "isRTL", "itemsToShow", "isInfinite", "isMovementBlocked", "setItemsLength", "setIsMovementBlocked"]);

      var hasEnoughChildren = this.state.hasEnoughChildren;
      var onSwiping = disableSwipe || !hasEnoughChildren ? {} : {
        onSwipedRight: this._handleSwipeRight,
        onSwipedLeft: this._handleSwipeLeft
      };
      return /*#__PURE__*/React.createElement(ReactSwipeEvents, onSwiping, /*#__PURE__*/React.createElement("div", _extends({
        className: cx(Styles.slider, className),
        style: this.sliderInfinityStyles(),
        onTransitionEnd: this._handleTransitionEnd
      }, otherProps), this.renderSlides()));
    }
  }, {
    key: "renderSlides",
    value: function renderSlides() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          itemsToShow = _this$props3.itemsToShow;
      var style = {
        width: "".concat((100 / itemsToShow).toFixed(6), "%")
      };

      var slides = _renderSlides(children, itemsToShow, style);

      if (this.shouldItBeInfinite()) {
        // Clone the firsts children to the end to be able to do a loop animation
        for (var i = 0; i < itemsToShow; i++) {
          slides.push(cloneSlide(children[i], i, true, null, style));
        }
      }

      return slides;
    }
  }, {
    key: "shouldItBeInfinite",
    value: function shouldItBeInfinite() {
      // Make sure the number of children is bigger than the slidesToShow,
      // otherwise there is no sense in being a carousel.
      return !!(this.props.isInfinite && this.state.hasEnoughChildren);
    }
  }, {
    key: "sliderInfinityStyles",
    value: function sliderInfinityStyles() {
      var itemsToShow = this.props.itemsToShow;
      var activeItem = this.state.activeItem;
      var unitAbs = this.props.isRTL ? "" : "-";
      return {
        transform: "translate3d(".concat(unitAbs).concat(activeItem * (100 / itemsToShow), "%, 0, 0)"),
        transition: this.state.isFakeTransition ? "none" : ""
      };
    }
  }, {
    key: "addKeyUpListener",
    value: function addKeyUpListener() {
      if (this.state.hasEnoughChildren) {
        document.addEventListener("keyup", this._listenKeys);
      }
    }
  }, {
    key: "removeKeyUpListener",
    value: function removeKeyUpListener() {
      document.removeEventListener("keyup", this._listenKeys);
    }
  }, {
    key: "_listenKeys",
    value: function _listenKeys(e) {
      var isKeyPressed = {
        isKeyPressed: true
      };

      switch (e.keyCode) {
        case LEFT_KEY_CODE:
          return this.props.isRTL ? this.props.goNext(isKeyPressed) : this.props.goPrev(isKeyPressed);

        case RIGHT_KEY_CODE:
          return this.props.isRTL ? this.props.goPrev(isKeyPressed) : this.props.goNext(isKeyPressed);

        default:
          break;
      }
    }
  }, {
    key: "_handleTransitionEnd",
    value: function _handleTransitionEnd() {
      var isInfinite = this.props.isInfinite;
      var transitionResetType = this.state.transitionResetType;

      if (isInfinite && transitionResetType === "last-to-first") {
        this.setState({
          activeItem: 0,
          isFakeTransition: true
        });
      }
    }
  }, {
    key: "_handleSwipeLeft",
    value: function _handleSwipeLeft() {
      var methodToCall = "goNext";

      if (this.props.isRTL) {
        methodToCall = "goPrev";
      }

      return this.props[methodToCall]();
    }
  }, {
    key: "_handleSwipeRight",
    value: function _handleSwipeRight() {
      var methodToCall = "goPrev";

      if (this.props.isRTL) {
        methodToCall = "goNext";
      }

      return this.props[methodToCall]();
    }
  }]);

  return SwipeSlider;
}(Component);

SwipeSlider.defaultProps = {
  hasKeysNavigation: true,
  disableSwipe: false,
  isInfinite: false
};
SwipeSlider.propTypes = {
  activeItem: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disableSwipe: PropTypes.bool,
  hasKeysNavigation: PropTypes.bool,
  goNext: PropTypes.func.isRequired,
  goPrev: PropTypes.func.isRequired,
  isRTL: PropTypes.bool,
  itemsToShow: PropTypes.number.isRequired,
  isInfinite: PropTypes.bool,
  setItemsLength: PropTypes.func.isRequired,
  setIsMovementBlocked: PropTypes.func.isRequired,
  isMovementBlocked: PropTypes.bool,
  direction: PropTypes.string
};
export default SwipeSlider;