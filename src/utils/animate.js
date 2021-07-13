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
    onDone
) => {
    const startPosition = el.scrollLeft;
    const diffPosition = finalPosition - startPosition;

    const callback = {
        progress: (percentage) => {
            const animationPosition =
                startPosition + timingFunction(percentage) * diffPosition;
            el.scroll({
                left: animationPosition,
                top: 0,
                behavior: 'smooth',
            });
        },
        done: () => {
            el.scroll({
                left: startPosition + diffPosition,
                top: 0,
                behavior: 'smooth',
            });

            if (typeof onDone === 'function') {
                onDone();
            }
        },
    };

    animate(callback, transitionDuration);
};

export default animate;
