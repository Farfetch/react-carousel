import { ScrollSlider, SwipeSlider } from '#containers';
import { checkSnapSupport } from '#utils';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SnapStyles from './SnapSlider.css';
import cx from 'classnames';

class SnapSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMounted: false,
        };
    }

    componentDidMount() {
        /* eslint-disable-next-line react/no-did-mount-set-state */
        this.setState({
            isMounted: true,
        });
    }

    render() {
        if (!this.state.isMounted || checkSnapSupport()) {
            return (
                <ScrollSlider
                    {...this.props}
                    className={cx(this.props.className, SnapStyles.container)}
                />
            );
        }

        const { limitScroll, ...otherProps } = this.props;

        return (
            <SwipeSlider
                {...otherProps}
                disableSwipe={false}
                hasKeysNavigation={false}
            />
        );
    }
}

SnapSlider.defaultProps = {
    limitScroll: false,
};

SnapSlider.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    limitScroll: PropTypes.bool,
};

export default SnapSlider;
