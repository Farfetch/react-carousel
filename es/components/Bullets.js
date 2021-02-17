function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Styles from "./Bullets.css";
import cx from 'classnames';

var Bullets = /*#__PURE__*/function (_PureComponent) {
  _inherits(Bullets, _PureComponent);

  var _super = _createSuper(Bullets);

  _createClass(Bullets, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var bullets = Math.ceil(props.itemsLength / props.itemsToScroll);
      var activeBullet = Math.ceil(props.activeItem / props.itemsToScroll);
      return {
        isInfinite: bullets > state.maxBullets,
        translationValue: props.isRTL ? 1.8 : -1.8,
        itemsToScroll: props.itemsToScroll,
        bullets: bullets,
        activeBullet: activeBullet
      };
    }
  }]);

  function Bullets(props) {
    var _this;

    _classCallCheck(this, Bullets);

    _this = _super.call(this, props);
    _this.state = {
      maxBullets: 5,
      translationValue: 0,
      isInfinite: false,
      itemsToScroll: 1,
      bullets: 5,
      activeBullet: 1
    };
    return _this;
  }

  _createClass(Bullets, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          activeItem = _this$props.activeItem,
          itemsLength = _this$props.itemsLength,
          theme = _this$props.theme,
          isRTL = _this$props.isRTL,
          itemsToScroll = _this$props.itemsToScroll,
          otherProps = _objectWithoutProperties(_this$props, ["activeItem", "itemsLength", "theme", "isRTL", "itemsToScroll"]);

      var isInfinite = this.state.isInfinite;
      var cxs = this.getClassNamesToApply();
      return /*#__PURE__*/React.createElement("div", _extends({
        className: cxs,
        "aria-hidden": "true",
        "data-active": activeItem
      }, otherProps), isInfinite ? /*#__PURE__*/React.createElement("div", {
        className: Styles.moveInfinite,
        style: {
          transform: "translate(".concat(this.getTranslationValue(), "rem)")
        }
      }, this.getBullets()) : this.getBullets());
    }
  }, {
    key: "getSecondaryBullets",
    value: function getSecondaryBullets() {
      var _this$state = this.state,
          activeBullet = _this$state.activeBullet,
          bullets = _this$state.bullets;
      return {
        // Secondary bullet is the previous one, unless active bullet is the first
        first: activeBullet === 0 ? 2 : activeBullet - 1,
        // Other secondary bullet is the next one, unless active bullet is the last one
        second: activeBullet === bullets ? activeBullet - 2 : activeBullet + 1
      };
    }
  }, {
    key: "getTranslationValue",
    value: function getTranslationValue() {
      var _this$state2 = this.state,
          translationValue = _this$state2.translationValue,
          maxBullets = _this$state2.maxBullets,
          bullets = _this$state2.bullets,
          activeBullet = _this$state2.activeBullet; // If active slide is in first, second or third position translation doesn't happen

      if (bullets <= maxBullets || activeBullet <= 2) {
        return 0;
      } // If active slide is one of the last three positions translation stays the same


      if (activeBullet > bullets - 3) {
        return (bullets - maxBullets) * translationValue;
      } // Generic case where the bullets are translated


      return (activeBullet - 2) * translationValue;
    }
  }, {
    key: "getBullets",
    value: function getBullets() {
      var _this$props2 = this.props,
          activeItem = _this$props2.activeItem,
          theme = _this$props2.theme;
      var _this$state3 = this.state,
          isInfinite = _this$state3.isInfinite,
          activeBullet = _this$state3.activeBullet,
          bullets = _this$state3.bullets;
      var secondaryBullets = this.getSecondaryBullets();
      var itemsNodes = [];

      var getCxInfinite = function getCxInfinite(index) {
        var _cx;

        return cx(Styles.bulletInfinite, (_cx = {}, _defineProperty(_cx, Styles.isActive, activeBullet === index), _defineProperty(_cx, Styles.isSecondary, secondaryBullets.first === index || secondaryBullets.second === index), _defineProperty(_cx, theme.isActive, theme.isActive && activeItem === index), _cx));
      };

      var getCxDefault = function getCxDefault(index) {
        var _cx2;

        return cx(Styles.bullet, (_cx2 = {}, _defineProperty(_cx2, Styles.isActive, activeBullet === index), _defineProperty(_cx2, theme.isActive, theme.isActive && activeItem === index), _cx2));
      };

      var generateClass = isInfinite ? getCxInfinite : getCxDefault;

      for (var i = 0; i < bullets; i++) {
        itemsNodes.push( /*#__PURE__*/React.createElement("span", {
          key: i,
          className: generateClass(i),
          "data-tstid": "bullet"
        }));
      }

      return itemsNodes;
    }
  }, {
    key: "getClassNamesToApply",
    value: function getClassNamesToApply() {
      var theme = this.props.theme;
      var isInfinite = this.state.isInfinite;

      var baseThemeClasses = _defineProperty({}, theme.container, !!theme.container);

      if (isInfinite) {
        return cx(Styles.containerInfinite, _objectSpread(_objectSpread({}, baseThemeClasses), {}, _defineProperty({}, theme.containerInfinite, !!theme.containerInfinite)));
      }

      return cx(Styles.containerDefault, _objectSpread(_objectSpread({}, baseThemeClasses), {}, _defineProperty({}, theme.containerDefault, !!theme.containerDefault)));
    }
  }]);

  return Bullets;
}(PureComponent);

Bullets.propTypes = {
  /* Index of active item - start on 0 */
  activeItem: PropTypes.number.isRequired,

  /* Items length */
  itemsLength: PropTypes.number.isRequired,

  /* Navigation direction  */
  isRTL: PropTypes.bool,

  /* SliderNav theme */
  theme: PropTypes.shape({
    container: PropTypes.string,
    containerDefault: PropTypes.string,
    containerInfinite: PropTypes.string,
    moveInfinite: PropTypes.string,
    bullet: PropTypes.string,
    bulletInfinite: PropTypes.string,
    isSecondary: PropTypes.string,
    isActive: PropTypes.string
  }),
  itemsToScroll: PropTypes.number
};
Bullets.defaultProps = {
  theme: {},
  itemsToScroll: 1
};
export default Bullets;