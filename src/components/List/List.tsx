import styles from './List.module.scss'
import deleteIcon from '../../assets/img/icon_delete.png'
import editIcon from '../../assets/img/icon_edit.png'
import doIcon from '../../assets/img/icon_do.png'
import doneIcon from '../../assets/img/icon_done.png'
import { useTodo } from '../../context/TodoContext'

const List: React.FC = () => {

    const {
        tasks,
        status,
        toggleTaskStatus,
        deleteTask,
        deleteAllTasks,
        deleteDoneTasks,
        changeStatus,
        editTask,
        editStart,
        editEnd
    } = useTodo()

    const statusCollection = ['all', 'done', 'todo']

    const edit = tasks.filter((item) => (
        item.status === status ? item.status === status : status === 'all'
    ))
        .map((task, i) => {

            let element;
            if (task.isEdit) {
                element = <input
                    autoFocus
                    value={task.task}
                    onChange={(event) => editTask(i, event)}
                    onBlur={() => editEnd(i)}
                    className={styles.List__items_item_options_input}
                />
            } else {
                element = <div key={i} className={styles.List__items_item}>
                    <div
                        className={
                            task.status === 'todo' ? styles.List__items_item_text : styles.List__items_item_text_done}
                        onClick={() => toggleTaskStatus(i)}
                    >{task.task}</div>
                    <div className={styles.List__items_item_options}>
                        <div
                            className={styles.List__items_item_options_option}
                            onClick={() => toggleTaskStatus(i)}
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
                            onClick={() => changeStatus(item)}
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