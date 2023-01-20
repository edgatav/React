import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpForm from './Inscription';

describe('SignUpForm', () => {
  test('should not submit form if email and password are invalid', async () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'short' } });
    fireEvent.submit(getByText(/submit/i));
    expect(getByText(/form was not submitted/i)).toBeInTheDocument();
  });
});