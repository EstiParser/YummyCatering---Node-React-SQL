import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Paper, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

// עיצוב הבועה
const MessageBubble = styled(Paper)(({ theme }) => ({
    padding: '16px',
    maxWidth: '80%',
    borderRadius: '16px',
    backgroundColor: '#e0f7fa',
    marginBottom: '10px',
}));

const UserName = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    fontWeight: 'bold',
}));

const UserEmail = styled(Typography)(({ theme }) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
}));

const Notes = () => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const result = await axios.get('http://localhost:3001/notes/get', {
                    headers: {
                        authorization: token
                    }
                });
                setResponse(result.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setError('Failed to fetch notes.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDeleteNote = async (note) => {
        if (!window.confirm('האם אתה בטוח שברצונך למחוק את ההערה?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.delete('http://localhost:3001/notes/delete', {
                headers: {
                    authorization: token
                },
                data: {
                    _id: note._id
                }
            });

            setResponse(response.filter(n => n._id !== note._id));
        } catch (error) {
            console.error('Failed to delete note:', error);
        }
    };

    if (loading) return <Typography variant="h6">Loading...</Typography>;
    if (error) return <Typography variant="h6" color="error">{error}</Typography>;

    return (
        <Container>
            <Grid container spacing={3}>
                {response.map((note) => (
                    <Grid item xs={12} sm={6} md={4} key={note._id}>
                        <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2}>
                            <UserName variant="h6" component="div">
                                {note.userName}
                            </UserName>
                            <UserEmail>
                                {note.email}
                            </UserEmail>
                            <MessageBubble>
                                <Typography variant="body2">
                                    {note.notes}
                                </Typography>
                                <IconButton onClick={() => handleDeleteNote(note)}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </MessageBubble>

                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Notes;