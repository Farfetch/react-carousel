import { createSerializer } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import React from 'react';

import Carousel from '../../src/components/Carousel';

beforeAll(() => {
    expect.addSnapshotSerializer(createSerializer());
});

describe('<Carousel /> props', () => {
    it('should render children and custom attrs correctly', () => {
        const tree = shallow(
            <Carousel className="foo" data-attr="bar">
                <div>I accept children.</div>
            </Carousel>
        );

        expect(tree).toMatchSnapshot();
    });
});
