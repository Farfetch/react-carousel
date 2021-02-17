import easeInOutQuad from '../../src/utils/easeInOutQuad';

describe('easeInOutQuad()', () => {
    it('should return correct value when input is less than 0.5', () => {
        const result = easeInOutQuad(0);

        expect(result).toBe(0);
    });

    it('should return correct value when input is greater than 0.5', () => {
        const result = easeInOutQuad(1);

        expect(result).toBe(1);
    });
});
