import { useNavigate } from "react-router-dom";
import { HeaderComponent } from "./HeaderComponent";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useState } from "react";
import introVideo from '../assets/63840-508272975_small.mp4'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export function Home() {
    const navigate = useNavigate();
    const [playVideo, setPlayVideo] = useState(false);

    const motivationalQuotes = [
        "Stay focused and never give up!",
        "Productivity is the key to success.",
        "Small steps every day lead to big results.",
        "Work smart, not just hard.",
        "Your future is created by what you do today."
    ];

    function getRandomQuote() {
        return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    }
    return (
        <>
            <HeaderComponent />

            <Box
                component="main"
                sx={{
                    mx: "auto", // horizontal center the box
                    px: 3,
                    py: 4,
                    fontFamily: "Arial, sans-serif",
                    color: "text.primary",
                    textAlign: "left",
                }}
            >
                <Dialog open={playVideo} maxWidth="sm" fullWidth>
                    <DialogTitle>
                        🚀 Buckle Up — Taskland Awaits!
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography variant="body1" gutterBottom>
                            You're prepped, you're ready, and now it's time for action— let's get started.
                        </Typography>
                        <video
                            autoPlay
                            muted
                            style={{ width: '100%', borderRadius: 8 }}
                        >
                            <source src={introVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </DialogContent>
                </Dialog>

                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome Ruchith!
                </Typography>

                <Typography variant="h6" color="text.secondary" gutterBottom>
                    {getRandomQuote()}
                </Typography>

                <Typography variant="body1" paragraph>
                    This dashboard is designed to help you organize your tasks, track progress, and boost your productivity.
                    Whether you’re managing personal projects or collaborating with a team, our tool keeps everything in one place so you can stay focused and motivated.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom mt={4} fontWeight={600} color="text.secondary">
                    Why Use This Dashboard?
                </Typography>

                <List disablePadding>
                    {[
                        { title: "Stay Organized:", desc: "Easily add, update, and prioritize your tasks." },
                        { title: "Track Progress:", desc: "Visualize your task status with clear indicators and get instant feedback." },
                        { title: "Manage Time:", desc: "Record start and end times to see how much time you spend on each task." },
                        { title: "Reflect & Improve:", desc: "Review completed tasks and analyze your workflow to optimize productivity." },
                        { title: "Get Motivated:", desc: "Receive fun and encouraging messages as you work through your list!" },
                    ].map(({ title, desc }, i, arr) => (
                        <Box key={title}>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemText
                                    primary={<Typography fontWeight="bold">{title}</Typography>}
                                    secondary={desc}
                                />
                            </ListItem>
                            {i !== arr.length - 1 && <Divider component="li" />}
                        </Box>
                    ))}
                </List>

                <Typography variant="h4" component="h2" gutterBottom mt={4} fontWeight={600} color="text.secondary">
                    How It Works
                </Typography>

                <Typography variant="body1" paragraph>
                    Add new tasks with priorities, update their status as you work, and keep track of comments or blockers.
                    Use the progress updates to keep your workflow transparent and identify what's next.
                    Completed tasks are archived for your review, so you can celebrate your achievements.
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom mt={4} fontWeight={600} color="text.secondary">
                    Get Started
                </Typography>

                <Typography variant="body1" paragraph>
                    Head over to the
                    {/* <Link style={{ textDecoration: 'none', fontSize: '1.5rem', color: '#132130', fontWeight: 'bold' }} to="/taskleap">Task List</Link>  */}
                    <a
                        href="/taskleap"
                        onClick={(e) => {
                            e.preventDefault();
                            setPlayVideo(true);
                            setTimeout(() => {
                                navigate("/taskleap");
                            }, 5000);
                        }}
                        style={{ textDecoration: 'none', fontSize: '1.5rem', color: '#132130', fontWeight: 'bold', paddingRight: '0.5rem' }}
                    >
                        Task List
                    </a>
                    to start adding your tasks and see your productivity soar.
                </Typography>

                <Box
                    component="footer"
                    sx={{
                        mt: 6,
                        fontSize: "0.9rem",
                        color: "text.disabled",
                        textAlign: "left",
                    }}
                >
                    Made with <Box component="span" sx={{ color: "error.main" }}>❤️</Box> to help you get things done ~Ruchith Keerala.
                </Box>
            </Box>
        </>
    );
}
