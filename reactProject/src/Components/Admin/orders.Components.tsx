import { Card, CardContent, Grid, Typography, IconButton, Button, TextField, InputAdornment, Dialog, DialogContent, DialogActions } from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import SortIcon from '@mui/icons-material/Sort';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { useEffect, useState } from "react";

const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        borderRadius: "25px",
        backgroundColor: "#f0f0f0",
        padding: "10px 15px",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        },
        "&.Mui-focused": {
            backgroundColor: "#e0e0e0",
        },
    },
    "& .MuiInputAdornment-positionStart": {
        marginLeft: "8px",
    },
    "& .MuiInputLabel-root": {
        color: "#666",
        fontSize: "16px",
        fontWeight: "bold",
        transform: "translate(14px, 14px) scale(1)",
        transition: "all 0.2s ease-in-out",
        "&.Mui-focused": {
            color: "#333",
            transform: "translate(14px, -6px) scale(0.75)",
        },
    },
});

const StyledButton = styled(Button)({
    backgroundColor: '#7B7803',
    color: '#fff',
    borderRadius: '25px',
    padding: '10px 20px',
    '&:hover': {
        backgroundColor: '#6b6a01',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    },
    margin: '0 5px',
});

const StyledIconButton = styled(IconButton)({
    color: '#7B7803',
    '&:hover': {
        color: '#555',
    },
    padding: '10px',
});

const StyledCard = styled(Card)({
    backgroundColor: '#fff',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
    borderRadius: '10px',
    marginBottom: '20px',
});

