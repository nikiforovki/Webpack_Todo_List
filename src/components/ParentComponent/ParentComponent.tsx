import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import styles from '../ParentComponent/ParentComponent.module.scss';
import DeleteTaskImage from "../../../public/Img/DeleteTaskImage";
import IzmTasImage from "../../../public/Img/IzmTaskaImage";
import { AlertModal } from '../Alert/Alert';
import ToggleDelete from "../ToggleDeleteAllTask/ToggleDeleteAllTask";
import izmTaskaImage from "../../../public/Img/IzmTaskaImage";



export const ParentComponent: React.FC = () => {
    const [tasks, setTasks] = useState<string[]>([]);
    const [modalTasks, setModalTasks] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedTasks, setSelectedTasks] = useState<boolean[]>([]);

    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');

    const [deletedTasksCount, setDeletedTasksCount] = useState(0);
    // Создание состояния для хранения удаленных задач
    const [deletedTasks, setDeletedTasks] = useState<string[]>([]);

    const [taskToUpdate, setTaskToUpdate] = useState(null);


// Сохранение тасок
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setModalTasks(JSON.parse(savedTasks));
        }
    }, []);
// Сохранение удаленных тасок
    useEffect(() => {
        const savedDeletedTasks = localStorage.getItem('deletedTasks');
        if (savedDeletedTasks) {
            setDeletedTasks(JSON.parse(savedDeletedTasks));
        }
    }, []);

    //Изменения таски
    useEffect(() => {
        if (taskToUpdate) {
            const { taskId, updatedTask } = taskToUpdate;
            updateTask(taskId, updatedTask);
            setTaskToUpdate(null); // Сбрасываем состояние, чтобы избежать повторного вызова эффекта
        }
    }, [taskToUpdate]);





    const handleModalTask = (task: string) => {
        setModalTasks(prevTasks => {
            const updatedTasks = [...prevTasks, task];
            // Сохраняем обновленный массив задач в localStorage
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });
        setAlertMessage(`Задача "${task}" добавлена`);
        setIsAlertOpen(true); // Открываем модальное окно с алертом
        setIsModalOpen(false); // Закрываем модальное окно с задачей
    };

    const updateTask = (index: number, updatedTask: string) => {
        setModalTasks(prevTasks => {
            // Создаем новый массив с обновленной задачей
            const updatedTasks = [
                ...prevTasks.slice(0, index), // Все задачи до обновленной
                updatedTask, // Обновленная задача
                ...prevTasks.slice(index + 1) // Все задачи после обновленной
            ];

            // Сохраняем обновленные задачи в localStorage
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));

            return updatedTasks;
        });
    };




    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    //Добавление тасок
    const handleCheckboxChange = (index: number) => {
        setSelectedTasks(prevSelectedTasks => {
            const newSelectedTasks = [...prevSelectedTasks];
            newSelectedTasks[index] = !newSelectedTasks[index];
            return newSelectedTasks;
        });
    };

    // Удаление одной таски
    const deleteTask = (index: number) => {
        setModalTasks(prevTasks => {
            const taskToDelete = prevTasks[index];
            const updatedTasks = prevTasks.filter((task, i) => i !== index);

            // Обновляем состояние deletedTasks, добавляя удаленную задачу
            setDeletedTasks(prevDeletedTasks => {
                const updatedDeletedTasks = [...prevDeletedTasks, taskToDelete];
                // Сохраняем обновленный массив задач в localStorage
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                // Сохраняем обновленный массив удаленных задач в localStorage
                localStorage.setItem('deletedTasks', JSON.stringify(updatedDeletedTasks));
                return updatedDeletedTasks;
            });

            return updatedTasks;
        });
    };


    //Удаление всех тасок (Очистка всех тасок в истории)
    const deleteAllTasks = () => {
        setModalTasks([]); // Удаляем все задачи
        setSelectedTasks([]); // Сбрасываем выбранные задачи
        localStorage.clear();//Чистим локал сторедже
    };


    //Подсчет общего количество тасок
    const allTasks = [...modalTasks, ...deletedTasks];


    return (
        <div className={styles.content}>
            <div className={styles.alertContainer}>
                {isAlertOpen &&
                    <AlertModal message={alertMessage} isOpen={isAlertOpen} closeAlert={() => setIsAlertOpen(false)}/>}
            </div>
            {isModalOpen && <Modal onNewTask={handleModalTask} closeModal={toggleModal}/>}
            <button className={styles.toggleModal} onClick={toggleModal}></button>

            <div className={styles.wrapper}>
                <div className={styles.okno}>
                    <div>
                        {modalTasks.map((task, index) => (
                            <div className={styles.taskItem} key={index}>
                                <div className={styles.taskString}></div>
                                <input
                                    type="checkbox"
                                    className={styles.inputCheckbox}
                                    checked={selectedTasks[index]}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                <div
                                    className={selectedTasks[index] ? `${styles.taska} ${styles.selected}` : styles.taska}>
                                    {task}
                                </div>
                                <div className={styles.izmTaskConteiner} onClick={() => updateTask(index, updatedTasks)}>
                                    <IzmTasImage className={styles.izmTas}/>
                                </div>
                                <div className={styles.deleteTaskContainer} onClick={() => deleteTask(index)}>
                                    <DeleteTaskImage className={styles.deleteTask}/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ToggleDelete onDelete={deleteAllTasks} className={styles.knopka}/>
                    {/*<Header onDeleteAllTasks={deleteAllTasks} />*/}
                </div>
                <div className={styles.tabTaska}>
                    <p className={styles.taskItem}>Общие колличество задач: {allTasks.length}</p>
                    <p className={styles.taskItem}>Активные задачи: {modalTasks.length}</p>
                    <p className={styles.taskItem}>Удалено задач: {deletedTasks.length}</p>
                </div>
            </div>
        </div>
    );
}





















