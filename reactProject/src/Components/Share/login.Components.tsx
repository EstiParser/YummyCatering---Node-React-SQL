import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/user.context';
import axios from 'axios';
import { Avatar, Button, CssBaseline, TextField, Link, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#555' },
        secondary: { main: '#333' },
    },
});

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [recipientEmail, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const { setUser } = useUserContext();

    useEffect(() => {
        const fetchPhone = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:3001/users/get/${recipientEmail}`, {
                    headers: {
                        'authorization': token,
                    }
                });
            
                if (response && response.data) {
                    setPhone(response.data.phone);
                }
                if(response.data.name !== username){
                    alert('שם משתמש שגוי');
                    return;
                }
            } catch (error) {
                console.error('Error fetching phone number:', error);
            }
            
            
        };

        if (recipientEmail) {
            fetchPhone();
        }
    }, [recipientEmail]);

    const generateRandomPassword = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const sendEmail = async () => {
        const newPassword = generateRandomPassword();
        setPassword(newPassword);

        try {
            await axios.post('http://localhost:3001/api/send', {
                recipientEmail,
                emailTitle: "שינוי סיסמה",
                messageBody: `הסיסמה החדשה שלך היא: ${newPassword}`
            });

            await axios.put(`http://localhost:3001/users/update/${recipientEmail}`, { password: newPassword });
            alert('המייל נשלח בהצלחה!');
        } catch (error) {
            console.error('Failed to send email:', error);
            alert('מייל שגוי!');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                username,
                password,
                recipientEmail
            });
            console.log(response);
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.userRole);
            setUser({ username, email: recipientEmail, phone, role: response.data.userRole });

            if (response.data.userRole === 'user') {
                navigate('/home');
            } else {
                navigate('/adminHome');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('שגיאה בכניסה למערכת');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{marginLeft:'95%'}}>
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            InputLabelProps={{ shrink: true }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            InputLabelProps={{ shrink: true }}
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={recipientEmail}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Button onClick={sendEmail} fullWidth variant="outlined">
                            Forgot password?
                        </Button>
                        <Link href="http://localhost:5173/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;