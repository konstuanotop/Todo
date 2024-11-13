import { ChangeEvent, createContext, ReactNode, useContext, useState } from "react";
import { Tasks } from "../types";

interface TodoContextProps {
    tasks: Tasks[];
    status: string;
    addTask: (task: string) => void;
    toggleTaskStatus: (i: number) => void;
    deleteTask: (i: number) => void;
    deleteAllTasks: () => void;
    deleteDoneTasks: () => void;
    changeStatus: (item: string) => void;
    editTask: (i: number, event: ChangeEvent<HTMLInputElement>) => void;
    editStart: (i: number) => void;
    editEnd: (i: number) => void;
}

interface TodoProviderProps {
    children: ReactNode;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<Tasks[]>([])
    const [status, setStatus] = useState<string>('all')

    const addTask = (task: string) => {
        setTasks([...tasks, { task, status: 'todo', isEdit: false }])
    }

    const toggleTaskStatus = (i: number) => {
        setTasks(tasks =>
            tasks.map((task, index) =>
                index === i ? { ...task, status: task.status === 'todo' ? 'done' : 'todo' } : task)
        )
    }

    const deleteTask = (i: number) => {
        setTasks(tasks.filter((_, index) => index !== i))
    }

    const deleteAllTasks = () => {
        setTasks([])
    }

    const deleteDoneTasks = () => {
        setTasks(tasks =>
            tasks.filter((task) =>
                task.status !== 'done')
        )
    }

    const changeStatus = (item: string) => {
        setStatus(item)
    }

    const editTask = (i: number, event: ChangeEvent<HTMLInputElement>) => {
        const copy = [...tasks]
        copy[i].task = event.target.value;
        setTasks(copy)
    }

    const editStart = (i: number) => {
        const copy = [...tasks]
        copy[i].isEdit = true
        setTasks(copy)
    }

    const editEnd = (i: number) => {
        const copy = [...tasks]
        copy[i].isEdit = false
        setTasks(copy)
    }

    return (
        <TodoContext.Provider value={{
            tasks,
            status,
            addTask,
            toggleTaskStatus,
            deleteTask,
            deleteAllTasks,
            deleteDoneTasks,
            changeStatus,
            editTask,
            editStart,
            editEnd
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error('useTodo must be used within a TodoProvider')
    }
    return context;
}