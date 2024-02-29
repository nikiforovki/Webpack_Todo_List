
import React, { useState } from 'react';
import styles from './InputSearch.module.scss';
import { ButtonSort } from "../ButtonSort/ButtonSort";
import { ButtonBgcolor } from "../ButtonBgcolor/ButtonBgcolor";
import DarkMode from "../DarkMode/DarkMode";

interface InputProps {
    tasks: string[];
    modalTasks: string[]; // Добавляем проп для задач из модального окна
    onNewTask: (task: string) => void;
}

export const InputSearch: React.FC<InputProps> = ({ tasks, modalTasks, onNewTask }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [completedTasks, setCompletedTasks] = useState<number[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleCheckboxChange = (taskId: number) => {
        setCompletedTasks(prevState => {
            if (prevState.includes(taskId)) {
                return prevState.filter(item => item !== taskId);
            } else {
                return [...prevState, taskId];
            }
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const newTask = inputValue;
            setInputValue('');
            if (onNewTask) {
                onNewTask(newTask);
            }
        }
    };

    return (
        <div className={styles.inputButtonContainer}>
            <input
                className={styles.input}
                type="search"
                placeholder="Введите задачу..."
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <div className={styles.buttonContainer}>
                <ButtonSort/>
                {/*<ButtonBgcolor/>*/}
                <DarkMode />
            </div>
            <div className={styles.taskListContainer}>
                <ul>
                    {tasks && tasks.map((task, index) => (
                        <React.Fragment key={index}>
                            <li>{task}</li>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={completedTasks.includes(index)}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <span className={styles.taskText}>{task}</span>
                            <hr className={styles.taskLine}/>
                        </React.Fragment>
                    ))}
                </ul>
                <ul>
                    {modalTasks && modalTasks.map((task, index) => (
                        <li key={index}>{task}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InputSearch;

