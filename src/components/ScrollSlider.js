import { animateScroll, renderSlides } from '#utils';
import PropTypes from 'prop-types';
import React, { Children, Component, forwardRef } from 'react';
import cx from 'classnames';
import debounce from 'lodash/debounce';

export class ScrollSlider extends Component {
    constructor(props) {
        super(props);
        this._verifyActiveItemDebounce = debounce(this._verifyActiveItem, 25);
        this._handleScroll = this._handleScroll.bind(this);
        this.itemsLength = Children.count(props.children);
        this.activeItem = 0;
        this.shouldMoveToItem = false;
        this.isPreventingScroll = false;
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
            className,
            children,
            goTo,
            isRTL,
            itemsToShow,
            limitScroll,
            setItemsLength,
            containerRef,
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
                ref={containerRef}
                className={cx('slider', 'scrollSliderContainer', className)}
                onScroll={this._handleScroll}
                {...othersProps}
            >
                {renderSlides(children, itemsToShow, style)}
            </div>
        );
    }

    _moveToItem() {
        const { activeItem, itemsToShow, isRTL, containerRef } = this.props;
        const el = containerRef.current;

        if (!el) {
            return null;
        }

        const { offsetWidth } = el;

        const itemToMoveTo = isRTL
            ? this.itemsLength - 2 - activeItem
            : activeItem;
        const finalPosition = (offsetWidth / itemsToShow) * itemToMoveTo;

        animateScroll(el, finalPosition, 0.3, () => {
            this.shouldMoveToItem = false;
        });
    }

    /* Don't work on Chrome, but work on iOS */
    _forceScrollSnapStop(newPosition, newIndex) {
        const el = this.props.containerRef.current;

        if (!el) {
            return null;
        }

        el.scrollLeft = newPosition;
        this.isPreventingScroll = true;
        el.style.overflow = 'hidden';

        setTimeout(() => {
            this.isPreventingScroll = false;
            el.style.overflow = '';
        }, 80);

        this.props.goTo(newIndex);
    }

    _verifyActiveItem() {
        const { goTo, itemsToShow, isRTL, containerRef } = this.props;
        const { offsetWidth, scrollLeft } = containerRef.current;

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

        const { limitScroll, itemsToShow, containerRef } = this.props;

        if (limitScroll) {
            const { offsetWidth, scrollLeft } = containerRef.current;

            // When scrolling too fast, we want to prevent scrolling 2 slides at once...
            const newPrevIndex = this.activeItem - 1;
            const newNextIndex = this.activeItem + 1;
            const limitScrollNext = (offsetWidth / itemsToShow) * newNextIndex;
            const limitScrollPrev = (offsetWidth / itemsToShow) * newPrevIndex;

            // ...so, we need to force a scroll stop limit position when that happens ...
            if (scrollLeft > limitScrollNext) {
                return this._forceScrollSnapStop(limitScrollNext, newNextIndex);
            } else if (scrollLeft < limitScrollPrev) {
                return this._forceScrollSnapStop(limitScrollPrev, newPrevIndex);
            }
        }

        this._verifyActiveItemDebounce();
    }
}

ScrollSlider.propTypes = {
    activeItem: PropTypes.number.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    isRTL: PropTypes.bool.isRequired,
    itemsToShow: PropTypes.number.isRequired,
    setItemsLength: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    limitScroll: PropTypes.bool,
    containerRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.elementType }),
    ]),
};

export default forwardRef(function ScrollSliderForwardingRef(props, ref) {
    return <ScrollSlider containerRef={ref} {...props} />;
});
