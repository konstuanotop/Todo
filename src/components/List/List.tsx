import styles from './List.module.scss'
import deleteIcon from '../../assets/img/icon_delete.png'
import editIcon from '../../assets/img/icon_edit.png'
import doIcon from '../../assets/img/icon_do.png'
import doneIcon from '../../assets/img/icon_done.png'
import { Tasks } from '../../types'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface ListProps {
    tasks: Tasks[];
    setTasks: Dispatch<SetStateAction<Tasks[]>>;
    statusCollection: string[];
    status: string;
    setStatus: Dispatch<SetStateAction<string>>;
}


const List: React.FC<ListProps> = ({ tasks, setTasks, statusCollection, status, setStatus }) => {

    const toggleStatus = (i: number) => {
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

    const onClickStatus = (item: string) => {
        setStatus(item)
    }

    const editSave = (i: number, event: ChangeEvent<HTMLInputElement>) => {
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

    const edit = tasks.filter((item) => (
        item.status === status ? item.status === status : status === 'all'
    ))
        .map((task, i) => {

            let element;
            if (task.isEdit) {
                element = <input
                    autoFocus
                    value={task.task}
                    onChange={(event) => editSave(i, event)}
                    onBlur={() => editEnd(i)}
                    className={styles.List__items_item_options_input}
                />
            } else {
                element = <div key={i} className={styles.List__items_item}>
                    <div
                        className={
                            task.status === 'todo' ? styles.List__items_item_text : styles.List__items_item_text_done}
                        onClick={() => toggleStatus(i)}
                    >{task.task}</div>
                    <div className={styles.List__items_item_options}>
                        <div
                            className={styles.List__items_item_options_option}
                            onClick={() => toggleStatus(i)}
                        ><img
                                src={task.status === 'todo' ? doIcon : doneIcon}
                                alt="Статус"
                            />
                        </div>
                        <div
                            className={styles.List__items_item_options_option}
                            onClick={() => editStart(i)}
                        ><img
                                src={editIcon}
                                alt="Редактировать" />
                        </div>
                        <div
                            className={styles.List__items_item_options_option}
                            onClick={() => deleteTask(i)}
                        >
                            <img src={deleteIcon} alt="Удалить" /></div>
                    </div>
                </div>
            }
            return <div key={i}>{element}</div>
        })

    return (
        <div className={styles.List}>
            <h2>TodoList</h2>
            <div className={styles.List__states}>
                {
                    statusCollection.map((item) => (
                        <button
                            key={item}
                            className={status !== item ? styles.List__states_btn : styles.List__states_btn_active}
                            onClick={() => onClickStatus(item)}
                        >{item}</button>
                    ))
                }
            </div>
            <div className={styles.List__items}>
                {
                    edit
                }

            </div>
            <div className={styles.List__delete}>
                <button
                    className={styles.List__delete_btn}
                    onClick={() => deleteDoneTasks()}
                >Delete done tasks</button>
                <button
                    onClick={() => deleteAllTasks()}
                    className={styles.List__delete_btn}
                >Delete all tasks</button>
            </div>
        </div>
    )
}

export default List