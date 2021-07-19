import Bullet from '#components/Bullet';
import BulletsInfiniteWrapper from '#components/BulletsInfiniteWrapper';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class BaseBullets extends PureComponent {
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
            isRTL,
            itemsToScroll,
            ...otherProps
        } = this.props;
        const { isInfinite } = this.state;

        return (
            <div
                aria-hidden="true"
                data-infinite={isInfinite}
                data-active={activeItem}
                {...otherProps}
            >
                {isInfinite ? (
                    <BulletsInfiniteWrapper
                        style={{
                            transform: `translate(${this.getTranslationValue()}rem)`,
                        }}
                    >
                        {this.getBullets()}
                    </BulletsInfiniteWrapper>
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
        const {
            translationValue,
            maxBullets,
            bullets,
            activeBullet,
        } = this.state;

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
        const { isInfinite, activeBullet, bullets } = this.state;
        const secondaryBullets = this.getSecondaryBullets();
        const isSecondary = (index) =>
            secondaryBullets.first === index ||
            secondaryBullets.second === index;

        const itemsNodes = [];

        for (let i = 0; i < bullets; i++) {
            itemsNodes.push(
                <Bullet
                    key={i}
                    data-infinite={isInfinite}
                    data-secondary={isSecondary(i)}
                    data-active={activeBullet === i}
                    data-tstid="bullet"
                />
            );
        }

        return itemsNodes;
    }
}

BaseBullets.propTypes = {
    /* Index of active item - start on 0 */
    activeItem: PropTypes.number.isRequired,
    /* Items length */
    itemsLength: PropTypes.number.isRequired,
    /* Navigation direction  */
    isRTL: PropTypes.bool,
    /* SliderNav theme */
    itemsToScroll: PropTypes.number,
};

BaseBullets.defaultProps = {
    itemsToScroll: 1,
    theme: {},
};

export default BaseBullets;
