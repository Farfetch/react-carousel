import { createSerializer } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import BaseSwipeSlider from '../../src/base/BaseSwipeSlider';
import React from 'react';

beforeAll(() => {
    jest.useFakeTimers();
    expect.addSnapshotSerializer(createSerializer());
});

afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
});

const mocksPropsSwipeSlider = {
    activeItem: 0,
    itemsToShow: 2,
    isRTL: false,
    isInfinite: false,
    goNext: jest.fn(),
    goPrev: jest.fn(),
    setItemsLength: jest.fn(),
    setIsMovementBlocked: jest.fn(),
    isMovementBlocked: false,
    direction: null,
};

const children = [
    <div key="0" data-testId="slide">
        First slide
    </div>,
    <div key="1" data-testId="slide">
        Second slide
    </div>,
    <div key="2" data-testId="slide">
        Third slide
    </div>,
    <div key="3" data-testId="slide">
        Fourth slide
    </div>,
    <div key="4" data-testId="slide">
        Five slide
    </div>,
    <div key="5" data-testId="slide">
        Sixth slide
    </div>,
    <div key="6" data-testId="slide">
        Seventh slide
    </div>,
];

describe('<BaseSwipeSlider /> props', () => {
    it('should render correctly the sliders cloned from children elements', () => {
        const tree = shallow(
            <BaseSwipeSlider {...mocksPropsSwipeSlider}>
                {children}
            </BaseSwipeSlider>,
            { disableLifecycleMethods: false }
        );

        expect(tree.find('[data-testId="slide"]')).toHaveLength(
            children.length
        );
        expect(tree).toMatchSnapshot();
    });

    it('should add cloned slides and update styles inline when isInfinite', () => {
        const tree = shallow(
            <BaseSwipeSlider isInfinite {...mocksPropsSwipeSlider}>
                {children}
            </BaseSwipeSlider>,
            { disableLifecycleMethods: false }
        );

        expect(tree).toMatchSnapshot();
    });

    it('should not add clone slides when have less children than itemsToShow', () => {
        const twochildren = [
            <div key="0" data-testId="slide">
                First slide
            </div>,
            <div key="1" data-testId="slide">
                Second slide
            </div>,
        ];

        const tree = shallow(
            <BaseSwipeSlider
                isInfinite
                itemsToShow={2}
                {...mocksPropsSwipeSlider}
            >
                {twochildren}
            </BaseSwipeSlider>,
            { disableLifecycleMethods: false }
        );

        expect(tree.find('[data-testId="slide"]')).toHaveLength(2);
        expect(tree).toMatchSnapshot();
    });

    it('should add custom props to wrapper as props', () => {
        const tree = shallow(
            <BaseSwipeSlider
                className="customSlider"
                data-foo="bar"
                {...mocksPropsSwipeSlider}
            >
                {children}
            </BaseSwipeSlider>
        );

        expect(tree.children().hasClass('customSlider')).toBeTruthy();
        expect(tree.children().prop('data-foo')).toEqual('bar');
    });

    it('should not add onSwipe listener when props disableSwipe', () => {
        const tree = shallow(
            <BaseSwipeSlider {...mocksPropsSwipeSlider} disableSwipe>
                {children}
            </BaseSwipeSlider>,
            { disableLifecycleMethods: false }
        );

        expect(tree.prop('onSwipe')).toBeUndefined();
    });

    it('should not add onSwipe listener when children count is <= than itemsToShow', () => {
        const tree = shallow(
            <BaseSwipeSlider itemsToShow={8} {...mocksPropsSwipeSlider}>
                {children}
            </BaseSwipeSlider>,
            { disableLifecycleMethods: false }
        );

        expect(tree.find('[data-testId="slide"]')).toHaveLength(
            children.length
        );
        expect(tree.prop('onSwipe')).toBeUndefined();
    });
});

