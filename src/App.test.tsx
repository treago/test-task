import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders form', () => {
  render(<App />);
  const formElement = screen.getByTestId('form');
  expect(formElement).toBeInTheDocument();
});
