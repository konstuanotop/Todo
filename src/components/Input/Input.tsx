import { Dispatch, KeyboardEvent, SetStateAction } from 'react';
import styles from './Input.module.scss'
import { Tasks } from '../../types';

interface InputProps {
    tasks: Tasks[];
    setTasks: Dispatch<SetStateAction<Tasks[]>>;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}


const Input: React.FC<InputProps> = ({ tasks, setTasks, value, setValue }) => {

    const onClickAdd = () => {
        if (value.length > 0) {
            setTasks([...tasks, { task: value, status: 'todo', isEdit: false }])
            setValue('')
        }
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (value.length > 0) {
                setTasks([...tasks, { task: value, status: 'todo', isEdit: false }])
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