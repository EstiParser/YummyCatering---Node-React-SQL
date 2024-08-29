import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Grid, CircularProgress, Box, Dialog, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

function AdminHome() {
    const [response, setResponse] = useState(null);
    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            setToken(localStorage.getItem('token'));
            if (!token) {
                console.error('No token found');
                setLoading(false);
                return;
            }

            try {
                const { data } = await axios.get('http://localhost:3001/business/get', {
                    headers: {
                        authorization: token
                    }
                });

                if (data && data.length > 0) {
                    setAddress(data[0].address);
                    setEmail(data[0].email);
                    setName(data[0].businessName);
                    setPhone(data[0].businessPhone);
                }
                setResponse(data);
            } catch (error) {
                console.error('Error fetching business details', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [token]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const editDetails = () => {
        setUpdate(true);
    };

    const handleClose = () => {
        setUpdate(false);
    };

    const handleSave = async () => {
        const data = {
            name: name,
            address: address,
            email: email,
            phone: phone
        };

        try {
            await axios.put('http://localhost:3001/business/update', data, {
                headers: {
                    authorization: token
                }
            });
        } catch (error) {
            console.error('Error updating business details', error);
        }
        setUpdate(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: theme.palette.background.default
                }}
            >
                <Container maxWidth="md" sx={{ paddingY: 4 }}>
                    <Grid container spacing={3} justifyContent="center" marginLeft={'30%'}>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent >
                                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <BusinessIcon sx={{ marginRight: 1 }} /> שם הקיטריינג
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {name || 'N/A'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <PhoneIcon sx={{ marginRight: 1 }} /> פלאפון ליצירת קשר
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {phone || 'N/A'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <EmailIcon sx={{ marginRight: 1 }} /> אימייל ליצירת קשר
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {email || 'N/A'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LocationOnIcon sx={{ marginRight: 1 }} /> כתובתינו
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {address || 'N/A'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Button onClick={editDetails} sx={{ marginLeft: '75%', color: 'black' }}>עידכון</Button>
            <Dialog open={update} onClose={handleClose}>
                <DialogContent>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="שם העסק"
                        type="name"
                        InputLabelProps={{ shrink: true }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="כתובת"
                        type="address"
                        InputLabelProps={{ shrink: true }}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="אימייל"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="פלאפון"
                        type="number"
                        multiline
                        rows={4}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">סגור</Button>
                    <Button onClick={handleSave} color="primary">שמור</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}

export default AdminHome;