import { cloneElement } from 'react';
import cx from 'classnames';
import memoize from 'fast-memoize';

const getElementStyle = function (style, styleChild) {
    return { ...style, ...styleChild };
};

const memoizedGetElementStyle = memoize(getElementStyle);

const cloneSlide = (child, index, isCloned, className, style) => {
    const newStyle = memoizedGetElementStyle(style, child.props.style);

    return cloneElement(child, {
        className: cx(className, 'slide', child.props.className),
        style: newStyle,
        key: isCloned ? `c.${index}` : child.key,
        ref: (node) => {
            // Keep ref when use cloneElement - Dan Abramov's tweet:
            // https://twitter.com/dan_abramov/status/752944645018189825?lang=en
            if (child.ref && !isCloned) {
                child.ref(node);
            }
        },
    });
};

export default cloneSlide;
