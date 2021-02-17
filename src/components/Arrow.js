import { CarouselContext } from '#context';
import { Component } from 'react';
import PropTypes from 'prop-types';

const allowedFlows = ['prev', 'next'];

class Arrow extends Component {
    constructor(props, context) {
        super(props, context);

        this._handleClick = this._handleClick.bind(this);
    }

    render() {
        const { children } = this.props;
        const { activeItem, itemsLength } = this.context;

        const propsToPass = {
            onClick: this._handleClick,
            isFirstItem: activeItem === 0,
            isLastItem: activeItem === itemsLength - 1,
        };

        return children(propsToPass);
    }

    _handleClick(e) {
        const { flow, onClick } = this.props;

        if (flow && allowedFlows.indexOf(flow) > -1) {
            const isFlowNext = flow === 'next';
            const goToDir = isFlowNext ? 'goNext' : 'goPrev';

            this.context[goToDir]();
        }

        onClick && onClick(e);
    }
}

Arrow.propTypes = {
    /** Flow of arrows */
    flow: PropTypes.oneOf(allowedFlows).isRequired,
    onClick: PropTypes.func,
    children: PropTypes.func.isRequired,
};

Arrow.contextType = CarouselContext;

export default Arrow;
