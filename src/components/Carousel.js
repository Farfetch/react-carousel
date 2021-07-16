import { BaseCarousel } from '#base';
import styled from '@emotion/styled';

const Carousel = styled(BaseCarousel)`
    position: relative;
    width: 100%;
    overflow: hidden;
    touch-action: manipulation;
`;

Carousel.displayName = 'Carousel';

export default Carousel;
