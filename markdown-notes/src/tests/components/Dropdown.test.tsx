import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from '../../components/Dropdown';
import { act } from 'react';

describe('Dropdown Component', () => {
  test('renders with appropriate props', () => {
    render(
      <Dropdown
        elements={['Item 2', 'Item 3', 'Item 4']}
        activeElement="Item 1"
        onSelect={(item) => console.log(item)}
        label="Select an item"
      />
    );
    expect(screen.getByText(/item 1/i)).toBeInTheDocument();
  });

  test('opens dropdown on click', () => {
    render(
      <Dropdown
        elements={['Item 2', 'Item 3', 'Item 4']}
        activeElement="Item 1"
        onSelect={(item) => console.log(item)}
        label="Select an item"
      />
    );

    const dropdown = screen.getByText(/item 1/i);

    act(() => {
      dropdown.click();
    });

    expect(screen.getByText(/item 2/i)).toBeInTheDocument();
  });
});