describe('<BaseSwipeSlider/> state', () => {
    it('should have correct values in initial render', () => {
        const tree = shallow(
            <BaseSwipeSlider {...mocksPropsSwipeSlider}>
                {children}
            </BaseSwipeSlider>
        );

        const expectedInitialState = {
            itemsLength: 7,
            activeItem: 0,
            isFakeTransition: false,
            hasEnoughChildren: true,
            transitionResetType: null,
        };

        expect(tree.state()).toEqual(expectedInitialState);
    });

    it('should have correct values when active item changed', () => {
        const spyOnSetState = jest.spyOn(BaseSwipeSlider.prototype, 'setState');
        const tree = shallow(
            <BaseSwipeSlider {...mocksPropsSwipeSlider}>
                {children}
            </BaseSwipeSlider>,
            { disableLifecycleMethods: false }
        );

        tree.setProps({
            activeItem: 1,
        });

        jest.runAllTimers();

        const expectedState = {
            itemsLength: 7,
            activeItem: 1,
            isFakeTransition: false,
            hasEnoughChildren: true,
            transitionResetType: null,
        };

        expect(tree.state()).toEqual(expectedState);
        expect(spyOnSetState).toHaveBeenCalledTimes(0);
    });

    it('should have correct values when change last to first item', () => {
        const spyOnSetState = jest.spyOn(BaseSwipeSlider.prototype, 'setState');
        const mockPropsLastItem = {
            ...mocksPropsSwipeSlider,
            activeItem: 6,
        };

        const tree = shallow(
            <BaseSwipeSlider {...mockPropsLastItem}>
                {children}
            </BaseSwipeSlider>,
            { disableLifecycleMethods: false }
        );

        const expectedStateFinal = {
            itemsLength: 7,
            activeItem: 0,
            transitionResetType: null,
            hasEnoughChildren: true,
            isFakeTransition: false,
        };

        tree.setProps({
            activeItem: 0,
        });

        expect(tree.state()).toEqual(expectedStateFinal);
        tree.instance()._handleTransitionEnd();
        expect(spyOnSetState).toHaveBeenCalledTimes(0);
    });

    it('should have correct values when change from the first to last item', () => {
        const spyOnSetState = jest.spyOn(BaseSwipeSlider.prototype, 'setState');
        const mockPropsLastItem = {
            ...mocksPropsSwipeSlider,
            activeItem: 0,
        };

        const tree = shallow(
            <BaseSwipeSlider {...mockPropsLastItem}>
                {children}
            </BaseSwipeSlider>,
            { disableLifecycleMethods: false }
        );

        const expectedStateFinal = {
            itemsLength: 7,
            activeItem: 6,
            isFakeTransition: false,
            hasEnoughChildren: true,
            transitionResetType: null,
        };

        tree.setProps({
            activeItem: 6,
        });

        tree.update();

        expect(tree.state()).toEqual(expectedStateFinal);
        tree.instance()._handleTransitionEnd();
        expect(spyOnSetState).toHaveBeenCalledTimes(0);
    });

    describe('infinite mode', () => {
        it('should have correct values when change last to first item', () => {
            const spyOnSetState = jest.spyOn(
                BaseSwipeSlider.prototype,
                'setState'
            );
            const mockPropsLastItem = {
                ...mocksPropsSwipeSlider,
                activeItem: 6,
                direction: 'next',
            };

            const tree = shallow(
                <BaseSwipeSlider {...mockPropsLastItem} isInfinite>
                    {children}
                </BaseSwipeSlider>,
                { disableLifecycleMethods: false }
            );

            const expectedStateBeforeTransition = {
                itemsLength: 7,
                activeItem: 7,
                transitionResetType: 'last-to-first',
                hasEnoughChildren: true,
                isFakeTransition: false,
            };

            tree.setProps({
                activeItem: 0,
            });

            expect(tree.state()).toEqual(expectedStateBeforeTransition);

            tree.instance()._handleTransitionEnd();

            const expectedStateAfterTransition = {
                itemsLength: 7,
                activeItem: 0,
                transitionResetType: null,
                hasEnoughChildren: true,
                isFakeTransition: true,
            };

            expect(tree.state()).toEqual(expectedStateAfterTransition);

            jest.runAllTimers();

            const expectedFinalState = {
                itemsLength: 7,
                activeItem: 0,
                isFakeTransition: false,
                hasEnoughChildren: true,
                transitionResetType: null,
            };

            expect(tree.state()).toEqual(expectedFinalState);
            expect(spyOnSetState).toHaveBeenCalledTimes(2);
        });

        it('should block temporarily the movement properly when change from last to first item', () => {
            const mockPropsLastItem = {
                ...mocksPropsSwipeSlider,
                activeItem: 6,
                direction: 'next',
            };

            const tree = shallow(
                <BaseSwipeSlider {...mockPropsLastItem} isInfinite>
                    {children}
                </BaseSwipeSlider>,
                { disableLifecycleMethods: false }
            );

            tree.setProps({
                activeItem: 0,
            });

            // Blocks further movements at the prop change
            expect(
                mocksPropsSwipeSlider.setIsMovementBlocked
            ).toHaveBeenCalledTimes(1);
            expect(
                mocksPropsSwipeSlider.setIsMovementBlocked
            ).toHaveBeenLastCalledWith(true);

            // Do the movement
            tree.instance()._handleTransitionEnd();
            jest.runAllTimers();

            // Removes the block on the movement end
            expect(
                mocksPropsSwipeSlider.setIsMovementBlocked
            ).toHaveBeenCalledTimes(2);
            expect(
                mocksPropsSwipeSlider.setIsMovementBlocked
            ).toHaveBeenLastCalledWith(false);
        });

        it('should have correct values when change from the first to last item', () => {
            const spyOnSetState = jest.spyOn(
                BaseSwipeSlider.prototype,
                'setState'
            );
            const mockPropsLastItem = {
                ...mocksPropsSwipeSlider,
                activeItem: 0,
                direction: 'prev',
            };

            const tree = shallow(
                <BaseSwipeSlider {...mockPropsLastItem} isInfinite>
                    {children}
                </BaseSwipeSlider>,
                { disableLifecycleMethods: false }
            );

            const expectedStateAfterUpdateProps = {
                itemsLength: 7,
                activeItem: 7,
                transitionResetType: 'first-to-last',
                hasEnoughChildren: true,
                isFakeTransition: true,
            };

            tree.setProps({
                activeItem: 6,
            });

            expect(tree.state()).toEqual(expectedStateAfterUpdateProps);

            jest.runAllTimers();

            const expectedFinalState = {
                itemsLength: 7,
                activeItem: 6,
                isFakeTransition: false,
                hasEnoughChildren: true,
                transitionResetType: null,
            };

            expect(tree.state()).toEqual(expectedFinalState);
            expect(spyOnSetState).toHaveBeenCalledTimes(1);
        });
    });
});

