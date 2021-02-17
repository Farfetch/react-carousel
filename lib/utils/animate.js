"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.animateScroll = void 0;

var _easeInOutQuad = _interopRequireDefault(require("./easeInOutQuad"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var animate = function animate(callbackObj, durationInSec) {
  var durationInMs = durationInSec * 1000 || 1000;
  var startTime = 0;
  var percentage = 0;
  var animationTime = 0;

  var animation = function animation(timestamp) {
    if (startTime === 0) {
      startTime = timestamp;
    } else {
      animationTime = timestamp - startTime;
    }

    if (typeof callbackObj.start === 'function' && startTime === timestamp) {
      callbackObj.start();
      window.requestAnimationFrame(animation);
    } else if (animationTime < durationInMs) {
      if (typeof callbackObj.progress === 'function') {
        percentage = animationTime / durationInMs;
        callbackObj.progress(percentage);
      }

      window.requestAnimationFrame(animation);
    } else if (typeof callbackObj.done === 'function') {
      callbackObj.done();
    }
  };

  return window.requestAnimationFrame(animation);
};

var animateScroll = function animateScroll(el, finalPosition, transitionDuration, onDone) {
  var startPosition = el.scrollLeft;
  var diffPosition = finalPosition - startPosition;
  var callback = {
    progress: function progress(percentage) {
      var animationPosition = startPosition + (0, _easeInOutQuad["default"])(percentage) * diffPosition;

      if (el.scroll) {
        el.scroll(animationPosition, 0);
      } else {
        // IE/Edge do not support scroll() or scrollTo()
        el.scrollLeft = animationPosition;
      }
    },
    done: function done() {
      if (el.scroll) {
        el.scroll(startPosition + diffPosition, 0);
      } else {
        // IE/Edge do not support scroll() or scrollTo()
        el.scrollLeft = startPosition + diffPosition;
      }

      if (typeof onDone === 'function') {
        onDone();
      }
    }
  };
  animate(callback, transitionDuration);
};

exports.animateScroll = animateScroll;
var _default = animate;
exports["default"] = _default;