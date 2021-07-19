import { shallow } from 'enzyme';
import Bullets from '../../src/components/Bullets';
import React from 'react';
import serializer from 'enzyme-to-json/serializer';

beforeAll(() => {
    expect.addSnapshotSerializer(serializer);
});

afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
});

const mockPropsDefault = {
    activeItem: 0,
    itemsLength: 3,
};

describe('<Bullets> - props for default', () => {
    it('should render correctly the basic', () => {
        const wrapper = shallow(<Bullets {...mockPropsDefault} />);

        expect(wrapper).toMatchSnapshot();
    });
});
