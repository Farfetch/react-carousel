import { SNAP } from './constants';

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
    timingFunction,
    type,
    onDone
) => {
    const startPosition = el.scrollLeft;
    const diffPosition = finalPosition - startPosition;
    const scrollBehaviorSupport = CSS.supports('scroll-behavior', 'smooth');

    const callback = {
        progress: (percentage) => {
            if (type === SNAP && !scrollBehaviorSupport) {
                el.style.scrollSnapType = 'none';
            }
            const animationPosition =
                startPosition + timingFunction(percentage) * diffPosition;
            el.scroll(animationPosition, 0);
        },
        done: () => {
            if (type === SNAP && !scrollBehaviorSupport) {
                el.style.scrollSnapType = 'x mandatory';
            }
            el.scroll(startPosition + diffPosition, 0);
            if (typeof onDone === 'function') {
                onDone();
            }
        },
    };

    animate(callback, transitionDuration);
};

export default animate;
