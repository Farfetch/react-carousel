import { SnapSlider } from '../../src/components/SnapSlider';
import { createSerializer } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import React from 'react';
import checkSnapSupport from '../../src/utils/checkSnapSupport';

jest.mock('../../src/utils/checkSnapSupport');

beforeAll(() => {
    expect.addSnapshotSerializer(createSerializer());
});

describe('<SnapSlider />', () => {
    test('should render correctly the scroll version on SSR', () => {
        const wrapper = shallow(
            <SnapSlider>
                <div>Test 1</div>
                <div>Test 2</div>
            </SnapSlider>,
            {
                // Ensure this will not mount
                disableLifecycleMethods: true,
            }
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should render the scroll version if has support and is already mounted', () => {
        checkSnapSupport.mockImplementationOnce(() => true);

        const wrapper = shallow(
            <SnapSlider>
                <div>Test 1</div>
                <div>Test 2</div>
            </SnapSlider>,
            {
                // Ensure this will mount
                disableLifecycleMethods: false,
            }
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should render the swipe version if has no snap support and is already mounted', () => {
        checkSnapSupport.mockImplementationOnce(() => false);

        const wrapper = shallow(
            <SnapSlider>
                <div>Test 1</div>
                <div>Test 2</div>
            </SnapSlider>,
            {
                // Ensure this will mount
                disableLifecycleMethods: false,
            }
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should pass custom props correctly to swipe version', () => {
        checkSnapSupport.mockImplementationOnce(() => false);

        const wrapper = shallow(
            <SnapSlider
                data-tst={'test-id'}
                className={'TestTheme'}
                disableSwipe
            >
                <div>Test 1</div>
                <div>Test 2</div>
            </SnapSlider>,
            {
                // Ensure this will mount
                disableLifecycleMethods: false,
            }
        );

        expect(wrapper.prop('data-tst')).toBe('test-id');
        expect(wrapper.prop('className')).toBe('TestTheme');
    });

    test('should pass custom props correctly to scroll version', () => {
        checkSnapSupport.mockImplementationOnce(() => true);

        const wrapper = shallow(
            <SnapSlider
                data-tst={'test-id'}
                className={'TestTheme'}
                disableSwipe
            >
                <div>Test 1</div>
                <div>Test 2</div>
            </SnapSlider>,
            {
                // Ensure this will mount
                disableLifecycleMethods: false,
            }
        );

        expect(wrapper.prop('data-tst')).toBe('test-id');
        expect(wrapper.prop('className')).toBe('TestTheme snapSliderContainer');
    });
});
