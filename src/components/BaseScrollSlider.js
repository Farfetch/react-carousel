/* import { CarouselContext } from '#context';
import { animateScroll, quad, renderSlides } from '#utils';
import PropTypes from 'prop-types';
import React, { forwardRef, useContext } from 'react';

const BaseScrollSlider = forwardRef(({ children, as: As, ...rest }, ref) => {
    const {
        activeItem,
        isRTL,
        itemsToShow,
        setItemsLength,
        goTo,
    } = React.useContext(CarouselContext);

    return (
        <As ref={ref} {...rest}>
            {children}
        </As>
    );
});

BaseScrollSlider.displayName = 'BaseScrollSlider';

BaseScrollSlider.defaultProps = {
    as: 'div',
};

BaseScrollSlider.propTypes = {
    as: PropTypes.string,
    children: PropTypes.element,
};

export default BaseScrollSlider;
 */
