import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import App from './App';

test('is site contains logo', () => {
  render(<App />);
  const linkElement = screen.getByText(/ByteBusters/i);
  expect(linkElement).toBeInTheDocument();
});

test('is site contains search-bar', () => {
  render(<App />);
  const searchBar = screen.getByRole('textbox', { name: '' });
  expect(searchBar).toBeInTheDocument();
});

test('is search with phrase qui finding 7 posts', async () => {
    render(<App />);

    const searchInput = screen.getByRole('textbox', { name: '' });
    fireEvent.change(searchInput, { target: { value: 'qui' } });

    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(screen.queryByText('No results found.')).toBeNull();
    });

    const matchingPosts = screen.getAllByRole('heading', { level: 2, name: /^qui/i });
    expect(matchingPosts).toHaveLength(7);
  });
test('login button is clickable', () => {
    render(<App />);

    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeInTheDocument();

});
