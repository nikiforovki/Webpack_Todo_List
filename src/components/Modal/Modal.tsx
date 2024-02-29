import React, { useState } from "react";
import styles from "./Modal.module.scss";


interface ModalProps {
    closeModal: () => void;
    onNewTask: (task: string) => void;
}

export const Modal: React.FC<ModalProps> = ({ closeModal, onNewTask }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [tasks, setTasks] = useState<string[]>([]); // Состояние для списка задач
    const [error, setError] = useState<string | null>(null); // Состояние для ошибки

    const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAdd();
        }
    };

    // В компоненте Modal
    const handleAdd = () => {
        if (inputValue.trim() === '') {
            setError('Задача не может быть пустой');
            return;
        }
        const newTask = inputValue;
        setInputValue('');
        if (onNewTask) {
            onNewTask(newTask); // Здесь вызывается функция onNewTask, которая в вашем случае является handleNewTask
        }
    };


    return (
        <div className={styles.modal_content} onClick={closeModal}>
            <h1 className={styles.h1}>Добавить задачу</h1>
            <input
                className={styles.input}
                placeholder="Введите текст..."
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onClick={handleInputClick}
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
            <button className={styles.closeButton} onClick={closeModal}>
                Закрыть
            </button>
            <button className={styles.appButton} onClick={handleAdd}>
                Добавить
            </button>
        </div>
    );
};












