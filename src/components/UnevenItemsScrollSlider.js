import { animateScroll, infiniteScroll, renderSlides } from '#utils';
import PropTypes from 'prop-types';
import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import cx from 'classnames';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

const useUpdateEffect = (effect, deps) => {
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            effect();
        }

        // The effect function is not needed in the dependency array here because
        // passing its dependencies (deps) are sufficient to keep effect and deps
        // in sync as is done with useEffect.  Passing the effect function to dependency
        // array would force the client to wrap it in a useCallback as well in order
        // to prevent unnecessary runs, so overspecifying dependencies is not an option
        // either.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deps]);
};

const useResizeObserver = (el, handleResize, observationOptions) => {
    const savedHandler = useRef(handleResize);

    // Allows us to avoid creating a new Observer each time handleResize changes
    useEffect(() => {
        savedHandler.current = handleResize;
    }, [handleResize]);

    const observer = useRef(null);

    useEffect(() => {
        const observationHandler = (entries, observer) =>
            savedHandler.current(entries, observer);

        observer.current = new ResizeObserver(observationHandler);

        return function disconnect() {
            observer.current.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!(el instanceof Element)) {
            return;
        }

        observer.current.observe(el, observationOptions);

        return function unobserve() {
            observer.current.unobserve(el);
        };
    }, [el, observationOptions]);
};

const calculateFixedItemWidth = (offsetWidth, ratioToScroll) =>
    offsetWidth * ratioToScroll;

// Divide into fixed size items depending on ratioToScroll and visible part of carousel
const calculateItemsLength = (
    container,
    wrapper,
    ratioToScroll,
    isInfinite
) => {
    if (isInfinite) {
        return 0;
    }

    const { offsetWidth, scrollWidth } = container;

    const fixedItemWidth = calculateFixedItemWidth(offsetWidth, ratioToScroll);

    // Because you cannot scroll past last offsetWidth,
    // the lastItem cannot be divided and its "fixedItemWidth"
    // will always be offsetWidth of the carousel
    const scrollableWidth = scrollWidth - offsetWidth;

    const itemsLengthExceptLast = Math.ceil(scrollableWidth / fixedItemWidth);

    return itemsLengthExceptLast + 1;
};

/* Given a container element and ratioToScroll, calculates the activeItem based on
 * container's current scroll position.
 */
const calculateActiveItem = (
    containerEl,
    ratioToScroll,
    itemsLength,
    isRTL,
    isInfinite
) => {
    if (isInfinite) {
        return;
    }

    const { scrollLeft, offsetWidth, scrollWidth } = containerEl;

    // Floor because reading scrollLeft always gives an integer and our "item" starts in the beginning
    // This wouldn't be as obvious of a problem if our "item" started in the middle instead
    const ratioToScrollPx = Math.floor(
        calculateFixedItemWidth(offsetWidth, ratioToScroll)
    );

    const isLastItem = scrollLeft + offsetWidth === scrollWidth;

    let newActiveItem = isLastItem
        ? itemsLength - 1
        : Math.floor(scrollLeft / ratioToScrollPx);

    if (isRTL) {
        newActiveItem = itemsLength - 1 - newActiveItem;
    }

    return newActiveItem;
};

/**
 * A slider that supports items with varying widths.
 */
