import { CarouselProvider } from '#context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Styles from './Carousel.css';
import cx from 'classnames';

class Carousel extends Component {
    render() {
        const {
            className,
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
                <div
                    className={cx(Styles.container, className)}
                    {...otherProps}
                >
                    {children}
                </div>
            </CarouselProvider>
        );
    }
}

Carousel.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    isInfinite: PropTypes.bool,
    isRTL: PropTypes.bool,
    itemsToShow: PropTypes.number,
    onAfterChange: PropTypes.func,
    itemsToScroll: PropTypes.number,
    startItem: PropTypes.number,
};

Carousel.defaultProps = {
    itemsToScroll: 1,
};

export default Carousel;
