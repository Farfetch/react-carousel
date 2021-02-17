import { createSerializer } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import React from 'react';

import cloneSlide from '../../src/utils/cloneSlide';

describe('cloneSlide()', () => {
    beforeAll(() => {
        expect.addSnapshotSerializer(createSerializer());
    });

    it('should return slide element with minimum configuration', () => {
        const child = <div>First slide</div>;

        const slide = cloneSlide(child);

        const wrapper = shallow(slide);

        expect(wrapper).toMatchSnapshot();
    });

    it('should return slide element with additional configuration', () => {
        const child = <div key="0">First slide</div>;

        const dummyStyle = {
            position: 'relative',
        };

        const slide = cloneSlide(child, 1, false, 'dummyClassName', dummyStyle);

        const wrapper = shallow(slide);

        expect(wrapper).toMatchSnapshot();
    });

    it('should return slide element with new key when it is cloned', () => {
        const child = <div>First slide</div>;

        const slide = cloneSlide(child, 1, true);

        const wrapper = shallow(slide);

        expect(wrapper).toMatchSnapshot();
    });
});