const UnevenItemsScrollSlider = (props) => {
    const {
        activeItem,
        goToOnSizeChange,
        className,
        children,
        goTo,
        isRTL,
        ratioToScroll,
        itemsLength,
        setItemsLength,
        isInfinite,
        direction,
        containerRef,
        ...otherProps
    } = props;

    const wrapperRef = useRef(null);

    useEffect(() => {
        const newItemsLength = calculateItemsLength(
            containerRef.current,
            wrapperRef.current,
            ratioToScroll,
            isInfinite
        );

        if (itemsLength !== newItemsLength) {
            setItemsLength(newItemsLength);
        }
    }, [isInfinite, itemsLength, ratioToScroll, setItemsLength, containerRef]);

    useUpdateEffect(() => {
        const displayedActiveItem = calculateActiveItem(
            containerRef.current,
            ratioToScroll,
            itemsLength,
            isRTL
        );

        const alreadySynced = displayedActiveItem === activeItem;

        if (!alreadySynced && !isInfinite) {
            const moveToItem = () => {
                const el = containerRef.current;
                if (!el) {
                    return null;
                }
                const { offsetWidth } = el;
                const itemToMoveTo = isRTL
                    ? itemsLength - 1 - activeItem
                    : activeItem;
                const itemWidth = offsetWidth * ratioToScroll;
                const finalPosition = itemWidth * itemToMoveTo;
                animateScroll(el, finalPosition, 0.3);
            };
            moveToItem();
        }
    }, [activeItem, ratioToScroll, itemsLength, isRTL, isInfinite]);

    useUpdateEffect(() => {
        if (isInfinite) {
            infiniteScroll(
                containerRef.current,
                wrapperRef.current,
                ratioToScroll,
                direction,
                itemsLength,
                activeItem,
                isRTL
            );
        }
    }, [ratioToScroll, isRTL, isInfinite]);

    const syncActiveItemAndLength = useCallback(() => {
        if (isInfinite) {
            return;
        }

        const newItemsLength = calculateItemsLength(
            containerRef.current,
            wrapperRef.current,
            ratioToScroll,
            isInfinite
        );

        const validGoToOnSizeChange =
            typeof goToOnSizeChange !== 'undefined' &&
            goToOnSizeChange > -1 &&
            goToOnSizeChange < newItemsLength;

        const newActiveItem = validGoToOnSizeChange
            ? goToOnSizeChange
            : calculateActiveItem(
                  containerRef.current,
                  ratioToScroll,
                  newItemsLength,
                  isRTL
              );

        if (itemsLength !== newItemsLength) {
            setItemsLength(newItemsLength);
        }
        goTo(newActiveItem);
    }, [
        itemsLength,
        ratioToScroll,
        isRTL,
        isInfinite,
        goTo,
        goToOnSizeChange,
        setItemsLength,
        containerRef,
    ]);

    const handleResize = useCallback(
        () => throttle(syncActiveItemAndLength, 150)(),
        [syncActiveItemAndLength]
    );

    useResizeObserver(containerRef.current, handleResize);
    useResizeObserver(wrapperRef.current, handleResize);

    const syncActiveItem = () => {
        const newActiveItem = calculateActiveItem(
            containerRef.current,
            ratioToScroll,
            itemsLength,
            isRTL
        );

        goTo(newActiveItem);
    };

    const handleScroll = isInfinite ? null : debounce(syncActiveItem, 100);
    const touchStart = useRef(null);
    const handleSwipe = {
        onTouchStart: (e) => {
            touchStart.current = e.touches[0].clientX;
        },
        onTouchMove: (e) => {
            if (!touchStart.current) {
                return;
            }

            const moveXDiff = e.touches[0].clientX - touchStart.current;
            const swipeDir = moveXDiff < 0 ? 'next' : 'prev';

            if (moveXDiff != 0) {
                infiniteScroll(
                    containerRef.current,
                    wrapperRef.current,
                    ratioToScroll,
                    swipeDir,
                    isRTL,
                    swipeDir === 'next' ? moveXDiff : moveXDiff * -1
                );
            }

            touchStart.current = e.touches[0].clientX;
        },
        onTouchEnd: () => {
            touchStart.current = null;
        },
    };

    return (
        <div
            ref={containerRef}
            className={cx('slider', className, {
                scrollSliderContainer: !isInfinite,
                unevenItemsContainer: isInfinite,
            })}
            onScroll={handleScroll}
            {...otherProps}
        >
            <div
                ref={wrapperRef}
                className="unevenItemsWrapper"
                {...handleSwipe}
            >
                {renderSlides(children)}
            </div>
        </div>
    );
};

UnevenItemsScrollSlider.propTypes = {
    activeItem: PropTypes.number.isRequired,
    goToOnSizeChange: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    isRTL: PropTypes.bool.isRequired,
    setItemsLength: PropTypes.func.isRequired,
    itemsLength: PropTypes.number.isRequired,
    goTo: PropTypes.func.isRequired,
    /* ratioToScroll is a decimal value from 0 to 1.  1 means scroll the entire viewport of the carousel and
    less than 1 means to scroll that percentage of the viewport.   */
    ratioToScroll: PropTypes.number,
    isInfinite: PropTypes.bool,
    direction: PropTypes.string,
    containerRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.elementType }),
    ]),
};

UnevenItemsScrollSlider.defaultProps = {
    ratioToScroll: 1,
};

export default forwardRef(function UnevenForwardingRef(props, ref) {
    return <UnevenItemsScrollSlider containerRef={ref} {...props} />;
});
