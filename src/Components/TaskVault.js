import { HeaderComponent } from './HeaderComponent';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { PrevTaskContext } from '../GlobalObjects/PrevTasksContext';
import { Button } from '@mui/material';
import '../Styles/TaskVault.css';
import { useState } from 'react';




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

export function TaskVault() {

    // get the prev tasks
    const { prevTasks } = useContext(PrevTaskContext);

    const [status, setStatus] = useState('');

    const [filteredData, setFilteredData] = useState(prevTasks);

    function filter(status, prevTasks) {
        const newFiltered = prevTasks.filter(row => row.completed === status);
        setFilteredData(newFiltered);
    }

    return (
        <>
            <HeaderComponent></HeaderComponent>
            <div className="vault-header">
                <p>Filters</p>

                <Button
                    color="secondary"
                    variant={status === 'Skipped' ? 'contained' : 'outlined'}
                    onClick={() => {
                        filter('Skipped', prevTasks);
                        setStatus('Skipped')
                    }}
                >
                    Skipped
                </Button>

                <Button
                    color="secondary"
                    variant={status === 'Completed' ? 'contained' : 'outlined'}
                    onClick={() => {
                        filter('Completed', prevTasks);
                        setStatus('Completed')
                    }}
                >
                    Completed
                </Button>
            </div >

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>S.No</StyledTableCell>
                            <StyledTableCell>Task</StyledTableCell>
                            <StyledTableCell >Status</StyledTableCell>
                            <StyledTableCell >Start Date</StyledTableCell>
                            <StyledTableCell >End Date</StyledTableCell>
                            <StyledTableCell >Working Hours</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.length === 0 ?
                            <StyledTableRow>
                                <StyledTableCell colSpan={6} align="center" style={{ fontSize: "18px" }}>
                                    No tasks
                                </StyledTableCell>
                            </StyledTableRow>
                            : filteredData.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell>{row.id}</StyledTableCell>
                                    <StyledTableCell>{row.task}</StyledTableCell>
                                    <StyledTableCell >{row.completed}</StyledTableCell>
                                    <StyledTableCell >{row.startDate}</StyledTableCell>
                                    <StyledTableCell >{row.endDate}</StyledTableCell>
                                    <StyledTableCell >{row.workingHours}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
}