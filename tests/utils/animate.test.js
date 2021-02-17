import animate, { animateScroll } from '../../src/utils/animate';
import easeInOutQuad from '../../src/utils/easeInOutQuad';

let initialTimestamp = 0;
const rafStep = 100;

const mockRequestAnimationFrame = jest.fn((animate) => {
    initialTimestamp = initialTimestamp + rafStep;

    animate(initialTimestamp);
});

const callback = {
    start: jest.fn(),
    progress: jest.fn(),
    done: jest.fn(),
};

describe('animate', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });
    beforeEach(() => {
        window.requestAnimationFrame = mockRequestAnimationFrame;
        jest.clearAllMocks();
        jest.clearAllTimers();
    });
    it('should make animation with all steps', () => {
        animate(callback, 0.3);

        jest.runAllTimers();

        expect(callback.start).toHaveBeenCalledTimes(1);
        expect(callback.progress).toHaveBeenCalledTimes(2);
        expect(callback.done).toHaveBeenCalledTimes(1);
    });

    it('should make animation without duration', () => {
        animate(callback);

        jest.runAllTimers();

        expect(callback.start).toHaveBeenCalledTimes(1);
        expect(callback.progress).toHaveBeenCalled();
        expect(callback.done).toHaveBeenCalledTimes(1);
    });

    it('should not break animation without callbacks', () => {
        const anotherCallback = {
            start: 'test',
            progress: 'test',
            done: 'test',
        };

        animate(anotherCallback, 0.3);
    });
});

describe('animateScroll', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });
    beforeEach(() => {
        window.requestAnimationFrame = mockRequestAnimationFrame;
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    it('should handle animation progress', () => {
        const startPosition = 0;
        const finalPosition = 1000;
        const diffPosition = 1000;

        const durationInSec = 0.3;
        const durationInMs = 300;

        const el = {
            scrollLeft: startPosition,
            scroll: jest.fn(),
        };

        animateScroll(el, finalPosition, durationInSec, undefined);

        jest.runAllTimers();

        const animationTimeInvocation1 = 0;
        const percentage = animationTimeInvocation1 / durationInMs;

        const animationPosition =
            startPosition + easeInOutQuad(percentage) * diffPosition;

        const steps = durationInMs / rafStep + 1;
        expect(el.scroll).toHaveBeenCalledTimes(steps);
        expect(el.scroll).toHaveBeenNthCalledWith(1, animationPosition, 0);

        const animationTimeInvocation2 = rafStep;
        const percentage2 = animationTimeInvocation2 / durationInMs;
        const animationPosition2 =
            startPosition + easeInOutQuad(percentage2) * diffPosition;
        expect(el.scroll).toHaveBeenNthCalledWith(2, animationPosition2, 0);
    });

    it('should handle animation when it is done', () => {
        const startPosition = 0;
        const finalPosition = 1000;

        const durationInSec = 0.3;
        const durationInMs = 300;

        const el = {
            scrollLeft: startPosition,
            scroll: jest.fn(),
        };

        const onDone = jest.fn();

        animateScroll(el, finalPosition, durationInSec, onDone);

        const steps = durationInMs / rafStep + 1;
        expect(el.scroll).toHaveBeenCalledTimes(steps);

        expect(el.scroll).toHaveBeenLastCalledWith(finalPosition, 0);
        expect(onDone).toHaveBeenCalledTimes(1);
    });
});
