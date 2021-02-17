import easeInOutQuad from './easeInOutQuad';

const animate = (callbackObj, durationInSec) => {
    const durationInMs = durationInSec * 1000 || 1000;
    let startTime = 0;
    let percentage = 0;
    let animationTime = 0;

    const animation = (timestamp) => {
        if (startTime === 0) {
            startTime = timestamp;
        } else {
            animationTime = timestamp - startTime;
        }

        if (
            typeof callbackObj.start === 'function' &&
            startTime === timestamp
        ) {
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

export const animateScroll = (
    el,
    finalPosition,
    transitionDuration,
    onDone
) => {
    const startPosition = el.scrollLeft;
    const diffPosition = finalPosition - startPosition;

    const callback = {
        progress: (percentage) => {
            const animationPosition =
                startPosition + easeInOutQuad(percentage) * diffPosition;
            if (el.scroll) {
                el.scroll(animationPosition, 0);
            } else {
                // IE/Edge do not support scroll() or scrollTo()
                el.scrollLeft = animationPosition;
            }
        },
        done: () => {
            if (el.scroll) {
                el.scroll(startPosition + diffPosition, 0);
            } else {
                // IE/Edge do not support scroll() or scrollTo()
                el.scrollLeft = startPosition + diffPosition;
            }
            if (typeof onDone === 'function') {
                onDone();
            }
        },
    };

    animate(callback, transitionDuration);
};

export default animate;
