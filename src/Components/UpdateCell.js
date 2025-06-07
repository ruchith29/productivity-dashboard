import Button from '@mui/material/Button';
import React, { useContext, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import DoneIcon from '@mui/icons-material/Done';
import { PrevTaskContext, RowsDataContext } from '../GlobalObjects/PrevTasksContext';
import '../Styles/UpdateCell.css';
import { getTimeDifferenceInHours, getCurrentTime } from '../Utils/utils.js';
import { Typography } from "@mui/material";
import completedVideo from '../assets/174153-850740070_small.mp4'




function PaperComponent(props) {

    const nodeRef = React.useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} ref={nodeRef} />
        </Draggable>
    );
}

export function UpdatedCellDialog(props) {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState('');
    const [status, setStatus] = useState('');
    const { allRows, setAllRows, deleteRow } = useContext(RowsDataContext);
    const { addPrevTask } = useContext(PrevTaskContext);

    // const navigate = useNavigate();
    const [playVideo, setPlayVideo] = useState(false);


    const handleClickOpen = () => {
        setStatus(props.row.completed || '');
        setComments(props.row.comments || '');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function completeTask(updateId) {
        const updatedRows = []
        allRows.filter((row) => {
            if (row.id === updateId) {
                row.endDate = getCurrentTime();
                row.workingHours = getTimeDifferenceInHours(row.inProgressDate, row.endDate);
                const updatedRow = { ...row, completed: "Completed" };
                // add to history
                addPrevTask(updatedRow);
                deleteRow(updatedRow.id);
                return false;
            }
            return true;
        });
        setAllRows(updatedRows);
    }


    const handleSave = (e, row) => {
        e.preventDefault();
        // check if added comments or not
        if (status === 'Blocked' && !comments.trim()) {
            alert("Please add comments to track");
            return;
        }
        if (status === 'Completed') {
            completeTask(row.id);
            setPlayVideo(true);
            setTimeout(() => {
                setPlayVideo(false);
            }, 5000);
        }

        if (status === 'In Progress') {
            row.inProgressDate = getCurrentTime();
        }


        const updatedRows = allRows.map(item =>
            item.id === row.id
                ? { ...item, completed: status, comments }
                : item
        );
        setAllRows(() => updatedRows);
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog open={playVideo} maxWidth="sm" fullWidth>
                <DialogTitle>
                    🎉 Congratulations!
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body1" gutterBottom>
                        You've completed a big step.
                    </Typography>
                    <video
                        autoPlay
                        muted
                        style={{ width: '100%', borderRadius: 8 }}
                    >
                        <source src={completedVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </DialogContent>
            </Dialog>
            <Button variant="outlined" onClick={handleClickOpen}>
                <DoneIcon />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Task Progress Update
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here's the latest status and what's happening next with this task.
                    </DialogContentText>
                    <DialogContentText>
                        Priority Type: {props.row.priority}
                    </DialogContentText>
                    <div className='task-related-information'>
                        <div className='button-row'>
                            <Button
                                color="secondary"
                                variant={status === 'In Progress' ? 'contained' : 'outlined'}
                                onClick={() => setStatus('In Progress')}
                            >
                                In Progress
                            </Button>
                            <Button
                                color="secondary"
                                variant={status === 'Blocked' ? 'contained' : 'outlined'}
                                onClick={() => setStatus('Blocked')}
                            >
                                Blocked
                            </Button>
                            <Button
                                color="secondary"
                                variant={status === 'Completed' ? 'contained' : 'outlined'}
                                onClick={() => setStatus('Completed')}
                            >
                                Completed
                            </Button>
                        </div>

                        <div className='comments-row'>
                            <label htmlFor="comments-input">Comments</label>
                            <input
                                id="comments-input"
                                type='text'
                                name='comments'
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={(event) => handleSave(event, props.row)}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}