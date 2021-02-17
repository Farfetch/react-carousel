import easeInOutQuad from "./easeInOutQuad";

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

export var animateScroll = function animateScroll(el, finalPosition, transitionDuration, onDone) {
  var startPosition = el.scrollLeft;
  var diffPosition = finalPosition - startPosition;
  var callback = {
    progress: function progress(percentage) {
      var animationPosition = startPosition + easeInOutQuad(percentage) * diffPosition;

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
export default animate;