import { useState } from 'react';
import { TextField, Button, Typography, Grid, Container, InputLabel, MenuItem, Select, FormControl } from '@mui/material';
import axios from 'axios';

function SendEmail() {
    const [orderDate, setOrderDate] = useState('');
    const [time, setTime] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');

    const serviceTypes = ["wedding", "Bar Mitzvah", "engagement", "Bat mitzva", "alliance"];

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailBody = `
            <h1>פרטי ההזמנה</h1>
            <p><strong>תאריך הזמנה:</strong> ${orderDate}</p>
            <p><strong>שעה:</strong> ${time}</p>
            <p><strong>סוג שירות:</strong> ${serviceType}</p>
            <p><strong>טלפון:</strong> ${phone}</p>
            <p><strong>הערות:</strong> ${notes}</p>
        `;

        try {
            await axios.post('http://localhost:3001/api/send', {
                recipientEmail,
                emailTitle: "אנא אשר את טופס ההזמנה דרך תיבת ההודעות באתר שלנו",
                messageBody: emailBody
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('המייל נשלח בהצלחה!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('שגיאה בשליחת המייל');
        }
    };

    return (
        <Container>
            <Typography
                variant="h6"
                gutterBottom
                sx={{ textAlign: 'center', color: '#7B7803', fontFamily: 'Arial, sans-serif', marginTop: 4 ,marginLeft:'20%'}}
            >
                שליחת מייל לאישור הזמנה
            </Typography>
            <form onSubmit={handleSubmit} >
                <Grid container spacing={2} sx={{marginLeft:'10%'}}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            id="recipientEmail"
                            label="כתובת האימייל של הלקוח"
                            fullWidth
                            variant="outlined"
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            id="orderDate"
                            label="תאריך הזמנה"
                            type="date"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            value={orderDate}
                            onChange={(e) => setOrderDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            id="time"
                            label="שעה"
                            type="time"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="serviceTypeLabel">סוג שירות</InputLabel>
                            <Select
                                labelId="serviceTypeLabel"
                                id="serviceType"
                                value={serviceType}
                                onChange={(e) => setServiceType(e.target.value)}
                                label="סוג שירות"
                            >
                                {serviceTypes.map((type, index) => (
                                    <MenuItem key={index} value={type}>{type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            id="phone"
                            label="טלפון"
                            fullWidth
                            variant="outlined"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            id="notes"
                            label="תפריט"
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button sx={{marginLeft:'55%',backgroundColor:"#7B7803" ,":hover":{backgroundColor:'black'}}}
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '16px' }}
                >
                    שלח פרטים
                </Button>
            </form>
        </Container>
    );
}

export default SendEmail;