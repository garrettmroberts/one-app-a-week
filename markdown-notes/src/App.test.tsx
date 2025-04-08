import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const title = screen.getByText('MDNotes');
  console.log(title);
  expect(title).toBeInTheDocument();
});
