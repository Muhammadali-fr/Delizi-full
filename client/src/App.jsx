import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import { UserContextProvider } from "./userContext.jsx"

// layouts 
import MainLayout from './layout/MainLayout';

// pages 
import Home from './pages/Home';
import Cart from './pages/Cart';
import AddFood from './pages/AddFood';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import Logout from './pages/Logout';
import Admin from './pages/Admin';

axios.defaults.baseURL = "http://localhost:5000/"
axios.defaults.withCredentials = true;


const App = () => {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/cart',
          element: <Cart />
        },
        {
          path: '/add',
          element: <AddFood />
        },
        {
          path: '/logout',
          element: <Logout />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/sign-up',
      element: <Signup />
    },
    {
      path: "/admin",
      element: <Admin />
    },
    {
      path: '/*',
      element: <PageNotFound />
    }
  ])


  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  )
}

export default App