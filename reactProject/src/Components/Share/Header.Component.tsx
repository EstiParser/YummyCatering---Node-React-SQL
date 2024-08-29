import { Link, Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useUserContext } from '../../context/user.context';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#333',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    justifyContent: 'space-between',
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center',
}));

const LogoTypography = styled(Typography)(({ theme }) => ({
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.5rem',
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
    '&:hover': {
        backgroundColor: '#555',
    },
}));

const UserGreetingBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
}));

function Header() {
    const { user } = useUserContext();
    const [role, setRole] = useState<string | null>();
    const [token] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        if (user) {
            console.log(user);
            setRole(user.role);
        }
    }, [user]);

    const getGreeting = () => {
        const now = new Date();
        const hours = now.getHours();

        if (hours < 12) {
            return 'בוקר טוב';
        } else if (hours < 18) {
            return 'צהריים טובים';
        } else {
            return 'ערב טוב';
        }
    };

    return (
        <>
            <StyledAppBar position="fixed">
                <StyledToolbar>
                    <LogoTypography variant="h6" component="div">
                        Yummy Catering
                    </LogoTypography>
                    <UserGreetingBox>
                        {user.username ? `${user.username} - ${getGreeting()}` : 'משתמש לא מחובר'}
                    </UserGreetingBox>
                    <Box>
                        {role === 'user' && token && (
                            <>
                                <NavButton component={Link} to="/login">מנהל מערכת👈🏼</NavButton>
                                <NavButton component={Link} to="/usernotes">הערות</NavButton>
                                <NavButton component={Link} to="/addOrder">הוספת הזמנה</NavButton>
                                <NavButton component={Link} to="/home">דף הבית</NavButton>

                            </>
                        )}
                        {role === 'admin' && token && (
                            <>
                                <NavButton component={Link} to="/notes">הערות</NavButton>
                                <NavButton component={Link} to="/orders">כל ההזמנות</NavButton>
                                <NavButton component={Link} to="/users">משתמשים</NavButton>
                                <NavButton component={Link} to="/sendEmail">שליחת מייל</NavButton>
                                <NavButton component={Link} to="/adminHome">דף הבית</NavButton>
                            </>
                        )}
                    </Box>
                </StyledToolbar>
            </StyledAppBar>
            <Box sx={{ p: 2, pt: 10 }}>
                <Outlet />
            </Box>
        </>
    );
}

export default Header;