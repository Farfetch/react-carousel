import { BaseUnevenItemsScrollSlider } from '#containers';
import styled from '@emotion/styled';

const UnevenItemsScrollSlider = styled(BaseUnevenItemsScrollSlider)`
    position: relative;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;

    ${({ isInfinite }) =>
        !isInfinite
            ? `
        overflow-x: scroll;
        overflow-y: hidden;

        /* Hide scrollbar on Firefox */
        scrollbar-width: none;

        &::-webkit-scrollbar {
            width: 0;
            display: none;
        }
    `
            : `
        overflow: hidden;
    `}

    ${`[data-element='unevenItemsWrapper']`} {
        position: relative;
        width: auto;
        display: flex;
        flex: 0 0 auto;
        touch-action: none;

        & > * {
            flex: 0 0 auto;
        }
    }
`;

UnevenItemsScrollSlider.displayName = 'ScrollSlider';

UnevenItemsScrollSlider.defaultProps = {
    isInfinite: true,
};

export default UnevenItemsScrollSlider;
