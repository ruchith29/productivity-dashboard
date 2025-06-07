import { useContext } from "react";
import { HeaderComponent } from "./HeaderComponent";
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { PrevTaskContext, RowsDataContext } from '../GlobalObjects/PrevTasksContext';
import { Link } from "react-router-dom";


export function Activity() {

    // global object access
    const { prevTasks } = useContext(PrevTaskContext);
    const { allRows } = useContext(RowsDataContext);

    function getAllPendingTasksCount() {
        let count = 0
        allRows.forEach(row => {
            if (row.completed === 'In Progress') {
                count++;
            }
        });
        return count;
    }

    function getAllCompletedTasksCount() {
        let count = 0
        prevTasks.forEach(row => {
            if (row.completed === 'Completed') {
                count++;
            }
        });
        return count;
    }

    function getProductivityScore() {
        const totalTasksCount = allRows.length + prevTasks.length;
        return Math.ceil((getAllCompletedTasksCount() / totalTasksCount) * 100);
    }

    return (
        <>
            <HeaderComponent />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 4,
                    maxWidth: 900,
                    mx: 'auto',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome to Activity!
                </Typography>

                <Grid container style={{ justifyContent: 'center' }} spacing={4} sx={{ mt: 6 }}>
                    <Grid item xs={12} sm={4}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h5">Tasks Pending</Typography>
                            <Typography variant="h2" color="primary">{getAllPendingTasksCount()}</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h5">Tasks Completed</Typography>
                            <Typography variant="h2" color="success.main">{getAllCompletedTasksCount()}</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h5">Productivity Score</Typography>
                            <Typography variant="h2" color="secondary.main">{getProductivityScore() || 0}%</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 5 }}>
                    <Button variant="contained" color="primary" size="large">
                        <Link to="/taskleap" style={{ textDecoration: 'none', color: 'white' }}>View Tasks</Link>
                    </Button>
                </Box>
            </Box>
        </>
    );
}
