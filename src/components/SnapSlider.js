import { CENTER, SNAP } from '#utils';
import ScrollSlider from './ScrollSlider';
import styled from '@emotion/styled';

const SnapSlider = styled(ScrollSlider)`
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch; /* For safari */

    & > * {
        scroll-snap-align: ${({ align }) => align};
        scroll-snap-stop: always;
    }
`;

SnapSlider.displayName = 'SnapSlider';

SnapSlider.defaultProps = {
    type: SNAP,
    align: CENTER,
};

export default SnapSlider;
