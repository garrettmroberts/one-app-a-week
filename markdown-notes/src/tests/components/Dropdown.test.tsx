import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from '../../components/Dropdown';
import { act } from 'react';

describe('Dropdown Component', () => {
  test('shows correct active element', () => {
    render(
      <Dropdown
        elements={['element1', 'element2', 'element3']}
        activeElement="element2"
        onSelect={() => {}}
        label="Test Label"
      />
    );

    expect(screen.getByText(/Test Label/i)).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-active-element')).toBeInTheDocument();
  });

  test('opens dropdown on click', async () => {
    render(
      <Dropdown
        elements={['element1', 'element2', 'element3']}
        activeElement="element2"
        onSelect={() => {}}
        label="Test Label"
      />
    );

    const dropdownButton = screen.getByRole('button');
    act(() => {
      dropdownButton.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('dropdown-list')).toBeVisible();
    });
  });

  test('closes dropdown after selecting an element', async () => {
    const onSelectMock = jest.fn();

    render(
      <Dropdown
        elements={['element1', 'element2', 'element3']}
        activeElement="element2"
        onSelect={onSelectMock}
        label="Test Label"
      />
    );

    const dropdownButton = screen.getByRole('button');
    act(() => {
      dropdownButton.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('dropdown-list')).toBeVisible();
    });

    const elementToSelect = screen.getByText(/element1/i);
    act(() => {
      elementToSelect.click();
    });

    await waitFor(() => {
      expect(onSelectMock).toHaveBeenCalledWith('element1');
    });

    await waitFor(() => {
      const ddl = screen.getByTestId('dropdown-list');
      expect(ddl).not.toHaveClass('dropdown__dropdown--visible');
    });
  });

  test('closes dropdown on outside click', async () => {
    render(
      <>
        <div
          data-testid="outside-element"
          style={{ height: '100px', width: '100px' }}
        />
        <Dropdown
          elements={['element1', 'element2', 'element3']}
          activeElement="element2"
          onSelect={() => {}}
          label="Test Label"
        />
      </>
    );

    const dropdownButton = screen.getByRole('button');
    act(() => {
      dropdownButton.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('dropdown-list')).toBeVisible();
    });

    const outsideClickArea = screen.getByTestId('outside-element');
    fireEvent.mouseDown(outsideClickArea);

    await waitFor(() => {
      const ddl = screen.getByTestId('dropdown-list');
      expect(ddl).not.toHaveClass('dropdown__dropdown--visible');
    });
  });
});
