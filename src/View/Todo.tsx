import Input from "../components/Input/Input"
import List from "../components/List/List"
import styles from './Todo.module.scss'
import { TodoProvider } from "../context/TodoContext"

const Todo = () => {

    return (
        <TodoProvider>
            <div className={styles.Todo}>
                <Input />
                <List />
            </div>
        </TodoProvider>

    )
}

export default Todo