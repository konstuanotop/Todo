import { useState } from "react"
import Input from "../components/Input/Input"
import List from "../components/List/List"
import { Tasks } from "../types"
import styles from './Todo.module.scss'

// Менять статус с Todo на Done и наоборот
// Редактировать элемент массива задач
// Удалять выбранный элемент массива 
// Удалять все сделанные задачи
// Удалять все задачи
// Отображать все задачи
// Отображать сделанные задачи
// Отображать невыполненные задачи

const Todo = () => {
    const [tasks, setTasks] = useState<Tasks[]>([])
    const [value, setValue] = useState('')
    const [status, setStatus] = useState<string>('all')


    const statusCollection = ['all', 'done', 'todo']

    console.log(tasks)

    return (
        <div className={styles.Todo}>
            <Input tasks={tasks} setTasks={setTasks} value={value} setValue={setValue} />
            <List tasks={tasks} setTasks={setTasks} statusCollection={statusCollection} status={status} setStatus={setStatus} />
        </div>
    )
}

export default Todo