export const quad = (timeFraction) => Math.pow(timeFraction, 2);

export const circ = (timeFraction) => 1 - Math.sin(Math.acos(timeFraction));

export const makeEaseOut = (timing) => (timeFraction) =>
    1 - timing(1 - timeFraction);

export const makeEaseInOut = (timing) => (timeFraction) => {
    if (timeFraction < 0.5) return timing(2 * timeFraction) / 2;
    else return (2 - timing(2 * (1 - timeFraction))) / 2;
};
