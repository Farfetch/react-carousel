import { BaseBullets } from '#base';
import styled from '@emotion/styled';

const Bullets = styled(BaseBullets)`
    z-index: 2;
    display: flex;
    justify-content: center;

    &[data-infinite='true'] {
        position: relative;
        width: 9rem;
        height: 2.1rem;
        overflow: hidden;
        justify-content: center;
        white-space: nowrap;
        left: 50%;
        transform: translateX(-50%);
    }
`;

Bullets.displayName = 'Bullets';

export default Bullets;