function Orders() {
    const [orders, setOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const [searchPhone, setSearchPhone] = useState('');
    const [update, setUpdate] = useState(false);
    const [orderToUpdate, setOrderToUpdate] = useState(null);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const result = await axios.get('http://localhost:3001/order/get', {
                    headers: {
                        authorization: token
                    }
                });
                setOrders(result.data);
                setAllOrders(result.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        getOrders();
    }, [token]);

    const handleDeleteOrder = async (phone) => {
        try {
            await axios.delete(`http://localhost:3001/order/delete/${phone}`, {
                headers: {
                    authorization: token
                },
            });
            setOrders(orders.filter(order => order.phone !== phone));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const sortByDate = () => {
        const sortedOrders = [...orders].sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
        setOrders(sortedOrders);
    };

    const showAllOrders = () => {
        setOrders(allOrders);
        setSearchPhone('');
    };

    const handleSearchPhone = () => {
        const searchedOrders = allOrders.filter(order => order.phone === searchPhone);
        if (searchedOrders.length > 0) {
            setOrders(searchedOrders);
        } else {
            alert('אין הזמנות התואמות לחיפוש');
            setSearchPhone('');
        }
    };

    const handleEdit = (order) => {
        setOrderToUpdate(order);
        setUpdate(true);
    };

    const handleClose = () => {
        setUpdate(false);
        setOrderToUpdate(null);
    };

    const handleSave = async () => {
        try {
            const updatedData = {
                orderDate: orderToUpdate.orderDate,
                time: orderToUpdate.time,
                serviceType: orderToUpdate.serviceType,
                phone: orderToUpdate.phone,
                email: orderToUpdate.email,
                notes: orderToUpdate.notes
            };

            await axios.put(`http://localhost:3001/order/update/${orderToUpdate.phone}`, updatedData, {
                headers: {
                    authorization: token
                },
            });
            setOrders(orders.map(order => order.phone === orderToUpdate.phone ? { ...order, ...updatedData } : order));
            handleClose();
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    return (
        <>
            <Grid container spacing={3} style={{ padding: '20px', backgroundColor: '#fff', direction: 'rtl' }}>
                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <StyledButton
                        startIcon={<SortIcon />}
                        onClick={sortByDate}
                    >
                        מיון לפי תאריך
                    </StyledButton>
                    <StyledButton
                        onClick={showAllOrders}
                    >
                        להצגת כל ההזמנות
                    </StyledButton>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <StyledTextField
                            label="חיפוש לפי פלאפון"
                            variant="outlined"
                            value={searchPhone}
                            onChange={(e) => setSearchPhone(e.target.value)}
                            style={{ marginBottom: '20px', width: '300px' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon style={{ color: "#666" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <StyledButton onClick={handleSearchPhone} style={{ marginLeft: '10px'}}>
                            חיפוש
                        </StyledButton>
                    </div>
                </Grid>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <Grid item xs={12} md={4} key={order._id}>
                            <StyledCard variant="outlined">
                                <CardContent>
                                    <Typography variant="body1" color="text.secondary" align="right">
                                        <strong>תאריך האירוע:</strong> {new Date(order.orderDate).toLocaleDateString('en-GB')}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" align="right">
                                        <strong>שעת האירוע:</strong> {order.time}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" align="right">
                                        <strong>סוג האירוע:</strong> {order.serviceType}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" align="right">
                                        <strong>פלאפון הלקוח:</strong> {order.phone}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" align="right">
                                        <strong>אימייל:</strong> {order.email}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" align="right">
                                        <strong>הערות:</strong> {order.notes}
                                    </Typography>
                                    {order.file && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                            <img
                                                src={`http://localhost:3001/uploads/${order.file.split('/').pop()}`}
                                                alt="Order"
                                                style={{ maxWidth: '70%', height: 'auto', borderRadius: '8px' }}
                                            />
                                        </div>
                                    )}
                                    {order.file && (
                                        <a
                                            href={`http://localhost:3001/uploads/${order.file.split('/').pop()}`}
                                            style={{ display: 'block', marginTop: '10px', textAlign: 'left', color: '#7B7803' }}
                                        >
                                            👉🏼לפתיחת התמונה בדפדפן
                                        </a>
                                    )}

                                    <StyledIconButton
                                        onClick={() => handleDeleteOrder(order.phone)}
                                        style={{ marginTop: '10px' }}
                                    >
                                        <DeleteIcon color="error" />
                                    </StyledIconButton>

                                    <StyledIconButton
                                        onClick={() => handleEdit(order)}
                                        style={{ marginTop: '10px' }}
                                    >
                                        <EditIcon color="primary" />
                                    </StyledIconButton>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" align="right">
                        אין הזמנות תואמות
                    </Typography>
                )}
            </Grid>

            {update && (
                <Dialog open={update} onClose={handleClose}>
                    <DialogContent>
                        <Typography variant="h6" gutterBottom align="right">
                            עריכת הזמנה
                        </Typography>
                        <TextField
                            label="תאריך"
                            type="date"
                            fullWidth
                            value={orderToUpdate.orderDate}
                            onChange={(e) => setOrderToUpdate({ ...orderToUpdate, orderDate: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                            style={{ marginBottom: '15px' }}
                            dir="rtl"
                        />
                        <TextField
                            label="שעה"
                            type="time"
                            fullWidth
                            value={orderToUpdate.time}
                            onChange={(e) => setOrderToUpdate({ ...orderToUpdate, time: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                            style={{ marginBottom: '15px' }}
                            dir="rtl"
                        />
                        <TextField
                            label="סוג אירוע"
                            fullWidth
                            value={orderToUpdate.serviceType}
                            onChange={(e) => setOrderToUpdate({ ...orderToUpdate, serviceType: e.target.value })}
                            style={{ marginBottom: '15px' }}
                            dir="rtl"
                        />
                        <TextField
                            label="פלאפון"
                            fullWidth
                            disabled
                            value={orderToUpdate.phone}
                            onChange={(e) => setOrderToUpdate({ ...orderToUpdate, phone: e.target.value })}
                            style={{ marginBottom: '15px' }}
                            dir="rtl"
                        />
                        <TextField
                            label="אימייל"
                            fullWidth
                            disabled
                            value={orderToUpdate.email}
                            onChange={(e) => setOrderToUpdate({ ...orderToUpdate, email: e.target.value })}
                            style={{ marginBottom: '15px' }}
                            dir="rtl"
                        />
                        <TextField
                            label="הערות"
                            multiline
                            rows={4}
                            fullWidth
                            value={orderToUpdate.notes}
                            onChange={(e) => setOrderToUpdate({ ...orderToUpdate, notes: e.target.value })}
                            style={{ marginBottom: '15px' }}
                            dir="rtl"
                        />
                    </DialogContent>
                    <DialogActions>
                        <StyledButton onClick={handleSave}>שמור</StyledButton>
                        <StyledButton onClick={handleClose}>סגור</StyledButton>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}

export default Orders;