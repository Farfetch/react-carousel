import { CarouselContext } from '#context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CarouselProvider extends Component {
    static getDerivedStateFromProps(props, state) {
        const { isRTL, itemsToShow, isInfinite, itemsToScroll } = props;

        return {
            ...state,
            isRTL,
            itemsToShow,
            isInfinite,
            itemsToScroll,
        };
    }

    constructor(props) {
        super(props);

        this._setItemsLength = this._setItemsLength.bind(this);
        this._setIsMovementBlocked = this._setIsMovementBlocked.bind(this);
        this._goTo = this._goTo.bind(this);
        this._goNext = this._goNext.bind(this);
        this._goPrev = this._goPrev.bind(this);

        this.state = {
            activeItem: this.props.startItem,
            isRTL: false,
            isInfinite: false,
            isMovementBlocked: false,
            itemsToShow: 1,
            itemsLength: 0,
            setItemsLength: this._setItemsLength,
            setIsMovementBlocked: this._setIsMovementBlocked,
            goTo: this._goTo,
            goNext: this._goNext,
            goPrev: this._goPrev,
            itemsToScroll: 1,
            direction: null,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.startItem !== this.props.startItem) {
            this.setState({
                activeItem: this.props.startItem,
            });
        }
    }

    render() {
        const { children } = this.props;

        return (
            <CarouselContext.Provider value={this.state}>
                {children}
            </CarouselContext.Provider>
        );
    }

    _getDirection(newActiveItem, activeItem = this.state.activeItem) {
        const lastItem = this.state.itemsLength - 1;

        if (newActiveItem === 0 && lastItem === activeItem) {
            return 'next';
        }

        if (activeItem === 0 && newActiveItem === lastItem) {
            return 'prev';
        }

        return activeItem < newActiveItem ? 'next' : 'prev';
    }

    _setActiveItem(newActiveItem, options = {}) {
        const { onAfterChange } = this.props;
        const { activeItem } = this.state;

        if (newActiveItem === activeItem) {
            return null;
        }

        this.setState(
            {
                activeItem: newActiveItem,
            },
            () =>
                onAfterChange &&
                onAfterChange({
                    index: newActiveItem,
                    dir: this._getDirection(newActiveItem, activeItem),
                    ...options,
                })
        );
    }

    _setItemsLength(itemsLength) {
        this.setState({
            itemsLength,
        });
    }

    _setIsMovementBlocked(isBlocked) {
        this.setState({
            isMovementBlocked: isBlocked,
        });
    }

    _goTo(index, options = {}) {
        const { itemsLength, itemsToShow, isMovementBlocked } = this.state;
        const isInvalidIndex =
            typeof index !== 'number' ||
            itemsToShow > itemsLength ||
            index < 0 ||
            index > itemsLength - 1;

        if (isMovementBlocked || isInvalidIndex) {
            return null;
        }

        this._setActiveItem(index, options);
    }

    _goNext(options = {}) {
        const { activeItem, isInfinite, itemsLength } = this.state;
        const { itemsToScroll } = this.props;

        let newActiveItem = activeItem + itemsToScroll;

        // Stop at the first positon
        if (isInfinite && newActiveItem > itemsLength - 1) {
            newActiveItem = 0;
        }

        this.setState({
            direction: 'next',
        });

        this._goTo(newActiveItem, options);
    }

    _goPrev(options = {}) {
        const { activeItem, isInfinite, itemsLength } = this.state;
        const { itemsToScroll } = this.props;
        let newActiveItem = activeItem - itemsToScroll;

        // Stop at the first positon
        if (isInfinite && newActiveItem < 0 && activeItem === 0) {
            newActiveItem = itemsLength - itemsToScroll;
        }

        // Move to a slide before the first position
        if (isInfinite && newActiveItem < 0 && activeItem !== 0) {
            newActiveItem = 0;
        }

        this.setState({
            direction: 'prev',
        });

        this._goTo(newActiveItem, options);
    }
}

CarouselProvider.defaultProps = {
    itemsToShow: 1,
    isRTL: false,
    isInfinite: false,
    itemsToScroll: 1,
    startItem: 0,
};

CarouselProvider.propTypes = {
    children: PropTypes.node.isRequired,
    isRTL: PropTypes.bool,
    isInfinite: PropTypes.bool,
    itemsToShow: PropTypes.number,
    onAfterChange: PropTypes.func,
    itemsToScroll: PropTypes.number,
    startItem: PropTypes.number,
};

export default CarouselProvider;
