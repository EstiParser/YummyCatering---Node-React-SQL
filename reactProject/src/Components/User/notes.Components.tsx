import { Button, Dialog, DialogContent, TextField, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../../context/user.context';

function Notes() {
    const {user} = useUserContext();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [notes, setNotes] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/home');
    }

    const handleButtonSendDetails = async () => {
        if (!userName || !email || !notes) {
            setResponseMessage("נא למלא את כל השדות הנדרשים");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('משתמש לא מורשה')
            return;
        }
        if(email == user.email ){
            try {
                await axios.post('http://localhost:3001/notes/add', {
                    userName,
                    email,
                    notes
                }, {
                    headers: {
                        authorization: token
                    }
                });
                setResponseMessage("!הטופס נשלח בהצלחה");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                handleClose();
                navigate('/home');
            } catch (error) {
                console.error('Failed to send details:', error);
                setResponseMessage("!אירעה שגיאה בשליחה");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        }else{
            alert('משתמש לא מחובר למערכת')
        }
    };

    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogContent>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="userName"
                    label="שם משתמש"
                    name="userName"
                    value={user.username}
                    sx={{ mb: 2 }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="אימייל"
                    name="email"
                    autoComplete="email"
                    value={user.email}
                    sx={{ mb: 2 }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="notes"
                    label="הערות"
                    name="notes"
                    autoComplete="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button onClick={handleClose} color="primary">
                    ביטול
                </Button>
                <Button onClick={handleButtonSendDetails} variant="contained" color="primary">
                    שלח פרטים
                </Button>
            </DialogContent>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {responseMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    );
}

export default Notes;