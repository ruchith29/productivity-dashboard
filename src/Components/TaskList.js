import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from 'react';
import { InputForm } from './AddTask'
import DoneIcon from '@mui/icons-material/Done';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

let data = [
    createData('Buy groceries', 1, false),
    createData('Clean the house', 2, true),
    createData('Finish project report', 3, false),
];

function createData(task, id, completed) {
    return { task, id, completed };
}

export function TaskList() {
    let [rows, setRows] = useState(data);

    const appendTask = (data) => {
        const index = rows[rows.length - 1].id;
        const row = createData(data, index + 1, false)

        setRows(() => { return [...rows, row] })
    }

    return (
        <>
            <InputForm appendTask={appendTask}></InputForm>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell >Id</StyledTableCell>
                            <StyledTableCell >Tasks</StyledTableCell>
                            <StyledTableCell >Status</StyledTableCell>
                            <StyledTableCell >Delete</StyledTableCell>
                            <StyledTableCell >Update</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length === 0 ? <span style={{ fontSize: "20px" }}>No tasks</span> : rows.map((row) => (
                            <StyledTableRow key={row.id} style={{
                                opacity: row.completed ? 0.5 : 1,
                                pointerEvents: row.completed ? "none" : "auto"
                            }}>
                                <StyledTableCell>{row.id}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">{row.task}</StyledTableCell>
                                <StyledTableCell>{row.completed ? "Completed" : "Pending"}</StyledTableCell>
                                <StyledTableCell onClick={() => { deleteTask(row.id) }}><DeleteOutlineIcon /></StyledTableCell>
                                <StyledTableCell onClick={() => { updateTask(row.id) }} >
                                    {row.completed ? "" : <DoneIcon />}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </>

    );

    function updateTask(updateId) {
        console.log(updateId)
        rows = rows.map((row) => {
            if (row.id === updateId) {
                return { ...row, completed: true };
            }
            return row;
        })
        console.log(rows)
        setRows(() => { return [...rows] })
    }

    function deleteTask(deleteId) {
        rows = rows.filter(({ task, id, completed }) => {
            return id !== deleteId;
        })
        setRows(() => { return [...rows] })
    }


}

// import React from "react";
// import "../Styles/TaskList.css"

// export function TaskList() {
//     const data = [
//         {
//             "id": 1,
//             "task": "Buy groceries",
//             "completed": false
//         },
//         {
//             "id": 2,
//             "task": "Clean the house",
//             "completed": true
//         },
//         {
//             "id": 3,
//             "task": "Finish project report",
//             "completed": false
//         }
//     ]

//     return (<div className="task-list-container">

//         <h3>Task List</h3>
//         <div className="list-header">
//             <p>ID</p>
//             <p>Task</p>
//             <p>Status</p>
//         </div>
//         <ul>
//             {data.map(({ id, task, completed }) => {
//                 console.log(id);

//                 return (
//                     <li key={id} className="list-container">
//                         <p>{id}</p>
//                         <p>{task}</p>
//                         <span>{completed ? "Finished" : "Pending"}</span>
//                     </li>
//                 );
//             }
//             )}

//         </ul>

//     </div>);
// }