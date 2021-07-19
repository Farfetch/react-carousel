import { SnapSlider } from '../../src/components';
import { createSerializer } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import React from 'react';

jest.mock('../../src/utils/checkSnapSupport');

beforeAll(() => {
    expect.addSnapshotSerializer(createSerializer());
});

describe('<SnapSlider />', () => {
    test('should render correctly', () => {
        const wrapper = shallow(
            <SnapSlider>
                <div>Test 1</div>
                <div>Test 2</div>
            </SnapSlider>
        );

        expect(wrapper).toMatchSnapshot();
    });
});
