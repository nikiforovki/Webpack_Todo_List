import React, { useState } from 'react';
import styles from './ButtonSort.module.scss';

export const ButtonSort = () => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value as 'asc' | 'desc');
    };

    return (
        <button className={styles.button}>
            <select
                className={styles.select}
                value={sortOrder}
                onChange={handleSortChange}
            >
                <option value="ascddd">ALL</option>
                <option value="asc">Complete</option>
                <option value="desc">Incomplete</option>
            </select>
        </button>
    );
};



