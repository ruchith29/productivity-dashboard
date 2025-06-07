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
import { Snackbar, Alert } from "@mui/material";
import { HeaderComponent } from './HeaderComponent';
import { useContext } from 'react';
import { PrevTaskContext, RowsDataContext } from '../GlobalObjects/PrevTasksContext';
import { UpdatedCellDialog } from './UpdateCell.js';
import Chip from '@mui/material/Chip';

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


function createData(task, id, completed, startDate, endDate, workingHours, priority, inProgressDate) {
    return { task, id, completed, startDate, endDate, workingHours, priority, inProgressDate };
}

const messages = [
    "Whoa there, overachiever!",
    "Your to-do list just filed for overtime.",
    "Even a robot would need a break now.",
    "You planning world domination or just laundry?",
    "I hope coffee is part of this plan.",
    "Relax! Rome wasn’t built in one to-do list.",
    "Your tasks are forming a union.",
    "May the productivity gods be with you.",
    "Time to clone yourself, maybe?",
    "You're one checkbox away from enlightenment."
];


export function TaskList() {

    // global object access
    const { addPrevTask } = useContext(PrevTaskContext);
    const { allRows, addRow, deleteRow, setAllRows } = useContext(RowsDataContext);

    let [snackBarOpen, setSnackbarOpen] = useState(false);
    let [snackbarMessage, setSnackbarMessage] = useState("");
    let [snackbarSeverity, setSnackbarSeverity] = useState("");



    function getRandomMessage() {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }

    function getCurrentTime() {
        const currentDate = new Date();
        return currentDate.toDateString() + ' ' + currentDate.toLocaleTimeString();
    }

    const appendTask = (data) => {

        if (allRows.length === 5) {
            // show a snack bar
            showSnackbar(getRandomMessage(), "error");
        }
        else {

            // null checks
            if (data.description.trim() === '') {
                showSnackbar("Cool task! But... what is it?", "error");
                return;
            }
            if (data.priority === '') {
                alert("Priority? Never heard of her ");
                return;
            }

            const index = allRows.length === 0 ? 0 : allRows[allRows.length - 1].id;
            const row = createData(data.description, index + 1, "Yet to Start", getCurrentTime(), "", "", data.priority, "")
            addRow(row)
            setAllRows(() => { return [...allRows, row] })
            showSnackbar("Task Added", "success");
        }
    }

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    function getTimeDifferenceInHours(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const diffMs = end - start;

        if (isNaN(diffMs)) {
            return null;
        }

        const diffHours = diffMs / (1000 * 60 * 60);
        return diffHours.toFixed(4);
    }

    return (
        <>
            <HeaderComponent></HeaderComponent>
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                style={{ zIndex: +9999, marginTop: "30px" }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

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
                        {allRows.length === 0 ? (
                            <StyledTableRow>
                                <StyledTableCell colSpan={5} align="center" style={{ fontSize: "18px" }}>
                                    No tasks
                                </StyledTableCell>
                            </StyledTableRow>
                        ) : allRows.map((row) => (
                            <StyledTableRow key={row.id} >
                                <StyledTableCell>{row.id}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">{row.task}</StyledTableCell>
                                <StyledTableCell>    <Chip
                                    label={row.completed}
                                    color={row.completed === 'In Progress' ? 'warning' :
                                        row.completed === 'Blocked' ? 'error' : 'success'}
                                    size="small"
                                /></StyledTableCell>
                                <StyledTableCell onClick={() => { deleteTask(row.id) }}><DeleteOutlineIcon /></StyledTableCell>
                                <StyledTableCell  >
                                    <UpdatedCellDialog row={row} />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </>

    );


    function deleteTask(deleteId) {
        const updatedRows = allRows.filter((row) => {
            if (row.id === deleteId) {
                row.endDate = getCurrentTime();
                row.workingHours = row.inProgressDate === '' ? '0.0000' : getTimeDifferenceInHours(row.inProgressDate, getCurrentTime());
                const updatedRow = { ...row, completed: 'Skipped' };
                deleteRow(row.id);
                addPrevTask(updatedRow);
                return false;
            }
            return true;
        });
        setAllRows(updatedRows);
    }


}