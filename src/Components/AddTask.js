import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../Styles/addTask.css";


export function InputForm({ appendTask }) {
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");


    function addTask(task, appendTask) {
        appendTask(task);
    }

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <div className='form-container'>
                <span>Add Tasks</span>

                <label htmlFor='outlined-textarea'>Please add task description</label>
                <TextField
                    id="outlined-textarea"
                    label="Task Description"
                    placeholder=""
                    multiline
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value)

                    }}
                    style={{ width: '800px' }}
                />
                <div className='task-priority'>
                    <p>Assign a priority to receive relevant updates and reminders.**</p>
                    <label>
                        <input type='radio' name='priority' value='high' onClick={() => setPriority("high")} />
                        High Priority
                    </label>
                    <label>
                        <input type='radio' name='priority' value='medium' onClick={() => setPriority("medium")} />
                        Medium Priority
                    </label>
                    <label>
                        <input type='radio' name='priority' value='low' onClick={() => setPriority("low")} />
                        Low Priority
                    </label>
                </div>
                <Button onClick={() => {
                    const task = { description: description, priority: priority }
                    addTask(task, appendTask)
                    setDescription('');
                }}
                    variant="contained" color="success"> Add Task </Button>
            </div>
        </Box>
    );
}