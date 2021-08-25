import { createSerializer } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import CarouselProvider from '../../src/context/CarouselProvider';
import React from 'react';

const MockComponent = jest.fn(() => null);

describe('<CarouselProvider/>', () => {
    beforeAll(() => {
        expect.addSnapshotSerializer(createSerializer());
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render with required props', () => {
        const wrapper = shallow(
            <CarouselProvider>
                <MockComponent />
            </CarouselProvider>
        );
        const instance = wrapper.instance();

        const expectedContext = {
            activeItem: 0,
            isRTL: false,
            isInfinite: false,
            isMovementBlocked: false,
            itemsToShow: 1,
            itemsLength: 0,
            setItemsLength: instance._setItemsLength,
            setIsMovementBlocked: instance._setIsMovementBlocked,
            goTo: instance._goTo,
            goNext: instance._goNext,
            goPrev: instance._goPrev,
            direction: null,
            itemsToScroll: 1,
        };

        const { containerRef, ...currentValue } = wrapper.prop('value');

        expect(wrapper).toMatchSnapshot();
        expect(containerRef).not.toBeNull();
        expect(currentValue).toEqual(expectedContext);
    });

    test('should set the context correctly based on the props', () => {
        const wrapper = shallow(
            <CarouselProvider isInfinite itemsToShow={2} startItem={4} isRTL>
                <MockComponent />
            </CarouselProvider>
        );

        const instance = wrapper.instance();

        const expectedContext = {
            activeItem: 4,
            isRTL: true,
            isInfinite: true,
            isMovementBlocked: false,
            itemsToShow: 2,
            itemsLength: 0,
            setItemsLength: instance._setItemsLength,
            setIsMovementBlocked: instance._setIsMovementBlocked,
            goTo: instance._goTo,
            goNext: instance._goNext,
            goPrev: instance._goPrev,
            direction: null,
            itemsToScroll: 1,
        };

        const { containerRef, ...currentValue } = wrapper.prop('value');

        expect(containerRef).not.toBeNull();
        expect(currentValue).toEqual(expectedContext);
    });

    describe('_setItemsLength()', () => {
        test('should change state with item length', () => {
            const spySetState = jest.spyOn(
                CarouselProvider.prototype,
                'setState'
            );

            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            const instance = wrapper.instance();

            expect(wrapper.state().itemsLength).toBe(0);

            instance._setItemsLength(1);
            expect(spySetState).toHaveBeenCalledTimes(1);
            expect(wrapper.state().itemsLength).toBe(1);
        });
    });

    describe('_setIsMovementBlocked()', () => {
        test('should change state with the new value', () => {
            const spySetState = jest.spyOn(
                CarouselProvider.prototype,
                'setState'
            );

            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            const instance = wrapper.instance();

            expect(wrapper.state().isMovementBlocked).toBe(false);

            instance._setIsMovementBlocked(true);
            expect(spySetState).toHaveBeenCalledTimes(1);
            expect(wrapper.state().isMovementBlocked).toBe(true);
        });
    });

    describe('_goNext()', () => {
        test('should advance an item active', () => {
            const spyGoTo = jest.spyOn(CarouselProvider.prototype, '_goTo');

            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            const instance = wrapper.instance();

            instance._setItemsLength(5);
            instance._goNext();
            expect(spyGoTo).toHaveBeenCalledWith(1, {});
        });

        test('should advance number of itemsToScroll from the active item', () => {
            const spyGoTo = jest.spyOn(CarouselProvider.prototype, '_goTo');

            const wrapper = shallow(
                <CarouselProvider
                    isInfinite
                    itemsToShow={4}
                    itemsToScroll={4}
                    isRTL
                >
                    <MockComponent />
                </CarouselProvider>
            );

            wrapper.setState({ activeItem: 0 });

            const instance = wrapper.instance();

            instance._setItemsLength(5);
            instance._goNext();
            expect(spyGoTo).toHaveBeenCalledWith(4, {});
        });

        test('should advance by itemsToScroll when slidesToShow equals itemsToScroll', () => {
            const spyGoTo = jest.spyOn(CarouselProvider.prototype, '_goTo');

            const wrapper = shallow(
                <CarouselProvider isInfinite itemsToShow={4} itemsToScroll={4}>
                    <MockComponent />
                </CarouselProvider>
            );

            wrapper.setState({ activeItem: 0 });

            const instance = wrapper.instance();

            instance._setItemsLength(5);
            instance._goNext();
            expect(spyGoTo).toHaveBeenCalledWith(4, {});
        });

        test('should advance to the first item if new active item is bigger then the number of items', () => {
            const spyGoTo = jest.spyOn(CarouselProvider.prototype, '_goTo');

            const wrapper = shallow(
                <CarouselProvider
                    isInfinite
                    itemsToShow={4}
                    itemsToScroll={4}
                    isRTL
                >
                    <MockComponent />
                </CarouselProvider>
            );

            wrapper.setState({ activeItem: 4 });

            const instance = wrapper.instance();

            instance._setItemsLength(8);
            instance._goNext();
            expect(spyGoTo).toHaveBeenCalledWith(0, {});
        });

        test('should advance an item active with aditional options', () => {
            const spyGoTo = jest.spyOn(CarouselProvider.prototype, '_goTo');

            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            const instance = wrapper.instance();

            instance._setItemsLength(5);
            instance._goNext({ dir: 'right' });
            expect(spyGoTo).toHaveBeenCalledWith(1, { dir: 'right' });
        });

        test('should reset active item if advance to first item when is infinite', () => {
            const spyGoTo = jest.spyOn(CarouselProvider.prototype, '_goTo');

            const wrapper = shallow(
                <CarouselProvider isInfinite>
                    <MockComponent />
                </CarouselProvider>
            );

            const instance = wrapper.instance();

            instance._setItemsLength(2);
            instance._goNext();
            instance._goNext();
            expect(spyGoTo).toHaveBeenLastCalledWith(0, {});
        });
    });

    describe('_goPrev()', () => {
        test('should subtract one from the active item', () => {
            const spyGoTo = jest.spyOn(CarouselProvider.prototype, '_goTo');

            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            wrapper.setState({ activeItem: 1 });

            const instance = wrapper.instance();

            instance._setItemsLength(5);
            instance._goPrev();
            expect(spyGoTo).toHaveBeenCalledWith(0, {});
        });

        test('should retreat number of itemsToScroll from the active item', () => {
            const spyGoTo = jest.spyOn(CarouselProvider.prototype, '_goTo');

            const wrapper = shallow(
                <CarouselProvider
                    isInfinite
                    itemsToShow={4}
                    itemsToScroll={4}
                    isRTL
                >
                    <MockComponent />
                </CarouselProvider>
            );

            wrapper.setState({ activeItem: 4 });

            const instance = wrapper.instance();

            instance._setItemsLength(5);
            instance._goPrev();
            expect(spyGoTo).toHaveBeenCalledWith(0, {});
        });

        test('should retreat by itemsToScroll when slidesToShow equals itemsToScroll', () => {
            const spyGoTo = jest.spyOn(CarouselProvider.prototype, '_goTo');

            const wrapper = shallow(
                <CarouselProvider isInfinite itemsToShow={4} itemsToScroll={4}>
                    <MockComponent />
                </CarouselProvider>
            );

            wrapper.setState({ activeItem: 4 });

            const instance = wrapper.instance();

            instance._setItemsLength(5);
            instance._goPrev();
            expect(spyGoTo).toHaveBeenCalledWith(0, {});
        });

        test('should advance an item active with aditional options', () => {
            const spyGoTo = jest.spyOn(CarouselProvider.prototype, '_goTo');

            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            wrapper.setState({ activeItem: 1 });

            const instance = wrapper.instance();

            instance._setItemsLength(5);
            instance._goPrev({ dir: 'left' });
            expect(spyGoTo).toHaveBeenCalledWith(0, { dir: 'left' });
        });

        test('should put active item in last position if advance to last item when is infinite', () => {
            const spyGoTo = jest.spyOn(CarouselProvider.prototype, '_goTo');

            const wrapper = shallow(
                <CarouselProvider isInfinite>
                    <MockComponent />
                </CarouselProvider>
            );

            wrapper.setState({ activeItem: 1 });

            const instance = wrapper.instance();

            instance._setItemsLength(2);
            instance._goPrev();
            expect(spyGoTo).toHaveBeenLastCalledWith(0, {});
        });

        test('should put active item as the first item when the activeItem is 0 and newActiveItem less than 0', () => {
            const spyGoTo = jest.spyOn(CarouselProvider.prototype, '_goTo');

            const wrapper = shallow(
                <CarouselProvider isInfinite itemsToShow={4} itemsToScroll={4}>
                    <MockComponent />
                </CarouselProvider>
            );

            wrapper.setState({ activeItem: 1 });

            const instance = wrapper.instance();

            instance._setItemsLength(6);
            instance._goPrev();
            expect(spyGoTo).toHaveBeenLastCalledWith(0, {});
        });

        test('should put active item as the itemsLenght - itemsToScroll when activeItem is 0 and the newActiveItem is less than 0', () => {
            const spyGoTo = jest.spyOn(CarouselProvider.prototype, '_goTo');

            const wrapper = shallow(
                <CarouselProvider isInfinite itemsToShow={4} itemsToScroll={4}>
                    <MockComponent />
                </CarouselProvider>
            );

            wrapper.setState({ activeItem: 0 });

            const instance = wrapper.instance();

            instance._setItemsLength(6);
            instance._goPrev();
            expect(spyGoTo).toHaveBeenLastCalledWith(2, {});
        });
    });

    describe('_goTo()', () => {
        test('should change active item if index is valid', () => {
            const spySetActiveItem = jest.spyOn(
                CarouselProvider.prototype,
                '_setActiveItem'
            );

            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            wrapper.setState({ activeItem: 1 });

            const instance = wrapper.instance();

            instance._setItemsLength(5);
            instance._goTo(3);
            expect(spySetActiveItem).toHaveBeenCalledWith(3, {});
        });

        test('should change active item if index is valid and send options', () => {
            const spySetActiveItem = jest.spyOn(
                CarouselProvider.prototype,
                '_setActiveItem'
            );

            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            wrapper.setState({ activeItem: 1 });

            const instance = wrapper.instance();

            instance._setItemsLength(5);
            instance._goTo(3, { dir: 'left' });
            expect(spySetActiveItem).toHaveBeenCalledWith(3, { dir: 'left' });
        });

        test('should return null if the movement is blocked', () => {
            const spySetActiveItem = jest.spyOn(
                CarouselProvider.prototype,
                '_setActiveItem'
            );

            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            wrapper.setState({ isMovementBlocked: true });

            const instance = wrapper.instance();

            const returnedValue = instance._goTo(3);

            expect(returnedValue).toBeNull();
            expect(spySetActiveItem).toHaveBeenCalledTimes(0);
        });

        test('should return null if the sent value is not a number', () => {
            const spySetActiveItem = jest.spyOn(
                CarouselProvider.prototype,
                '_setActiveItem'
            );

            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            wrapper.setState({ activeItem: 1 });

            const instance = wrapper.instance();

            instance._setItemsLength(5);
            const returnedValue = instance._goTo('3');

            expect(returnedValue).toBeNull();
            expect(spySetActiveItem).toHaveBeenCalledTimes(0);
        });

        test('should return null if value is lower than 0', () => {
            const spySetActiveItem = jest.spyOn(
                CarouselProvider.prototype,
                '_setActiveItem'
            );

            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            wrapper.setState({ activeItem: 1 });

            const instance = wrapper.instance();

            instance._setItemsLength(5);
            const returnedValue = instance._goTo(-1);

            expect(returnedValue).toBeNull();
            expect(spySetActiveItem).toHaveBeenCalledTimes(0);
        });

        test('should return null if value is greater than number of items', () => {
            const spySetActiveItem = jest.spyOn(
                CarouselProvider.prototype,
                '_setActiveItem'
            );

            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            wrapper.setState({ activeItem: 1 });

            const instance = wrapper.instance();

            instance._setItemsLength(5);
            const returnedValue = instance._goTo(6);

            expect(returnedValue).toBeNull();
            expect(spySetActiveItem).toHaveBeenCalledTimes(0);
        });

        test('should return null if items to show are greater to number of items', () => {
            const spySetActiveItem = jest.spyOn(
                CarouselProvider.prototype,
                '_setActiveItem'
            );

            const wrapper = shallow(
                <CarouselProvider itemsToShow={2}>
                    <MockComponent />
                </CarouselProvider>
            );

            const instance = wrapper.instance();

            instance._setItemsLength(1);
            const returnedValue = instance._goTo(6);

            expect(returnedValue).toBeNull();
            expect(spySetActiveItem).toHaveBeenCalledTimes(0);
        });
    });

    describe('_setActiveItem()', () => {
        test('should change active item', () => {
            const spySetState = jest.spyOn(
                CarouselProvider.prototype,
                'setState'
            );

            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            const instance = wrapper.instance();

            instance._setActiveItem(1);

            expect(spySetState).toHaveBeenCalledTimes(1);
            expect(wrapper.state().activeItem).toBe(1);
        });

        test('should return null if change to the same active item', () => {
            const spySetState = jest.spyOn(
                CarouselProvider.prototype,
                'setState'
            );

            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            const instance = wrapper.instance();

            const result = instance._setActiveItem(0);

            expect(spySetState).toHaveBeenCalledTimes(0);
            expect(wrapper.state().activeItem).toBe(0);
            expect(result).toBeNull();
        });

        test('should call callback if exist', () => {
            const spySetState = jest.spyOn(
                CarouselProvider.prototype,
                'setState'
            );
            const mockAfterChange = jest.fn();

            const wrapper = shallow(
                <CarouselProvider onAfterChange={mockAfterChange}>
                    <MockComponent />
                </CarouselProvider>
            );

            const instance = wrapper.instance();

            instance._setItemsLength(5);
            instance._setActiveItem(1);

            const expectedAfterChange = {
                index: 1,
                dir: 'next',
            };

            expect(spySetState).toHaveBeenCalledTimes(2);
            expect(mockAfterChange).toBeCalledTimes(1);
            expect(mockAfterChange).toHaveBeenCalledWith(expectedAfterChange);
            expect(wrapper.state().activeItem).toBe(1);
        });

        test('should call callback if exist, and pass all options', () => {
            const spySetState = jest.spyOn(
                CarouselProvider.prototype,
                'setState'
            );
            const mockAfterChange = jest.fn();

            const wrapper = shallow(
                <CarouselProvider onAfterChange={mockAfterChange}>
                    <MockComponent />
                </CarouselProvider>
            );

            const instance = wrapper.instance();

            const options = {
                dir: 'left',
                data: 'test',
            };

            instance._setItemsLength(5);
            instance._setActiveItem(1, options);

            const expectedAfterChange = {
                index: 1,
                ...options,
            };

            const callAfterChange = mockAfterChange.mock.calls[0][0];

            expect(spySetState).toHaveBeenCalledTimes(2);
            expect(mockAfterChange).toBeCalledTimes(1);
            expect(callAfterChange).toEqual(expectedAfterChange);
            expect(wrapper.state().activeItem).toBe(1);
        });
    });

    describe('_getDirection()', () => {
        const nextDirection = 'next';
        const prevDirection = 'prev';

        test('should return next if new active item is higher than the previous', () => {
            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            const instance = wrapper.instance();

            instance._setItemsLength(3);

            const result = instance._getDirection(1);

            expect(result).toBe(nextDirection);
        });

        test('should return prev if new active item is lower than the previous', () => {
            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            const instance = wrapper.instance();

            instance._setItemsLength(3);
            instance._setActiveItem(2);

            const result = instance._getDirection(1);

            expect(result).toBe(prevDirection);
        });

        test('should return prev if new active item is the last item of items', () => {
            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            const instance = wrapper.instance();

            instance._setItemsLength(2);
            instance._setActiveItem(0);

            const result = instance._getDirection(1);

            expect(result).toBe(prevDirection);
        });

        test('should return next if new active item is the first item of items', () => {
            const wrapper = shallow(
                <CarouselProvider>
                    <MockComponent />
                </CarouselProvider>
            );

            const instance = wrapper.instance();

            instance._setItemsLength(2);
            instance._setActiveItem(1);

            const result = instance._getDirection(0);

            expect(result).toBe(nextDirection);
        });
    });

    test('should update active item when startItem prop changes', () => {
        const wrapper = shallow(
            <CarouselProvider>
                <MockComponent />
            </CarouselProvider>
        );

        const prevProps = wrapper.instance().props;

        wrapper.setProps({ startItem: 0 });
        wrapper.instance().componentDidUpdate(prevProps);

        expect(wrapper.state('activeItem')).toBe(0);

        wrapper.setProps({ startItem: 5 });
        wrapper.instance().componentDidUpdate(prevProps);

        expect(wrapper.state('activeItem')).toBe(5);
    });
});
