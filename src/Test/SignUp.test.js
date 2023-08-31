/*
import React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import SignUp from '../Pages/Authentification/SignUp';

describe('SignUp Component', () => {
    it('should render without errors', () => {
        const wrapper = shallow(<SignUp />);
        expect(wrapper.find(SignUp)).toHaveLength(1);
    });

    it('should display error messages for invalid form submission', async () => {
        const wrapper = shallow(<SignUp />);
        await act(async () => {
            await wrapper.find('form').simulate('submit');
        });
        wrapper.update();
        expect(wrapper.find('.text-red-400')).toHaveLength(3); // Nombre d'erreurs affichées
    });

    it('should display error message for invalid email format', async () => {
        const wrapper = shallow(<SignUp />);
        await act(async () => {
            await wrapper.find('form').simulate('submit');
        });
        wrapper.update();
        const emailError = wrapper.find('#email-error');
        expect(emailError.text()).toBe('This needs to be a valid email address');
    });

    it('should display error message for short password', async () => {
        const wrapper = shallow(<SignUp />);
        await act(async () => {
            await wrapper.find('#password').simulate('change', { target: { value: '123' } });
            await wrapper.find('form').simulate('submit');
        });
        wrapper.update();
        const passwordError = wrapper.find('#password-error');
        expect(passwordError.text()).toBe('Password must be at least 6 characters');
    });

    it('should display error message for mismatched passwords', async () => {
        const wrapper = shallow(<SignUp />);
        await act(async () => {
            await wrapper.find('#password').simulate('change', { target: { value: 'password' } });
            await wrapper.find('#confirmPassword').simulate('change', { target: { value: 'different' } });
            await wrapper.find('form').simulate('submit');
        });
        wrapper.update();
        const confirmPasswordError = wrapper.find('#confirmPassword-error');
        expect(confirmPasswordError.text()).toBe('The passwords do not match');
    });


}); */
