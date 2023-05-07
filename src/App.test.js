import {render, screen, fireEvent, waitFor, getByText} from '@testing-library/react';
import App from './App';
import handleCommentClick from "./handleComment";
import handleMainSide from "./handleMainSide";

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

test('search for "qui" should display 5 "Author"', async () => {
    render(<App />);
    const searchBar = screen.getByRole('textbox', { name: '' });
    fireEvent.change(searchBar, { target: { value: 'qui' } });
    fireEvent.keyDown(searchBar, { key: 'Enter', code: 'Enter' });
    const authorTexts = await screen.findAllByText('Author', { exact: false });
    expect(authorTexts.length).toBe(5);
});


test('handleCommentClick sets commentsShown to false when comments are shown', async () => {
    const posts = [
        {id: 1, commentsShown: true},
        {id: 2, commentsShown: false},
    ];
    const setPosts = jest.fn();

    await handleCommentClick(1, posts, setPosts);

    expect(setPosts).toHaveBeenCalledWith([
        {id: 1, commentsShown: false},
        {id: 2, commentsShown: false},
    ]);
});


jest.mock('./handleMainSide');

test('calls handleMainSide after clicking main side button', () => {
    const { getByText } = render(<App />);
    fireEvent.click(getByText('Main Side'));

    expect(handleMainSide).toHaveBeenCalled();
});
