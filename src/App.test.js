import {render, screen, fireEvent, waitFor, getByText} from '@testing-library/react';
import App from './App';
import handleCommentClick from "./handleComment";
import handleMainSide from "./handleMainSide";
import Header from "./Header";
import userEvent from "@testing-library/user-event";

test('it changes the value of number input with handleNumberInputFromChange and handleNumberInputToChange functions', () => {
    const handleFromChange = jest.fn();
    const handleToChange = jest.fn();
    render(
        <Header handleFromChange={handleFromChange} handleToChange={handleToChange} />
    );
    const inputFrom = screen.getByPlaceholderText("From");
    const inputTo = screen.getByPlaceholderText("To");
    expect(inputFrom).toBeInTheDocument();
    fireEvent.change(inputFrom, '10') //chwilowo by zobaczyc czy test dziala dalej - mam dosc xd nie dziala ale tak zostawiam
    fireEvent.blur(inputFrom)
    expect(inputFrom.value).toBe('10');

    expect(inputTo).toBeInTheDocument();
    fireEvent.change(inputTo, '50')
    fireEvent.blur(inputTo)
    expect(inputTo.value).toBe('50');
    userEvent.clear(inputFrom);
    userEvent.type(inputFrom, '5');
    expect(handleFromChange).toHaveBeenCalledWith('5');
    userEvent.clear(inputTo);
    userEvent.type(inputTo, '25');
    expect(handleToChange).toHaveBeenCalledWith('25');
});
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


test('search a changable number of posts/albums', async () => {
    render(<App />);
    const searchBar = screen.getByRole('textbox', { name: '' });
    const numberInput = screen.getByPlaceholderText("Number");

    fireEvent.change(numberInput, { target: { value: '5' } });
    fireEvent.blur(numberInput);
    fireEvent.change(searchBar, { target: { value: '' } });
    fireEvent.keyDown(searchBar, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
        const authorTexts = screen.getAllByText('Author', { exact: false });
        expect(authorTexts.length).toBe(5);
    });

    fireEvent.change(numberInput, { target: { value: '10' } });
    fireEvent.blur(numberInput);
    fireEvent.change(searchBar, { target: { value: '' } });
    fireEvent.keyDown(searchBar, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
        const authorTexts = screen.getAllByText('Author', { exact: false });
        expect(authorTexts.length).toBe(10);
    });

    fireEvent.change(numberInput, { target: { value: '15' } });
    fireEvent.blur(numberInput);
    fireEvent.change(searchBar, { target: { value: '' } });
    fireEvent.keyDown(searchBar, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
        const authorTexts = screen.getAllByText('Author', { exact: false });
        expect(authorTexts.length).toBe(15);
    });
});


test('search a changable number of posts/albums but with using a Main Side button', async () => { //nie działa mimo, że jest prawie identyczne względem poprzedniego
    render(<App />);

    const numberInput = screen.getByPlaceholderText("Number");
    const randomPosts=screen.getByPlaceholderText("RandomPosts");
    fireEvent.change(numberInput, { target: { value: '5' } });
    fireEvent.blur(numberInput);
    fireEvent.click(randomPosts);

    await waitFor(() => {
        const authorTexts = screen.getAllByText('Author', { exact: false });
        expect(authorTexts.length).toBe(5);
    });

    fireEvent.change(numberInput, { target: { value: '10' } });
    fireEvent.blur(numberInput);
    fireEvent.click(randomPosts);

    await waitFor(() => {
        const authorTexts = screen.getAllByText('Author', { exact: false });
        expect(authorTexts.length).toBe(10);
    });

    fireEvent.change(numberInput, { target: { value: '15' } });
    fireEvent.blur(numberInput);

    fireEvent.click(randomPosts);

    await waitFor(() => {
        const authorTexts = screen.getAllByText('Author', { exact: false });
        expect(authorTexts.length).toBe(15);
    });
});