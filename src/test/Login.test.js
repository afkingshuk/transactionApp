import React from 'react';
import { shallow } from 'enzyme';
import login from './index'
import Login from './index';

describe('Test case for testing login', () => {
    let wrapper;
    test('username check', () => {
        wrapper = shallow(<Login />);
        wrapper.find('input[type="text"]').simulate('change', { target: { name: 'username', value: 'kingshuk@a.com' } });
        expect(wrapper.state('username')).toEqual('kingshuk@a.com');
    })
    it('password check', () => {
        wrapper = shallow(<Login />);
        wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: 'kingshuk123' } });
        expect(wrapper.state('password')).toEqual('kingshuk123');
    })
    it('login check with right data', () => {
        wrapper = shallow(<Login />);
        wrapper.find('input[type="text"]').simulate('change', { target: { name: 'username', value: 'kingshuk@a.com' } });
        wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: 'kingshuk123' } });
        wrapper.find('button').simulate('click');
        expect(wrapper.state('isLogined')).toBe(true);
    })
    it('login check with wrong data', () => {
        wrapper = shallow(<Login />);
        wrapper.find('input[type="text"]').simulate('change', { target: { name: 'username', value: 'kingshuk@a.com' } });
        wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: 'kingshuk123' } });
        wrapper.find('button').simulate('click');
        expect(wrapper.state('isLogined')).toBe(false);
    })
})