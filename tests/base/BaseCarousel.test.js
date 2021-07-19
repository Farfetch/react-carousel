import { createSerializer } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import React from 'react';

import BaseCarousel from '../../src/base/BaseCarousel';

beforeAll(() => {
    expect.addSnapshotSerializer(createSerializer());
});

describe('<Carousel /> props', () => {
    it('should render children and custom attrs correctly', () => {
        const tree = shallow(
            <BaseCarousel className="foo" data-attr="bar">
                <div>I accept children.</div>
            </BaseCarousel>
        );

        expect(tree).toMatchSnapshot();
    });
});
