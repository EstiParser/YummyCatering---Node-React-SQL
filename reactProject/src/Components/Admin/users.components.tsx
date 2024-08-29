import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// עיצוב מותאם לכרטיס
const StyledCard = styled(Card)({
    backgroundColor: '#fff',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    padding: '20px',
    minHeight: '150px', // גובה מינימלי קטן יותר
    width: '300px', // רוחב רחב יותר
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // שומר על מרחק בין התוכן לכפתורים
    transition: 'all 0.3s ease',
    overflow: 'auto',
    textAlign: 'right', // כיוון הטקסט לימין
});

// עיצוב מותאם לכפתור אייקון
const StyledIconButton = styled(IconButton)({
    color: '#7B7803',
    '&:hover': {
        color: '#555',
    },
    padding: '10px',
});

// כפתור מחיקה מעוצב בצבע אדום
const DeleteButton = styled(StyledIconButton)({
    color: '#f44336',
});

// עיצוב מותאם לפופאפ
const StyledDialog = styled(Dialog)({
    '& .MuiDialogTitle-root': {
        backgroundColor: '#f5f5f5',
        color: '#333',
        textAlign: 'right', // כיוון כותרת הדיאלוג לימין
    },
    '& .MuiDialogContent-root': {
        padding: '20px',
        textAlign: 'right', // כיוון תוכן הדיאלוג לימין
    },
    '& .MuiDialogActions-root': {
        padding: '10px',
    },
});

const DialogActionsStyled = styled(DialogActions)({
    display: 'flex',
    justifyContent: 'flex-end',
});

function Users() {
    const [allCustomers, setAllCustomers] = useState([]);
    const [token, setToken] = useState('');
    const [setEditCustomer] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        const getAllCustomers = async () => {
            try {
                const result = await axios.get('http://localhost:3001/users/get', {
                    headers: {
                        authorization: token
                    }
                });
                setAllCustomers(result.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        if (token) {
            getAllCustomers();
        }
    }, [token]);

    const handleDeleteCustomer = async (email) => {
        try {
            await axios.delete(`http://localhost:3001/users/delete/${email}`, {
                headers: {
                    authorization: token
                }
            });
            setAllCustomers(allCustomers.filter((customer) => customer.email !== email));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleEdit = (customer) => {
        setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            role: customer.role
        });
        setIsEditing(true);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3001/users/updateDetails/${formData.email}`, formData, {
                headers: {
                    authorization: token
                }
            });
            setAllCustomers(allCustomers.map(customer =>
                customer.email === formData.email ? formData : customer
            ));
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditCustomer(null);
    };

    return (
        <Grid container spacing={3} style={{ padding: '20px' }} justifyContent="center">
            {isEditing && (
                <StyledDialog open={isEditing} onClose={handleCancel}>
                    <DialogTitle>עריכת לקוח</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="שם"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            InputProps={{ style: { textAlign: 'right' } }}
                        />
                        <TextField
                            label="אימייל"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            disabled
                            InputProps={{ style: { textAlign: 'right' } }}
                        />
                        <TextField
                            label="פלאפון"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            InputProps={{ style: { textAlign: 'right' } }}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>תפקיד</InputLabel>
                            <Select
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                InputProps={{ style: { textAlign: 'right' } }}
                            >
                                <MenuItem value="admin">מנהל</MenuItem>
                                <MenuItem value="user">משתמש</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActionsStyled>
                        <Button onClick={handleCancel}>ביטול</Button>
                        <Button onClick={handleSave} color="primary">שמור</Button>
                    </DialogActionsStyled>
                </StyledDialog>
            )}
            {allCustomers.length > 0 ? (
                allCustomers.map(customer => (
                    <Grid item xs={12} sm={6} md={4} key={customer.user_id} container justifyContent="center">
                        <StyledCard>
                            <CardContent>
                                <Typography variant="h6" color="text.primary" align="right">
                                    <strong>שם:</strong> {customer.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" align="right">
                                    <strong>אימייל:</strong> {customer.email}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" align="right">
                                    <strong>פלאפון:</strong> {customer.phone}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" align="right">
                                    <strong>תפקיד:</strong> {customer.role}
                                </Typography>
                            </CardContent>
                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                                <StyledIconButton
                                    onClick={() => handleEdit(customer)}
                                >
                                    <EditIcon color="primary" />
                                </StyledIconButton>
                                <DeleteButton
                                    onClick={() => handleDeleteCustomer(customer.email)}
                                >
                                    <DeleteIcon />
                                </DeleteButton>
                            </div>
                        </StyledCard>
                    </Grid>
                ))
            ) : (
                <Typography variant="h6" align="center" style={{ width: '100%' }}>
                    אין לקוחות זמינים.
                </Typography>
            )}
        </Grid>
    );
}

export default Users;
