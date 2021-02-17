import React from 'react'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {expect} from 'chai'
import sinon from 'sinon'

import ReactSwipeEvents from '../index'

Enzyme.configure({ adapter: new Adapter() })

describe('ReactSwipeEvents rendering with input children', () => {
    it('it render input div children correctly', () => {
        const wrapper = Enzyme.mount(
            <ReactSwipeEvents>
                <div id='inputDiv'>
                    Hello Div !
                </div>
            </ReactSwipeEvents>
        )
        expect(wrapper.find('#inputDiv')).to.have.length(1)
    })

    it('it render input span children correctly', () => {
        const wrapper = Enzyme.mount(
            <ReactSwipeEvents>
                <span id='inputSpan'>
                    Hello Span !
                </span>
            </ReactSwipeEvents>
        )
        expect(wrapper.find('#inputSpan')).to.have.length(1)
    })
})

describe('ReactSwipeEvents rendering with input children', () => {
    it('it render input span children correctly', () => {
        const wrapper = Enzyme.mount(
            <ReactSwipeEvents>
                <span id='inputSpan'>
                    Hello Span !
                </span>
            </ReactSwipeEvents>
        )
        expect(wrapper.find('#inputSpan')).to.have.length(1)
    })
})
