import checkSnapSupport from '../../src/utils/checkSnapSupport';

const mockDocument = (style = {}) => {
    Object.defineProperty(document, 'documentElement', {
        value: {
            style,
        },
        configurable: true,
    });
};

describe('checkSnapSupport()', () => {
    it('should return true if scroll snap is available', () => {
        mockDocument({
            scrollSnapAlign: true,
        });

        const result = checkSnapSupport();

        expect(result).toBe(true);
    });

    it('should return true if ms scroll snap is available', () => {
        mockDocument({
            msScrollSnapAlign: true,
        });
        const result = checkSnapSupport();

        expect(result).toBe(true);
    });

    it('should return true if webkit scroll snap is available', () => {
        mockDocument({
            webkitScrollSnapAlign: true,
        });
        const result = checkSnapSupport();

        expect(result).toBe(true);
    });

    it('should return false if scroll snap is not available', () => {
        mockDocument();
        const result = checkSnapSupport();

        expect(result).toBe(false);
    });
});
