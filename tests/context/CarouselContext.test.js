import CarouselContext from '../../src/context/CarouselContext';

describe('CarouselContext', () => {
    test('should return the context correctly', () => {
        const context = CarouselContext.Provider._context._currentValue;

        expect(CarouselContext.Provider).toBeDefined();
        expect(CarouselContext.Consumer).toBeDefined();
        expect(context.goNext).toBeDefined();
        expect(context.goPrev).toBeDefined();
        expect(context.goTo).toBeDefined();
        expect(context.setActiveItem).toBeDefined();
        expect(context.setItemsLength).toBeDefined();
        expect(context.goNext()).toBeNull();
        expect(context.goPrev()).toBeNull();
        expect(context.goTo()).toBeNull();
        expect(context.setActiveItem()).toBeNull();
        expect(context.setItemsLength()).toBeNull();

        expect(context.setItemsLength).toBeDefined();
        expect(context.activeItem).toBe(0);
        expect(context.isRTL).toBeFalsy();
        expect(context.itemsToShow).toBe(0);
        expect(context.itemsLength).toBe(0);
    });
});
