import { act, render } from "@testing-library/react";
import { TodoProvider, useTodo } from "./TodoContext";
import { ReactNode } from "react";
import { TodoContextProps } from './TodoContext';

interface TestComponentProps {
    testFunction: (context: TodoContextProps) => void;
    children?: ReactNode;
}

describe('TodoContext', () => {

    const TestComponent = ({ testFunction }: TestComponentProps) => {
        const context = useTodo();
        testFunction(context);
        return null;
    }

    beforeEach(() => {
        localStorage.clear();
    });

    test('initialized with empty tasks', () => {
        let contextValue: TodoContextProps | undefined;

        render(
            <TodoProvider>
                <TestComponent testFunction={(ctx) => { contextValue = ctx }} />
            </TodoProvider>
        );

        expect(contextValue?.tasks).toEqual([]);
        expect(contextValue?.status).toBe('all')
    });

    test('add new task', () => {
        let contextValue: TodoContextProps | undefined;

        render(
            <TodoProvider>
                <TestComponent testFunction={(ctx) => { contextValue = ctx }} />
            </TodoProvider>
        );

        act(() => {
            contextValue?.addTask('New Task');
        });

        expect(contextValue?.tasks).toEqual([
            { task: 'New Task', status: 'todo', isEdit: false }
        ]);
    });

    test('toggle task status', () => {
        let contextValue: TodoContextProps | undefined;

        render(
            <TodoProvider>
                <TestComponent testFunction={(ctx) => { contextValue = ctx }} />
            </TodoProvider>
        );

        act(() => {
            contextValue?.addTask('Test task');
        });

        act(() => {
            contextValue?.toggleTaskStatus(0);
        });

        expect(contextValue?.tasks[0].status).toBe('done');

        act(() => {
            contextValue?.toggleTaskStatus(0);
        });

        expect(contextValue?.tasks[0].status).toBe('todo');
    });

    test('changes filter status', () => {
        let contextValue: TodoContextProps | undefined;

        render(
            <TodoProvider>
                <TestComponent testFunction={(ctx) => { contextValue = ctx }} />
            </TodoProvider>
        );

        act(() => {
            contextValue?.changeStatus('done');
        });

        expect(contextValue?.status).toBe('done');
    });

    test('counts tasks left correctly', () => {
        let contextValue: TodoContextProps | undefined;

        render(
            <TodoProvider>
                <TestComponent testFunction={(ctx) => { contextValue = ctx }} />
            </TodoProvider>
        );

        act(() => {
            contextValue?.addTask('Task 1')
        });

        act(() => {
            contextValue?.addTask('Task 2')
        });

        act(() => {
            contextValue?.toggleTaskStatus(0);
        });

        expect(contextValue?.tasksLeft()).toBe(1);
    });

    describe('task deletion', () => {
        test('deletes single task', () => {
            let contextValue: TodoContextProps | undefined;

            render(
                <TodoProvider>
                    <TestComponent testFunction={(ctx) => { contextValue = ctx }} />
                </TodoProvider>
            );

            act(() => {
                contextValue?.addTask('Task 1');
            });

            act(() => {
                contextValue?.addTask('Task 2');
            });

            expect(contextValue?.tasks).toHaveLength(2);

            act(() => {
                contextValue?.deleteTask(0);
            });

            expect(contextValue?.tasks).toHaveLength(1);
            expect(contextValue?.tasks).toEqual([
                { task: 'Task 2', status: 'todo', isEdit: false }
            ]);
        });

        test('deleted all tasks', () => {
            let contextValue: TodoContextProps | undefined;

            render(
                <TodoProvider>
                    <TestComponent testFunction={(ctx) => { contextValue = ctx }} />
                </TodoProvider>
            );

            act(() => {
                contextValue?.addTask('Task 1');
            });

            act(() => {
                contextValue?.addTask('Task 2');
            });

            expect(contextValue?.tasks).toHaveLength(2);

            act(() => {
                contextValue?.deleteAllTasks();
            })

            expect(contextValue?.tasks).toEqual([]);
        });

        test('delete done tasks only', () => {
            let contextValue: TodoContextProps | undefined;

            render(
                <TodoProvider>
                    <TestComponent testFunction={(ctx) => { contextValue = ctx }} />
                </TodoProvider>
            );

            act(() => {
                contextValue?.addTask('Task 1');
            });

            act(() => {
                contextValue?.addTask('Task 2');
            });

            act(() => {
                contextValue?.toggleTaskStatus(0);
            });

            act(() => {
                contextValue?.deleteDoneTasks();
            });

            expect(contextValue?.tasks).toEqual([
                { task: 'Task 2', status: 'todo', isEdit: false }
            ]);
        });
    });

    describe('task editing', () => {
        test('starts editing', () => {
            let contextValue: TodoContextProps | undefined;

            render(
                <TodoProvider>
                    <TestComponent testFunction={(ctx) => { contextValue = ctx; }} />
                </TodoProvider>
            );

            act(() => {
                contextValue?.addTask('Original Task');
            });

            act(() => {
                contextValue?.editStart(0);
            });

            expect(contextValue?.tasks[0].isEdit).toBe(true);
        });

        test('edits task text', () => {
            let contextValue: TodoContextProps | undefined;

            render(
                <TodoProvider>
                    <TestComponent testFunction={(ctx) => { contextValue = ctx }} />
                </TodoProvider>
            );

            act(() => {
                contextValue?.addTask('Original task');
            });

            act(() => {
                contextValue?.editStart(0);
            });

            act(() => {
                contextValue?.editTask(0, { target: { value: 'Update task' } } as React.ChangeEvent<HTMLInputElement>);
            });

            expect(contextValue?.tasks[0].task).toBe('Update task');

        });

        test('finishes editing', () => {
            let contextValue: TodoContextProps | undefined;

            render(
                <TodoProvider>
                    <TestComponent testFunction={(ctx) => { contextValue = ctx }} />
                </TodoProvider>
            );

            act(() => {
                contextValue?.addTask('Test task');
            });

            act(() => {
                contextValue?.editStart(0);
            });

            act(() => {
                contextValue?.editEnd(0);
            });

            expect(contextValue?.tasks[0].isEdit).toBe(false);
        });
    });

});
