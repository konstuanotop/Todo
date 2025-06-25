import { cleanup, render, screen } from "@testing-library/react";
import { TodoProvider } from "../context/TodoContext";
import Todo from "./Todo";
import '@testing-library/jest-dom';

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.useRealTimers();
})

describe('Todo Component', () => {
    test('renders input and list components', () => {
        render(
            <TodoProvider>
                <Todo />
            </TodoProvider>
        );
        expect(screen.getByText(/TodoList/i)).toBeInTheDocument();
        expect(screen.getByText(/TodoInput/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/New Todo/i)).toBeInTheDocument();
    });
});