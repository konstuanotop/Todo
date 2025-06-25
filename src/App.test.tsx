import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";
import '@testing-library/jest-dom';

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.useRealTimers();
})


describe('App Component', () => {
    test('renders without crashing', () => {
        render(<App />);
    });

    test('renders Todo component', () => {
        render(<App />);
        expect(screen.getByText(/TodoList/i)).toBeInTheDocument();
        expect(screen.getByText(/TodoInput/i)).toBeInTheDocument();
    })
});