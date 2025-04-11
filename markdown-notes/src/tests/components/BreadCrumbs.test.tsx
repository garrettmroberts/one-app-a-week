import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BreadCrumbs from '../../components/BreadCrumbs';

describe('BreadCrumbs Component', () => {
  test('renders crumbs from input params', () => {
    render(<BreadCrumbs crumbs={['notebook1', 'folder1', 'file1.md']} />);

    expect(screen.getByText(/notebook1/i)).toBeInTheDocument();
    expect(screen.getByText(/folder1/i)).toBeInTheDocument();
    expect(screen.getByText(/file1.md/i)).toBeInTheDocument();
  });

  test('gracefully fails when no crumbs are present', () => {
    render(<BreadCrumbs crumbs={[]} />);
  });

  test('runs onclick callback when crumb is clicked', () => {
    const onClickMock = jest.fn();
    render(
      <BreadCrumbs
        crumbs={['notebook1', 'folder1', 'file1.md']}
        onClick={onClickMock}
      />
    );

    const crumb = screen.getByText(/notebook1/i);
    crumb.click();

    expect(onClickMock).toHaveBeenCalledWith('notebook1');
  });
});
