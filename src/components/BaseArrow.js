import { CarouselContext } from '#context';
import PropTypes from 'prop-types';
import React, { forwardRef, useContext } from 'react';

const allowedFlows = ['prev', 'next'];

const BaseArrow = forwardRef(
    ({ children, flow, onClick, as: As, ...rest }, ref) => {
        const { activeItem, itemsLength, goNext, goPrev } = useContext(
            CarouselContext
        );

        const propsToPass = {
            isFirstItem: activeItem === 0,
            isLastItem: activeItem === itemsLength - 1,
        };

        const handleClick = (e) => {
            if (flow && allowedFlows.indexOf(flow) > -1) {
                const isFlowNext = flow === 'next';
                const goToDir = isFlowNext ? goNext : goPrev;

                goToDir();
            }

            onClick && onClick(e);
        };

        return (
            <As ref={ref} {...propsToPass} onClick={handleClick} {...rest}>
                {children}
            </As>
        );
    }
);

BaseArrow.displayName = 'BaseArrow';

BaseArrow.defaultProps = {
    as: 'button',
};

BaseArrow.propTypes = {
    as: PropTypes.string,
    flow: PropTypes.oneOf(allowedFlows).isRequired,
    onClick: PropTypes.func,
    children: PropTypes.element,
};

export default BaseArrow;
