import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import {
    Card, CardContent, Typography, Container, Grid, Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Slide, TextField, Snackbar, Alert, MenuItem, Select
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import { useUserContext } from '../../context/user.context';

const CustomTypography = styled(Typography)(() => ({
    fontFamily: 'Arial, sans-serif',
    fontSize: '1rem',
    lineHeight: 1.5,
    color: '#7B7803',
    textAlign: 'left',
}));

const CustomCard = styled(Card)(() => ({
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    marginBottom: '1rem',
    padding: '1rem',
    maxWidth: 'fit-content',
}));

const CustomButton = styled(Button)(() => ({
    backgroundColor: '#333',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#7B7803',
    },
    fontWeight: 'bold',
}));

const ListItem = styled('li')(() => ({
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    textAlign: 'right',
}));

const ListText = styled('span')(() => ({
    display: 'inline',
    marginRight: '0.5em',
}));

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddOrder() {
    const [response, setResponse] = useState<any>(null);
    const [orderDate, setDateOrder] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [serviceType, setEventType] = useState<string>('');
    const [notes, setNote] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [email, setEmail] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [exists, setExists] = useState<boolean>(false);

    const [responseAddOrder, setResponseAddOrder] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const { user } = useUserContext();
    const serviceTypes = ["wedding", "Bar Mitzvah", "engagement", "Bat mitzva", "alliance"];

    useEffect(() => {
        setEmail(user.email);
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const result = await axios.get('http://localhost:3001/service/get', {
                    headers: {
                        authorization: token
                    }
                });
                setResponse(result.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setResponse(null);
            }
        };
        fetchData();

        const checkExistingOrder = async () => {
            try {
                const token = localStorage.getItem('token');
                const orders = await axios.get(`http://localhost:3001/order/get/${user.email}`, {
                    headers: {
                        authorization: token
                    }
                });
                const orderExists = orders.data.some((o: any) => o.email === user.email);
                setExists(orderExists);
            } catch (error) {
                console.error('Failed to check existing orders:', error);
            }
        };
        checkExistingOrder();
    }, [user.email]);

    const handleButtonClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validateForm = (): boolean => {
        if (!orderDate || !time || !serviceType ) {
            setResponseAddOrder("!נא למלא את כל השדות הנדרשים");
            setSnackbarOpen(true);
            return false;
        }
        if (!serviceTypes.includes(serviceType)) {
            setResponseAddOrder("!סוג השירות שהוזן אינו חוקי");
            setSnackbarOpen(true);
            return false;
        }
        return true;
    };

    const handleButtonSendDetails = async () => {
        if (exists) {
            alert('קיימת הזמנה על שם זה, לשינוי ההזמנה נא כתבו לנו בהערות ונשתדל לחזור אליכם');
            return;
        }

        if (!validateForm()) return;

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        const formData = new FormData();
        formData.append('orderDate', orderDate);
        formData.append('time', time);
        formData.append('serviceType', serviceType);
        formData.append('email', email);
        formData.append('notes', notes);
        if (file) {
            formData.append('file', file);
        }

        try {
            await axios.post('http://localhost:3001/order/add', formData, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResponseAddOrder("!הטופס נשלח בהצלחה");
            setSnackbarOpen(true);
            handleClose();
        } catch (error) {
            console.error('Failed to send details:', error);
            setResponseAddOrder("!אירעה שגיאה בשליחה");
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container>
            {response ? (
                <div>
                    <div style={{
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: 1.6,
                        color: '#333',
                        maxWidth: '800px',
                        margin: '20px auto',
                        padding: '20px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '10px',
                        textAlign: 'right'
                    }}>
                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', color: '#7B7803', fontFamily: 'Arial, sans-serif' }}>
                            ?איך מבצעים הזמנה
                        </Typography>
                        <ol style={{
                            paddingLeft: '0',
                            marginRight: '1rem',
                            textAlign: 'right',
                            listStyleType: 'none'
                        }}>
                            {[
                                ".הורדת טופס ההזמנה: ראשית, יש להוריד את טופס ההזמנה המצורף בקישור המתאים לשירות בו אתם מעוניננים",
                                ".מילוי הטופס: לאחר שהורדתם את הטופס, עקיפו בעיגול את השירותים המבוקשים ומלאו את כל הפרטים הנדרשים",
                                ".העלאת הטופס והזנת פרטי ההזמנה: חזרו לאתר ולחצו על הכפתור 'מלא פרטים ותאריך אירוע'. לאחר מכן, תתבקשו להזין את פרטי ההזמנה שלכם (תאריך, שעה, סוג אירוע, טלפון וכו'). בשלב זה, תעלו את הטופס שמילאתם באמצעות השדה המתאים להעלאת קבצים",
                                ".שליחה וקבלת אישור: לאחר השלמת כל הפרטים והעלאת הטופס, לחצו על הכפתור 'שלח פרטים' כדי לשלוח את ההזמנה שלכם. נציג/ה שלנו יחזור/תחזור אליכם בהקדם האפשרי כדי לאשר את ההזמנה ולתאם פרטים נוספים"
                            ].map((text, index) => (
                                <ListItem key={index}>
                                    <ListText>{text}</ListText>
                                </ListItem>
                            ))}
                        </ol>
                    </div>
                    <Grid container spacing={4}>
                        {response.map((element: any, index: number) => (
                            <Grid item key={index} xs={12} sm={6} md={3}>
                                <CustomCard>
                                    <CardContent>
                                        <CustomTypography variant="h5" component="div" sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
                                            {element.serviceName}
                                        </CustomTypography>
                                        <CustomTypography variant="body2" sx={{ textAlign: 'right', color: "black" }}>
                                            {element.description.split('\n').map((line: string, index: number) => (
                                                <React.Fragment key={index}>
                                                    {line}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                        </CustomTypography>
                                        <CustomTypography variant="body2" sx={{ mt: 2, fontWeight: 'bold', textAlign: 'right' }}>
                                            מחיר: {element.price} ₪
                                        </CustomTypography>

                                        <a href={`../../../src/assets/${element.serviceName}.png`} download>
                                            <CustomButton
                                                startIcon={<DownloadIcon />}
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                sx={{ mt: 2 }}
                                            >
                                                הורד קובץ
                                            </CustomButton>
                                        </a>
                                    </CardContent>
                                </CustomCard>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : (
                <Typography variant="h6" sx={{ textAlign: 'center', color: '#7B7803' }}>
                    טוען נתונים...
                </Typography>
            )}

            <Button variant="contained" color="primary" onClick={handleButtonClick} fullWidth sx={{
                backgroundColor: '#7B7803',
                '&:hover': {
                    backgroundColor: 'black',
                },
                color: 'white',
                borderColor: 'black',
            }}>
                מלא פרטים ותאריך אירוע
            </Button>

            <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
                <DialogTitle>הזן פרטים</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="תאריך"
                        type="date"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={orderDate}
                        onChange={(e) => setDateOrder(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="שעה"
                        type="time"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <Select
                        value={serviceType}
                        onChange={(e) => setEventType(e.target.value)}
                        fullWidth
                        label="סוג האירוע"
                        margin="dense"
                        variant="outlined"
                    >
                        {serviceTypes.map((type, index) => (
                            <MenuItem key={index} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        margin="dense"
                        label="טלפון"
                        type="tel"
                        fullWidth
                        variant="outlined"
                        value={user.phone}
                    />
                    <TextField
                        margin="dense"
                        label="אימייל"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="הערות"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        value={notes}
                        onChange={(e) => setNote(e.target.value)}
                    />
                    <input
                        accept=".pdf, .doc, .docx, .png"
                        style={{ display: 'none' }}
                        id="file-upload"
                        type="file"
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    />
                    <label htmlFor="file-upload">
                        <Button variant="contained" color="primary" component="span">
                            {file ? file.name : 'בחר קובץ'}
                        </Button>
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>בטל</Button>
                    <Button onClick={handleButtonSendDetails}>שלח פרטים</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={responseAddOrder?.includes('שגיאה') ? 'error' : 'success'}>
                    {responseAddOrder}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default AddOrder;
