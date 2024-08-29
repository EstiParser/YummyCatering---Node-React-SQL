import { createBrowserRouter } from 'react-router-dom';
import Home from './Components/User/home.Components';
import Login from './Components/Share/login.Components';
import AddOrder from './Components/User/addOrder.Component';
import AdminHome from './Components/Admin/home.Components';
import Header from './Components/Share/Header.Component';
import { UserProvider } from './context/user.context';
import Notes from './Components/Admin/notes.Component';
import UserNotes from './Components/User/notes.Components';
import Orders from './Components/Admin/orders.Components';
import Users from './Components/Admin/users.components';
import SendEmail from './Components/Admin/sendEmail.Component';
import Register from './Components/Share/register.Componenj';
const Root = () => (
  <UserProvider>
    <Header />
  </UserProvider>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/addOrder',
        element: <AddOrder />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/adminHome',
        element: <AdminHome />,
      },
      {
        path: '/notes',
        element: <Notes />,
      },
      {
        path: '/usernotes',
        element: <UserNotes />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/adminHome',
        element: <AdminHome />,
      },
      {
        path: '/sendEmail',
        element: <SendEmail />,
      }
      ,
      {
        path: '/register',
        element: <Register />,
      }
    ],
  },
  {
    path: '*',
    element: <div style={{ color: 'red' }}>404 - Page not found</div>,
  },
]);