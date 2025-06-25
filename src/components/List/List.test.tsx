import { render, screen, } from "@testing-library/react";
import { TodoProvider, useTodo } from "../../context/TodoContext";
import List from "./List";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { Tasks } from "../../types";

jest.mock("../../context/TodoContext.tsx", () => ({
    ...jest.requireActual("../../context/TodoContext"),
    useTodo: jest.fn(),
}));

describe('List Component', () => {
    const mockContext = {
        tasks: [] as Tasks[],
        status: 'all',
        addTask: jest.fn(),
        toggleTaskStatus: jest.fn(),
        deleteTask: jest.fn(),
        deleteAllTasks: jest.fn(),
        deleteDoneTasks: jest.fn(),
        changeStatus: jest.fn(),
        editTask: jest.fn(),
        editStart: jest.fn(),
        editEnd: jest.fn(),
        tasksLeft: jest.fn(() => 0),
    };

    beforeEach(() => {
        (useTodo as jest.Mock).mockReturnValue(mockContext);
        jest.clearAllMocks();
    });

    test('display tasks correctly', () => {
        const mockTasks = [
            { task: 'Task 1', status: 'todo', isEdit: false },
            { task: 'Task 2', status: 'done', isEdit: false },
        ];

        (useTodo as jest.Mock).mockReturnValue({
            ...mockContext,
            tasks: mockTasks,
            tasksLeft: jest.fn(() => 1),
        });

        render(
            <TodoProvider>
                <List />
            </TodoProvider>
        );

        expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
        expect(screen.getByText(/Tasks left: 1/i)).toBeInTheDocument();
    });

    test('filters tasks by status', async () => {
        const mockTasks = [
            { task: 'Active task', status: 'todo', isEdit: false },
            { task: 'Completed task', status: 'done', isEdit: false },
        ];

        (useTodo as jest.Mock).mockReturnValue({
            ...mockContext,
            tasks: mockTasks,
            status: 'all',
        });

        render(
            <TodoProvider>
                <List />
            </TodoProvider>
        );

        const user = userEvent.setup();
        const todoButton = screen.getByRole('button', { name: /todo/i });
        await user.click(todoButton);

        expect(mockContext.changeStatus).toHaveBeenCalledWith('todo');
    });

    test('handles task deletion', async () => {
        const mockTasks = [
            { task: 'Task to delete', status: 'todo', isEdit: false },
        ];

        (useTodo as jest.Mock).mockReturnValue({
            ...mockContext,
            tasks: mockTasks,
        });

        render(
            <TodoProvider>
                <List />
            </TodoProvider>
        );

        const user = userEvent.setup();
        const deleteButton = screen.getByAltText('Удалить');
        await user.click(deleteButton);

        expect(mockContext.deleteTask).toHaveBeenCalledWith(0);
    });

    test('handle toggle status', async () => {
        const mockTasks = [
            { task: 'Task to toggle', status: 'todo', isEdit: false },
        ];

        (useTodo as jest.Mock).mockReturnValue({
            ...mockContext,
            tasks: mockTasks,
        });

        render(
            <TodoProvider>
                <List />
            </TodoProvider>
        );

        const user = userEvent.setup();
        const statusButton = screen.getByAltText('Статус');
        await user.click(statusButton);

        expect(mockContext.toggleTaskStatus).toHaveBeenCalledWith(0);
    });

    test('hadles task editing', async () => {
        const mockTasks = [
            { task: 'Task to edit', status: 'todo', isEdit: false },
        ];

        (useTodo as jest.Mock).mockReturnValue({
            ...mockContext,
            tasks: mockTasks,
        });

        render(
            <TodoProvider>
                <List />
            </TodoProvider>
        );

        const user = userEvent.setup();
        const editButton = screen.getByAltText('Редактировать');
        await user.click(editButton);

        expect(mockContext.editStart).toHaveBeenCalledWith(0);
    });

    test('delete all done tasks', async () => {
        const mockTasks = [
            { task: 'Done Task 1', status: 'done', isEdit: false },
            { task: 'Done Task 2', status: 'done', isEdit: false },
            { task: 'Active Task', status: 'todo', isEdit: false },
        ];

        (useTodo as jest.Mock).mockReturnValue({
            ...mockContext,
            tasks: mockTasks,
        });

        render(
            <TodoProvider>
                <List />
            </TodoProvider>
        );

        const user = userEvent.setup();
        const deleteDoneButton = screen.getByText(/Delete done tasks/i);
        await user.click(deleteDoneButton);

        expect(mockContext.deleteDoneTasks).toHaveBeenCalled();
    });

    test('delete all tasks', async () => {
        const mockTasks = [
            { task: 'Task 1', status: 'todo', isEdit: false },
            { task: 'Task 2', status: 'done', isEdit: false },
        ];

        (useTodo as jest.Mock).mockReturnValue({
            ...mockContext,
            tasks: mockTasks,
        });

        render(
            <TodoProvider>
                <List />
            </TodoProvider>
        );

        const user = userEvent.setup();
        const deleteAllButton = screen.getByText(/Delete all tasks/i);
        await user.click(deleteAllButton);

        expect(mockContext.deleteAllTasks).toHaveBeenCalled();
    });

    test('show correct tasks left count', () => {
        const mockTasks = [
            { task: 'Task 1', status: 'todo', isEdit: false },
            { task: 'Task 2', status: 'todo', isEdit: false },
            { task: 'Task 3', status: 'done', isEdit: false },
        ];

        (useTodo as jest.Mock).mockReturnValue({
            ...mockContext,
            tasks: mockTasks,
            tasksLeft: jest.fn(() => 2),
        });

        render(
            <TodoProvider>
                <List />
            </TodoProvider>
        );

        expect(screen.getByText(/Tasks left: 2/i)).toBeInTheDocument();
    });

    test('displays edit input when task is in edit mode', () => {
        const mockTasks = [
            { task: 'Editable Task', status: 'todo', isEdit: true },
        ];

        (useTodo as jest.Mock).mockReturnValue({
            ...mockContext,
            tasks: mockTasks,
        });

        render(
            <TodoProvider>
                <List />
            </TodoProvider>
        );

        expect(screen.getByDisplayValue('Editable Task')).toBeInTheDocument();
    });
});

export { };