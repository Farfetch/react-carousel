"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ = require("./");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var CarouselProvider = /*#__PURE__*/function (_Component) {
  _inherits(CarouselProvider, _Component);

  var _super = _createSuper(CarouselProvider);

  _createClass(CarouselProvider, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var isRTL = props.isRTL,
          itemsToShow = props.itemsToShow,
          isInfinite = props.isInfinite,
          itemsToScroll = props.itemsToScroll;
      return _objectSpread(_objectSpread({}, state), {}, {
        isRTL: isRTL,
        itemsToShow: itemsToShow,
        isInfinite: isInfinite,
        itemsToScroll: itemsToScroll
      });
    }
  }]);

  function CarouselProvider(props) {
    var _this;

    _classCallCheck(this, CarouselProvider);

    _this = _super.call(this, props);
    _this._setItemsLength = _this._setItemsLength.bind(_assertThisInitialized(_this));
    _this._setIsMovementBlocked = _this._setIsMovementBlocked.bind(_assertThisInitialized(_this));
    _this._goTo = _this._goTo.bind(_assertThisInitialized(_this));
    _this._goNext = _this._goNext.bind(_assertThisInitialized(_this));
    _this._goPrev = _this._goPrev.bind(_assertThisInitialized(_this));
    _this.state = {
      activeItem: _this.props.startItem,
      isRTL: false,
      isInfinite: false,
      isMovementBlocked: false,
      itemsToShow: 1,
      itemsLength: 0,
      setItemsLength: _this._setItemsLength,
      setIsMovementBlocked: _this._setIsMovementBlocked,
      goTo: _this._goTo,
      goNext: _this._goNext,
      goPrev: _this._goPrev,
      itemsToScroll: 1,
      direction: null
    };
    return _this;
  }

  _createClass(CarouselProvider, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.startItem !== this.props.startItem) {
        this.setState({
          activeItem: this.props.startItem
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return /*#__PURE__*/_react["default"].createElement(_.CarouselContext.Provider, {
        value: this.state
      }, children);
    }
  }, {
    key: "_getDirection",
    value: function _getDirection(newActiveItem) {
      var activeItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.activeItem;
      var lastItem = this.state.itemsLength - 1;

      if (newActiveItem === 0 && lastItem === activeItem) {
        return 'next';
      }

      if (activeItem === 0 && newActiveItem === lastItem) {
        return 'prev';
      }

      return activeItem < newActiveItem ? 'next' : 'prev';
    }
  }, {
    key: "_setActiveItem",
    value: function _setActiveItem(newActiveItem) {
      var _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var onAfterChange = this.props.onAfterChange;
      var activeItem = this.state.activeItem;

      if (newActiveItem === activeItem) {
        return null;
      }

      this.setState({
        activeItem: newActiveItem
      }, function () {
        return onAfterChange && onAfterChange(_objectSpread({
          index: newActiveItem,
          dir: _this2._getDirection(newActiveItem, activeItem)
        }, options));
      });
    }
  }, {
    key: "_setItemsLength",
    value: function _setItemsLength(itemsLength) {
      this.setState({
        itemsLength: itemsLength
      });
    }
  }, {
    key: "_setIsMovementBlocked",
    value: function _setIsMovementBlocked(isBlocked) {
      this.setState({
        isMovementBlocked: isBlocked
      });
    }
  }, {
    key: "_goTo",
    value: function _goTo(index) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _this$state = this.state,
          itemsLength = _this$state.itemsLength,
          itemsToShow = _this$state.itemsToShow,
          isMovementBlocked = _this$state.isMovementBlocked;
      var isInvalidIndex = typeof index !== 'number' || itemsToShow > itemsLength || index < 0 || index > itemsLength - 1;

      if (isMovementBlocked || isInvalidIndex) {
        return null;
      }

      this._setActiveItem(index, options);
    }
  }, {
    key: "_goNext",
    value: function _goNext() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$state2 = this.state,
          activeItem = _this$state2.activeItem,
          isInfinite = _this$state2.isInfinite,
          itemsLength = _this$state2.itemsLength;
      var itemsToScroll = this.props.itemsToScroll;
      var newActiveItem = activeItem + itemsToScroll; // Stop at the first positon

      if (isInfinite && newActiveItem > itemsLength - 1) {
        newActiveItem = 0;
      }

      this.setState({
        direction: 'next'
      });

      this._goTo(newActiveItem, options);
    }
  }, {
    key: "_goPrev",
    value: function _goPrev() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$state3 = this.state,
          activeItem = _this$state3.activeItem,
          isInfinite = _this$state3.isInfinite,
          itemsLength = _this$state3.itemsLength;
      var itemsToScroll = this.props.itemsToScroll;
      var newActiveItem = activeItem - itemsToScroll; // Stop at the first positon

      if (isInfinite && newActiveItem < 0 && activeItem === 0) {
        newActiveItem = itemsLength - itemsToScroll;
      } // Move to a slide before the first position


      if (isInfinite && newActiveItem < 0 && activeItem !== 0) {
        newActiveItem = 0;
      }

      this.setState({
        direction: 'prev'
      });

      this._goTo(newActiveItem, options);
    }
  }]);

  return CarouselProvider;
}(_react.Component);

CarouselProvider.defaultProps = {
  itemsToShow: 1,
  isRTL: false,
  isInfinite: false,
  itemsToScroll: 1,
  startItem: 0
};
CarouselProvider.propTypes = {
  children: _propTypes["default"].node.isRequired,
  isRTL: _propTypes["default"].bool,
  isInfinite: _propTypes["default"].bool,
  itemsToShow: _propTypes["default"].number,
  onAfterChange: _propTypes["default"].func,
  itemsToScroll: _propTypes["default"].number,
  startItem: _propTypes["default"].number
};
var _default = CarouselProvider;
exports["default"] = _default;
module.exports = exports.default;