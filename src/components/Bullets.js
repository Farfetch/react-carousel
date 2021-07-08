import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import cx from 'classnames';

class Bullets extends PureComponent {
    static getDerivedStateFromProps(props, state) {
        const bullets = Math.ceil(props.itemsLength / props.itemsToScroll);

        const activeBullet = Math.ceil(props.activeItem / props.itemsToScroll);

        return {
            isInfinite: bullets > state.maxBullets,
            translationValue: props.isRTL ? 1.8 : -1.8,
            itemsToScroll: props.itemsToScroll,
            bullets,
            activeBullet,
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            maxBullets: 5,
            translationValue: 0,
            isInfinite: false,
            itemsToScroll: 1,
            bullets: 5,
            activeBullet: 1,
        };
    }

    render() {
        const {
            activeItem,
            itemsLength,
            theme,
            isRTL,
            itemsToScroll,
            ...otherProps
        } = this.props;
        const { isInfinite } = this.state;

        const cxs = this.getClassNamesToApply();

        return (
            <div
                className={cxs}
                aria-hidden="true"
                data-active={activeItem}
                {...otherProps}
            >
                {isInfinite ? (
                    <div
                        className="bulletMoveInfinite"
                        style={{
                            transform: `translate(${this.getTranslationValue()}rem)`,
                        }}
                    >
                        {this.getBullets()}
                    </div>
                ) : (
                    this.getBullets()
                )}
            </div>
        );
    }

    getSecondaryBullets() {
        const { activeBullet, bullets } = this.state;

        return {
            // Secondary bullet is the previous one, unless active bullet is the first
            first: activeBullet === 0 ? 2 : activeBullet - 1,
            // Other secondary bullet is the next one, unless active bullet is the last one
            second:
                activeBullet === bullets ? activeBullet - 2 : activeBullet + 1,
        };
    }

    getTranslationValue() {
        const { translationValue, maxBullets, bullets, activeBullet } =
            this.state;

        // If active slide is in first, second or third position translation doesn't happen
        if (bullets <= maxBullets || activeBullet <= 2) {
            return 0;
        }
        // If active slide is one of the last three positions translation stays the same
        if (activeBullet > bullets - 3) {
            return (bullets - maxBullets) * translationValue;
        }

        // Generic case where the bullets are translated
        return (activeBullet - 2) * translationValue;
    }

    getBullets() {
        const { activeItem, theme } = this.props;
        const { isInfinite, activeBullet, bullets } = this.state;
        const secondaryBullets = this.getSecondaryBullets();
        const itemsNodes = [];

        const getCxInfinite = (index) =>
            cx('bulletInfinite', {
                isActive: activeBullet === index,
                isSecondary:
                    secondaryBullets.first === index ||
                    secondaryBullets.second === index,
                [theme.isActive]: theme.isActive && activeItem === index,
            });

        const getCxDefault = (index) =>
            cx('bullet', {
                isActive: activeBullet === index,
                [theme.isActive]: theme.isActive && activeItem === index,
            });

        const generateClass = isInfinite ? getCxInfinite : getCxDefault;

        for (let i = 0; i < bullets; i++) {
            itemsNodes.push(
                <span
                    key={i}
                    className={generateClass(i)}
                    data-tstid="bullet"
                />
            );
        }

        return itemsNodes;
    }

    getClassNamesToApply() {
        const { theme } = this.props;
        const { isInfinite } = this.state;

        const baseThemeClasses = {
            [theme.container]: !!theme.container,
        };

        if (isInfinite) {
            return cx('bulletContainerInfinite', {
                ...baseThemeClasses,
                [theme.containerInfinite]: !!theme.containerInfinite,
            });
        }

        return cx('bulletContainerDefault', {
            ...baseThemeClasses,
            [theme.containerDefault]: !!theme.containerDefault,
        });
    }
}

Bullets.propTypes = {
    /* Index of active item - start on 0 */
    activeItem: PropTypes.number.isRequired,
    /* Items length */
    itemsLength: PropTypes.number.isRequired,
    /* Navigation direction  */
    isRTL: PropTypes.bool,
    /* SliderNav theme */
    theme: PropTypes.shape({
        container: PropTypes.string,
        containerDefault: PropTypes.string,
        containerInfinite: PropTypes.string,
        moveInfinite: PropTypes.string,
        bullet: PropTypes.string,
        bulletInfinite: PropTypes.string,
        isSecondary: PropTypes.string,
        isActive: PropTypes.string,
    }),
    itemsToScroll: PropTypes.number,
};

Bullets.defaultProps = {
    theme: {},
    itemsToScroll: 1,
};

export default Bullets;
