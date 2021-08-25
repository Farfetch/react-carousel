import { ScrollSlider, SwipeSlider } from '#containers';
import { checkSnapSupport } from '#utils';
import PropTypes from 'prop-types';
import React, { Component, forwardRef } from 'react';
import cx from 'classnames';

export class SnapSlider extends Component {
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
        const { limitScroll, containerRef, ...otherProps } = this.props;

        if (!this.state.isMounted || checkSnapSupport()) {
            return (
                <ScrollSlider
                    {...otherProps}
                    limitScroll={limitScroll}
                    ref={containerRef}
                    className={cx(this.props.className, 'snapSliderContainer')}
                />
            );
        }

        return (
            <SwipeSlider
                {...otherProps}
                disableSwipe={false}
                hasKeysNavigation={false}
                ref={containerRef}
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
    containerRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.elementType }),
    ]),
};

export default forwardRef(function SnapSliderForwardingRef(props, ref) {
    return <SnapSlider containerRef={ref} {...props} />;
});
