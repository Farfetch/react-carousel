import styled from '@emotion/styled';

const Bullet = styled.span`
    position: relative;
    width: 2.1rem;
    height: 2.1rem;
    display: inline-block;

    &::before {
        content: '';
        position: absolute;
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        background-color: #b6b6b6;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &[data-active='true']::before {
        width: 0.8rem;
        height: 0.8rem;
        background-color: #222222;
    }

    &[data-infinite='true'] {
        position: relative;
        width: 0.8rem;
        height: 0.8rem;
        margin: 0.5rem;
        transform: scale(0.5);
        display: inline-block;
        border-radius: 50%;
        transition: transform 200ms;
        background-color: #b6b6b6;
    }

    &[data-infinite='true'][data-secondary='true'] {
        transform: scale(0.75);
        background-color: #b6b6b6;
    }

    &[data-infinite='true'][data-active='true'] {
        transform: scale(1);
        background-color: #222222;
    }
`;

Bullet.displayName = 'Bullet';

export default Bullet;
