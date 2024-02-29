import React, { useState } from "react";
import styles from './src/styles/index.module.scss';
import './src/components/Header/header.module.scss';
import { Header } from "./src/components/Header/header";
import { ParentComponent } from "./src/components/ParentComponent/ParentComponent";
import { Task } from './src/redux/interface/interface';
import DarkMode from "./src/components/DarkMode/DarkMode";

const App: React.FC = () => {
    const [modalActive, setModalActive] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]); // Использование Task для типизации состояния
    const [isAlertOpen, setIsAlertOpen] = useState(false); // Состояние для управления отображением алерта

    const handleNewTask = (newTask: Task) => { // Явное указание типа для newTask
        setTasks([...tasks, newTask]);
        setIsAlertOpen(true); // Открываем алерт при добавлении новой задачи
    };

    const openModal = () => {
        setModalActive(true);
    };

    const closeModal = () => {
        setModalActive(false);
    };

    const closeAlert = () => {
        setIsAlertOpen(false); // Закрываем алерт
    };

    return (
        <div className={styles.App}>
            <Header />
            <ParentComponent />
        </div>
    );
}

export default App;
