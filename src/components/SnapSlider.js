import { ScrollSlider } from '#containers';
import { quad } from '#utils';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

class SnapSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMounted: false,
        };
    }

    render() {
        return (
            <ScrollSlider
                {...this.props}
                className={cx(this.props.className, 'snapSliderContainer')}
            />
        );
    }
}

SnapSlider.defaultProps = {
    animationDuration: 0.3,
    animationTimingFunction: quad,
};

SnapSlider.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    animationDuration: PropTypes.number,
    animationTimingFunction: PropTypes.func,
};

export default SnapSlider;
