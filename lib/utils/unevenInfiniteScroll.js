"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getLastNodePosition = exports.getElementStyleValue = exports.getTranslateValue = exports.isNodeVisible = void 0;

var _ = require("./");

var isNodeVisible = function isNodeVisible(container, node, direction) {
  if (!node || !container) {
    return;
  }

  var nodePosition = node.getBoundingClientRect().left;
  var offsetLeft = container.getBoundingClientRect().left;
  return direction === 'next' ? nodePosition - offsetLeft > node.offsetWidth * -1 : nodePosition - offsetLeft < container.offsetWidth;
};

exports.isNodeVisible = isNodeVisible;

var getTranslateValue = function getTranslateValue(node, translatePosition) {
  if (!node || !translatePosition) {
    return;
  }

  var translationRegEx = new RegExp("\\.*translate".concat(translatePosition, "\\((.*)(px|em|rem|%)\\)"), 'i');
  var translateValue = node.style.transform.match(translationRegEx);
  return translateValue ? parseInt(translateValue[1], 10) : 0;
};

exports.getTranslateValue = getTranslateValue;

var getElementStyleValue = function getElementStyleValue(element, styleValue) {
  if (!window) {
    return;
  }

  var elementStyle = element.currentStyle || window.getComputedStyle(element);
  return parseInt(elementStyle[styleValue].replace(/[a-z]|[A-Z]|%/g, '')) || 0;
};

exports.getElementStyleValue = getElementStyleValue;

var getLastNodePosition = function getLastNodePosition(wrapper, currentPosition, moveWidth, direction) {
  var firstItem = wrapper.firstElementChild;
  var lastItem = wrapper.lastElementChild;

  if (!firstItem || !lastItem) {
    return 0;
  }

  var firstItemPosition = lastItem.offsetWidth - firstItem.offsetLeft;
  var nodeMargin = getElementStyleValue(firstItem, 'marginRight') * 2;
  var elementPos = direction === 'next' ? currentPosition * -1 : currentPosition;
  elementPos += moveWidth;
  elementPos -= firstItemPosition;
  elementPos -= nodeMargin;
  return direction === 'next' ? lastItem.offsetLeft - elementPos : (lastItem.offsetLeft - elementPos) * -1;
};

exports.getLastNodePosition = getLastNodePosition;

var moveCarousel = function moveCarousel(container, wrapper, ratioToScroll, direction) {
  var isRTL = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var customMoveWidth = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  if (!container || !wrapper || !ratioToScroll || !direction) {
    return;
  }

  if (isRTL) {
    direction = direction === 'next' ? 'prev' : 'next';
  }

  var itemMoveWidth = !customMoveWidth ? Math.round((wrapper.offsetWidth - container.offsetWidth) / wrapper.childElementCount / 10) : Math.round(customMoveWidth * (customMoveWidth / wrapper.childElementCount));

  var moveItem = function moveItem() {
    for (var index = 0; index < wrapper.childElementCount; index++) {
      var node = wrapper.childNodes[index];
      var nodeTransformValue = getTranslateValue(node, 'X');

      if (isNodeVisible(container, node, direction)) {
        nodeTransformValue = direction === 'next' ? nodeTransformValue - itemMoveWidth : nodeTransformValue + itemMoveWidth;
      } else {
        nodeTransformValue = getLastNodePosition(wrapper, nodeTransformValue, itemMoveWidth, direction);
      }

      node.style.transform = "translateX(".concat(nodeTransformValue, "px)");
    }
  };

  moveItem();

  if (!customMoveWidth) {
    (0, _.animate)({
      progress: moveItem
    }, ratioToScroll);
  }
};

var _default = moveCarousel;
exports["default"] = _default;