import { SCROLL, animateScroll, easeInOutQuad, renderSlides } from '#utils';
import PropTypes from 'prop-types';
import React, { Children, Component, createRef } from 'react';
import debounce from 'lodash/debounce';

class BaseScrollSlider extends Component {
    constructor(props) {
        super(props);
        this._verifyActiveItemDebounce = debounce(this._verifyActiveItem, 25);
        this._handleScroll = this._handleScroll.bind(this);
        this.itemsLength = Children.count(props.children);
        this.activeItem = 0;
        this.shouldMoveToItem = false;
        this.isPreventingScroll = false;
        this.containerRef = createRef();
    }

    componentDidMount() {
        this.props.setItemsLength(this.itemsLength);
    }

    componentDidUpdate() {
        if (this.shouldMoveToItem) {
            this._moveToItem();
        }
    }

    render() {
        const {
            activeItem,
            children,
            goTo,
            isRTL,
            itemsToShow,
            setItemsLength,
            animationDuration,
            animationTimingFunction,
            className = 'scrollSliderContainer',
            type,
            ...othersProps
        } = this.props;

        if (activeItem !== this.activeItem) {
            this.activeItem = activeItem;
            this.shouldMoveToItem = true;
        } else {
            this.shouldMoveToItem = false;
        }

        const style = {
            width: `${(100 / itemsToShow).toFixed(6)}%`,
        };

        return (
            <div
                className={className}
                ref={this.containerRef}
                onScroll={this._handleScroll}
                {...othersProps}
            >
                {renderSlides(children, itemsToShow, style)}
            </div>
        );
    }

    _moveToItem() {
        const { animationDuration, animationTimingFunction, type } = this.props;
        const el = this.containerRef.current;

        if (!el) {
            return null;
        }

        const { offsetWidth } = el;
        const { activeItem, itemsToShow, isRTL } = this.props;

        const itemToMoveTo = isRTL
            ? this.itemsLength - 2 - activeItem
            : activeItem;
        const finalPosition = (offsetWidth / itemsToShow) * itemToMoveTo;

        animateScroll(
            el,
            finalPosition,
            animationDuration,
            animationTimingFunction,
            type,
            () => {
                this.shouldMoveToItem = false;
            }
        );
    }

    _verifyActiveItem() {
        const { goTo, itemsToShow, isRTL } = this.props;
        const { offsetWidth, scrollLeft } = this.containerRef.current;

        const activeFraction =
            Math.round((scrollLeft / offsetWidth) * 100) / 100;
        const newActiveItem = isRTL
            ? this.itemsLength -
              1 -
              Math.round(activeFraction * itemsToShow) -
              (itemsToShow - 1)
            : Math.round(activeFraction * itemsToShow);

        if (this.activeItem === newActiveItem) {
            return null;
        }

        this.activeItem = newActiveItem;
        goTo(newActiveItem);
    }

    _handleScroll(e) {
        if (this.isPreventingScroll) {
            e.stopPropagation();
            e.preventDefault();

            return null;
        }

        if (this.shouldMoveToItem) {
            return null;
        }

        this._verifyActiveItemDebounce();
    }
}

BaseScrollSlider.defaultProps = {
    animationDuration: 0.3,
    animationTimingFunction: easeInOutQuad,
    type: SCROLL,
};

BaseScrollSlider.propTypes = {
    activeItem: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    isRTL: PropTypes.bool.isRequired,
    itemsToShow: PropTypes.number.isRequired,
    setItemsLength: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    animationDuration: PropTypes.number,
    animationTimingFunction: PropTypes.func,
    type: PropTypes.string,
    className: PropTypes.string,
};

export default BaseScrollSlider;
