import { Children } from 'react';
import { cloneSlide } from '#utils';

const renderSlides = (children, itemsToShow, style) => {
    return Children.map(children, (child, index) =>
        cloneSlide(child, index, false, null, style)
    );
};

export default renderSlides;