describe('<BaseSwipeSlider/> keys Navigation', () => {
    let map = {};
    let mapRemove = {};

    document.addEventListener = jest.fn((event, cb) => {
        map[event] = cb;
    });

    document.removeEventListener = jest.fn((event, cb) => {
        mapRemove[event] = cb;

        delete map[event];
    });

    function assertKeyNavigationFlow(isRtl) {
        const keyPressed = { isKeyPressed: true };
        let rigthKey = isRtl
            ? mocksPropsSwipeSlider.goPrev
            : mocksPropsSwipeSlider.goNext;

        map.keyup({ keyCode: 39 }); // > Right key
        expect(rigthKey).toHaveBeenCalledWith(keyPressed);

        rigthKey = isRtl
            ? mocksPropsSwipeSlider.goNext
            : mocksPropsSwipeSlider.goPrev;

        map.keyup({ keyCode: 37 }); // < Left key
        expect(rigthKey).toHaveBeenCalledWith(keyPressed);

        mocksPropsSwipeSlider.goNext.mockClear();
        mocksPropsSwipeSlider.goPrev.mockClear();
        map.keyup({ keyCode: 50 }); // Some random key

        expect(mocksPropsSwipeSlider.goNext).toHaveBeenCalledTimes(0);
        expect(mocksPropsSwipeSlider.goPrev).toHaveBeenCalledTimes(0);
    }

    describe('should must initialized correctly', () => {
        afterAll(() => {
            map = {};
            mapRemove = {};
        });

        it('and should work as expect the < > keys after componentDidMount', () => {
            shallow(
                <BaseSwipeSlider {...mocksPropsSwipeSlider} isInfinite>
                    {children}
                </BaseSwipeSlider>,
                { disableLifecycleMethods: false }
            );

            assertKeyNavigationFlow();
        });

        it('and should remove eventListener to keyup on componentWillUnmount', () => {
            const tree = shallow(
                <BaseSwipeSlider {...mocksPropsSwipeSlider} isRtl isInfinite>
                    {children}
                </BaseSwipeSlider>,
                { disableLifecycleMethods: false }
            );

            const listenKeyMethod = tree.instance()._listenKeys;

            expect(map.keyup).toBeDefined();

            tree.unmount();

            expect(map.keyup).toBeUndefined();
            expect(mapRemove.keyup).toBe(listenKeyMethod);
        });
    });

    describe('should must initialized correctly with RTL', () => {
        afterAll(() => {
            map = {};
            mapRemove = {};
        });

        it('should work as expect the < > keys after componentDidMount', () => {
            shallow(
                <BaseSwipeSlider {...mocksPropsSwipeSlider} isRTL isInfinite>
                    {children}
                </BaseSwipeSlider>,
                { disableLifecycleMethods: false }
            );
            assertKeyNavigationFlow(true);
        });
    });

    describe("when doesn't hasKeysNavigation on initial render", () => {
        afterAll(() => {
            map = {};
            mapRemove = {};
        });

        it('should not add an eventListener to keyup on componentDidMount', () => {
            shallow(
                <BaseSwipeSlider
                    {...mocksPropsSwipeSlider}
                    hasKeysNavigation={false}
                    isInfinite
                >
                    {children}
                </BaseSwipeSlider>,
                { disableLifecycleMethods: false }
            );
            expect(map.keyup).toBeUndefined();
        });

        it('should allow correct < > key functionality when hasKeyNavigation is set to true', () => {
            const tree = shallow(
                <BaseSwipeSlider
                    {...mocksPropsSwipeSlider}
                    hasKeysNavigation={false}
                    isInfinite
                >
                    {children}
                </BaseSwipeSlider>,
                { disableLifecycleMethods: false }
            );

            tree.setProps({ hasKeysNavigation: true });

            assertKeyNavigationFlow();
        });

        it('should remove eventListener when hasKeysNavigation is set to false', () => {
            const tree = shallow(
                <BaseSwipeSlider {...mocksPropsSwipeSlider} isInfinite>
                    {children}
                </BaseSwipeSlider>,
                { disableLifecycleMethods: false }
            );

            const listenKeyMethod = tree.instance()._listenKeys;

            tree.setProps({ hasKeysNavigation: false });

            expect(map.keyup).toBeUndefined();
            expect(mapRemove.keyup).toBe(listenKeyMethod);
        });

        it('should not remove again eventListener on componentWillUnmount', () => {
            const tree = shallow(
                <BaseSwipeSlider
                    {...mocksPropsSwipeSlider}
                    hasKeysNavigation={false}
                    isInfinite
                >
                    {children}
                </BaseSwipeSlider>,
                { disableLifecycleMethods: false }
            );

            tree.unmount();

            expect(document.removeEventListener).toHaveBeenCalledTimes(0);
        });
    });
});

