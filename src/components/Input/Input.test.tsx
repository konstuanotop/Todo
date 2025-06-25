import { cleanup, render, screen } from "@testing-library/react";
import { TodoProvider } from "../../context/TodoContext";
import Input from "./Input";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import List from "../List/List";

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.useRealTimers();
})

describe('Input Component', () => {
    const user = userEvent.setup();

    test('renders input field and button', () => {
        render(
            <TodoProvider>
                <Input />
            </TodoProvider>
        );

        expect(screen.getByText(/TodoInput/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/New Todo/i)).toBeInTheDocument();
        expect(screen.getByText(/Add new task/i)).toBeInTheDocument();
    });

    test('allows typing in input field', async () => {
        render(
            <TodoProvider>
                <Input />
            </TodoProvider>
        );

        const input = screen.getByPlaceholderText(/New Todo/i);
        await user.type(input, 'New Task');
        expect(input).toHaveValue('New Task');
    });

    test('does not add empty task', async () => {
        render(
            <TodoProvider>
                <Input />
                <List />
            </TodoProvider>
        );

        const button = screen.getByText(/Add new task/i);
        await userEvent.click(button);
        expect(screen.queryByTestId('task-item')).toBeNull();
    });

    test('adds task on button click', async () => {
        render(
            <TodoProvider>
                <Input />
                <List />
            </TodoProvider>
        );

        const input = screen.getByPlaceholderText(/New Todo/i);
        const button = screen.getByText(/Add new task/i);

        await userEvent.type(input, 'New Task');
        await userEvent.click(button);

        expect(input).toHaveValue('');
        expect(screen.getByText('New Task')).toBeInTheDocument();
    });

    test('adds task on Enter key', async () => {
        render(
            <TodoProvider>
                <Input />
                <List />
            </TodoProvider>
        );

        const input = screen.getByPlaceholderText(/New Todo/i);
        await userEvent.type(input, 'Another Task{enter}');

        expect(input).toHaveValue('');
        expect(screen.getByText('Another Task')).toBeInTheDocument();
    });
});