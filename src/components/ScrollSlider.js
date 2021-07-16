import { BaseScrollSlider } from '#containers';
import styled from '@emotion/styled';

const ScrollSlider = styled(BaseScrollSlider)`
    position: relative;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    flex-flow: row nowrap;

    /* Hide scrollbar on Firefox */
    scrollbar-width: none;

    /* Hide scrollbar on IE */
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        width: 0;
        display: none;
    }

    & > * {
        flex: 0 0 auto;
    }
`;

ScrollSlider.displayName = 'ScrollSlider';

export default ScrollSlider;