describe('<Slider /> interaction - onSwipe', () => {
    const onSwipeRight = (tree) =>
        tree.find('reactSwipeEvents').props().onSwipedRight();

    const onSwipeLeft = (tree) =>
        tree.find('reactSwipeEvents').props().onSwipedLeft();

    it('should go to next slide onSwipeLeft() and call goNext', () => {
        const tree = shallow(
            <BaseSwipeSlider {...mocksPropsSwipeSlider} isInfinite>
                {children}
            </BaseSwipeSlider>,
            { disableLifecycleMethods: false }
        );

        onSwipeLeft(tree);
        expect(mocksPropsSwipeSlider.goNext).toHaveBeenCalledTimes(1);
    });

    it('should go to prev slide onSwipeRight() correctly and call goPrev', () => {
        const tree = shallow(
            <BaseSwipeSlider
                {...mocksPropsSwipeSlider}
                activeItem={3}
                isInfinite
            >
                {children}
            </BaseSwipeSlider>,
            { disableLifecycleMethods: false }
        );

        onSwipeRight(tree);
        expect(mocksPropsSwipeSlider.goPrev).toHaveBeenCalledTimes(1);
    });

    it('should go to next slide onSwipeRight() correctly - RTL', () => {
        const tree = shallow(
            <BaseSwipeSlider {...mocksPropsSwipeSlider} isRTL isInfinite>
                {children}
            </BaseSwipeSlider>,
            { disableLifecycleMethods: false }
        );

        onSwipeRight(tree);
        expect(mocksPropsSwipeSlider.goNext).toHaveBeenCalledTimes(1);
    });

    it('should go to prev slide onSwipeRight() correctly - RTL', () => {
        const tree = shallow(
            <BaseSwipeSlider
                {...mocksPropsSwipeSlider}
                activeItem={2}
                isRTL
                isInfinite
            >
                {children}
            </BaseSwipeSlider>,
            { disableLifecycleMethods: false }
        );

        onSwipeLeft(tree);
        expect(mocksPropsSwipeSlider.goPrev).toHaveBeenCalledTimes(1);
    });
});
