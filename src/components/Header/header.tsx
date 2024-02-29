import React from 'react';
import styles from './header.module.scss';
import {InputSearch} from "../Input/InputSearch";
import ToggleDeleteAllTask from "../ToggleDeleteAllTask/ToggleDeleteAllTask";

export const Header = ({ onDeleteAllTasks }) => {
    return (
        <div className={styles.headerContainer}>
            <h1>TODO LIST</h1>
            <InputSearch />
            {/*<ToggleDeleteAllTask onDelete={onDeleteAllTasks} />*/}
        </div>
    );
};

