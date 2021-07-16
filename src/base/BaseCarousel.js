import { CarouselProvider } from '#context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class BaseCarousel extends Component {
    render() {
        const {
            children,
            isInfinite,
            isRTL,
            itemsToShow,
            itemsToScroll,
            onAfterChange,
            startItem,
            ...otherProps
        } = this.props;

        const providerProps = {
            isInfinite,
            isRTL,
            itemsToShow,
            onAfterChange,
            itemsToScroll,
            startItem,
        };

        return (
            <CarouselProvider {...providerProps}>
                <div {...otherProps}>{children}</div>
            </CarouselProvider>
        );
    }
}

BaseCarousel.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    isInfinite: PropTypes.bool,
    isRTL: PropTypes.bool,
    itemsToShow: PropTypes.number,
    onAfterChange: PropTypes.func,
    itemsToScroll: PropTypes.number,
    startItem: PropTypes.number,
};

BaseCarousel.defaultProps = {
    itemsToScroll: 1,
};

export default BaseCarousel;
