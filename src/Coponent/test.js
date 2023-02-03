import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignUpForm from './Inscription';

test('form submission', async () => {
  const { getByLabelText, getByText } = render(<SignUpForm />);
  const emailInput = getByLabelText('Email');
  const passwordInput = getByLabelText('Password');
  const submitButton = getByText('Submit');

  fireEvent.change(emailInput, { target: { value: 'invalid_email' } });
  fireEvent.change(passwordInput, { target: { value: 'short' } });
  fireEvent.click(submitButton);

  await wait(() => {
    expect(emailInput).toHaveAttribute(
      'title',
      'Invalid email address'
    );
    expect(passwordInput).toHaveAttribute(
      'title',
      'Password must be at least 8 characters'
    );
  });
});