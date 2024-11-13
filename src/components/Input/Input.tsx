import { KeyboardEvent, useState } from 'react';
import styles from './Input.module.scss'
import { useTodo } from '../../context/TodoContext';


const Input: React.FC = () => {

    const { addTask } = useTodo()

    const [value, setValue] = useState('')

    const onClickAdd = () => {
        if (value.length > 0) {
            addTask(value)
            setValue('')
        }
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (value.length > 0) {
                addTask(value)
                setValue('')
            }
        }
    }

    return (
        <div className={styles.Input}>
            <h2>TodoInput</h2>
            <div className={styles.Input__block}>
                <input
                    type='text'
                    className={styles.Input__block_input}
                    placeholder='New Todo'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={(event) => handleKeyDown(event)}
                ></input>
                <button
                    className={styles.Input__block_btn}
                    onClick={() => onClickAdd()}
                >Add new task</button>
            </div>
        </div>
    )
}

export default Input