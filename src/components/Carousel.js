import { CarouselProvider } from '#context';
import PropTypes from 'prop-types';
import React, { Component, forwardRef } from 'react';
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
            innerRef,
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
                    ref={innerRef}
                    className={cx('wrapper', className)}
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
    innerRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.elementType }),
    ]),
};

Carousel.defaultProps = {
    itemsToScroll: 1,
};

export default forwardRef(function CarouselForwardingRef(props, ref) {
    return <Carousel innerRef={ref} {...props} />;
});
