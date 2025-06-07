import React, { useState } from 'react';
import { PrevTaskContext, RowsDataContext } from './PrevTasksContext';

export const PrevTaskProvider = ({ children }) => {
    const [prevTasks, setPrevTask] = useState([]);

    const addPrevTask = (newPrevTask) => {
        setPrevTask(prev => [...prev, newPrevTask]);
    };

    return (
        <PrevTaskContext.Provider value={{ prevTasks, addPrevTask }}>
            {children}
        </PrevTaskContext.Provider>
    );
};

export const RowsDataProvider = ({ children }) => {
    const [allRows, setAllRows] = useState([]);

    const addRow = (newRow) => {
        setAllRows(prev => [...prev, newRow]);
    };

    const deleteRow = (id) => {
        setAllRows(prev => prev.filter(row => row.id !== id));
    };

    return (
        <RowsDataContext.Provider value={{ allRows, addRow, deleteRow, setAllRows }}>
            {children}
        </RowsDataContext.Provider>
    );
};