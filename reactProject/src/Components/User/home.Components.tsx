import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Grid, CircularProgress, Box } from '@mui/material';
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

function Home() {
  const [, setResponse] = useState(null);
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenn = localStorage.getItem('token');
    if (!tokenn) {
      console.error('No token found');
      setLoading(false);
      return;
    }
    setToken(tokenn);
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!token) return;

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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',marginLeft:"10%" }}>
        <CircularProgress />
      </Box>
    );
  }

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
    </ThemeProvider>
  );
}

export default Home;