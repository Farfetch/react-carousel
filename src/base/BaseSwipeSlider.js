import { cloneSlide, renderSlides } from '#utils';
import PropTypes from 'prop-types';
import React, { Children, Component } from 'react';
import ReactSwipeEvents from 'react-swipe-events';

const LEFT_KEY_CODE = 37;
const RIGHT_KEY_CODE = 39;

class BaseSwipeSlider extends Component {
    static getDerivedStateFromProps(props, state) {
        const {
            children,
            itemsToShow,
            isInfinite,
            isMovementBlocked,
            direction,
        } = props;

        if (isMovementBlocked) {
            return state;
        }

        const itemsLength = Children.count(children);
        let activeItemData = {
            transitionResetType: null,
            activeItem: props.activeItem,
        };

        if (props.activeItem !== state.activeItem && isInfinite) {
            const previousActiveItem = state.activeItem;
            const newActiveItem = props.activeItem;

            const isMovingToBeginning =
                direction === 'next' && newActiveItem === 0;
            const isMovingToEnd =
                direction === 'prev' && previousActiveItem === 0;

            if (isMovingToBeginning) {
                props.setIsMovementBlocked(true);
                activeItemData = {
                    transitionResetType: 'last-to-first',
                    activeItem: itemsLength,
                };
            }

            if (isMovingToEnd) {
                activeItemData = {
                    transitionResetType: 'first-to-last',
                    isFakeTransition: true,
                    activeItem: itemsLength,
                };
            }
        }

        return {
            ...activeItemData,
            itemsLength,
            hasEnoughChildren: itemsLength > itemsToShow,
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            itemsLength: 0,
            activeItem: null,
            isFakeTransition: false,
            hasEnoughChildren: false,
            transitionResetType: null,
        };

        this._handleTransitionEnd = this._handleTransitionEnd.bind(this);
        this._handleSwipeLeft = this._handleSwipeLeft.bind(this);
        this._handleSwipeRight = this._handleSwipeRight.bind(this);
        this._listenKeys = this._listenKeys.bind(this);
    }

    componentDidMount() {
        const { hasKeysNavigation, setItemsLength } = this.props;
        const { itemsLength } = this.state;

        setItemsLength(itemsLength);

        if (hasKeysNavigation) {
            this.addKeyUpListener();
        }
    }

    componentDidUpdate(prevProps) {
        // This removes the transition: none from the div, should be done after the movement is finished.
        if (this.props.isInfinite && this.state.isFakeTransition) {
            setTimeout(() => {
                this.props.setIsMovementBlocked(false);
                this.setState({
                    isFakeTransition: false,
                });
            }, 80); // Slow enough for React to update DOM, fast enough for user to not perceive it
        }

        if (prevProps.hasKeysNavigation && !this.props.hasKeysNavigation) {
            this.removeKeyUpListener();
        }

        if (!prevProps.hasKeysNavigation && this.props.hasKeysNavigation) {
            this.addKeyUpListener();
        }
    }

    componentWillUnmount() {
        this.props.hasKeysNavigation &&
            document.removeEventListener('keyup', this._listenKeys);
    }

    render() {
        const {
            disableSwipe,
            activeItem,
            children,
            goNext,
            goPrev,
            hasKeysNavigation,
            isRTL,
            itemsToShow,
            isInfinite,
            isMovementBlocked,
            setItemsLength,
            setIsMovementBlocked,
            className = 'swipeSliderContainer',
            animationDuration,
            ...otherProps
        } = this.props;
        const { hasEnoughChildren } = this.state;

        const onSwiping =
            disableSwipe || !hasEnoughChildren
                ? {}
                : {
                      onSwipedRight: this._handleSwipeRight,
                      onSwipedLeft: this._handleSwipeLeft,
                  };

        return (
            <ReactSwipeEvents {...onSwiping}>
                <div
                    className={className}
                    style={this.sliderInfinityStyles()}
                    onTransitionEnd={this._handleTransitionEnd}
                    {...otherProps}
                >
                    {this.renderSlides()}
                </div>
            </ReactSwipeEvents>
        );
    }

    renderSlides() {
        const { children, itemsToShow } = this.props;

        const style = {
            width: `${(100 / itemsToShow).toFixed(6)}%`,
        };
        const slides = renderSlides(children, itemsToShow, style);

        if (this.shouldItBeInfinite()) {
            // Clone the firsts children to the end to be able to do a loop animation
            for (let i = 0; i < itemsToShow; i++) {
                slides.push(cloneSlide(children[i], i, true, null, style));
            }
        }

        return slides;
    }

    shouldItBeInfinite() {
        // Make sure the number of children is bigger than the slidesToShow,
        // otherwise there is no sense in being a carousel.
        return !!(this.props.isInfinite && this.state.hasEnoughChildren);
    }

    sliderInfinityStyles() {
        const { itemsToShow } = this.props;
        const { activeItem } = this.state;
        const unitAbs = this.props.isRTL ? '' : '-';

        return {
            transform: `translate3d(${unitAbs}${
                activeItem * (100 / itemsToShow)
            }%, 0, 0)`,
            transition: this.state.isFakeTransition ? 'none' : '',
        };
    }

    addKeyUpListener() {
        if (this.state.hasEnoughChildren) {
            document.addEventListener('keyup', this._listenKeys);
        }
    }

    removeKeyUpListener() {
        document.removeEventListener('keyup', this._listenKeys);
    }

    _listenKeys(e) {
        const isKeyPressed = { isKeyPressed: true };

        switch (e.keyCode) {
            case LEFT_KEY_CODE:
                return this.props.isRTL
                    ? this.props.goNext(isKeyPressed)
                    : this.props.goPrev(isKeyPressed);
            case RIGHT_KEY_CODE:
                return this.props.isRTL
                    ? this.props.goPrev(isKeyPressed)
                    : this.props.goNext(isKeyPressed);
            default:
                break;
        }
    }

    _handleTransitionEnd() {
        const { isInfinite } = this.props;
        const { transitionResetType } = this.state;

        if (isInfinite && transitionResetType === 'last-to-first') {
            this.setState({
                activeItem: 0,
                isFakeTransition: true,
            });
        }
    }

    _handleSwipeLeft() {
        let methodToCall = 'goNext';

        if (this.props.isRTL) {
            methodToCall = 'goPrev';
        }

        return this.props[methodToCall]();
    }

    _handleSwipeRight() {
        let methodToCall = 'goPrev';

        if (this.props.isRTL) {
            methodToCall = 'goNext';
        }

        return this.props[methodToCall]();
    }
}

BaseSwipeSlider.defaultProps = {
    hasKeysNavigation: true,
    disableSwipe: false,
    isInfinite: false,
    animationDuration: 0.3,
};

BaseSwipeSlider.propTypes = {
    activeItem: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disableSwipe: PropTypes.bool,
    hasKeysNavigation: PropTypes.bool,
    goNext: PropTypes.func.isRequired,
    goPrev: PropTypes.func.isRequired,
    isRTL: PropTypes.bool,
    itemsToShow: PropTypes.number.isRequired,
    isInfinite: PropTypes.bool,
    setItemsLength: PropTypes.func.isRequired,
    setIsMovementBlocked: PropTypes.func.isRequired,
    isMovementBlocked: PropTypes.bool,
    direction: PropTypes.string,
    animationDuration: PropTypes.number,
};

export default BaseSwipeSlider;
