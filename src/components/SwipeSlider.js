import { BaseSwipeSlider } from '#containers';
import styled from '@emotion/styled';

const SwipeSlider = styled(BaseSwipeSlider)`
    position: relative;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    transition: transform ${({ animationDuration }) => `${animationDuration}s`};

    & > * {
        flex: 0 0 auto;
    }
`;

SwipeSlider.displayName = 'SwipeSlider';

SwipeSlider.defaultProps = {
    animationDuration: 0.3,
};

export default SwipeSlider;
