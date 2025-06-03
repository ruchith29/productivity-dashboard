import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../Styles/addTask.css";


export function InputForm({ appendTask }) {
    const [description, setDescription] = useState("");

    function addTask(description, appendTask) {
        appendTask(description);
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
                    onChange={(event) => {
                        setDescription(event.target.value)

                    }}
                />
                <Button onClick={() => { addTask(description, appendTask) }} variant="contained" color="success"> Add Task </Button>
            </div>
        </Box>
    );
}