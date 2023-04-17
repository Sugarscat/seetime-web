import {lazy} from "react";
import Home from "../pages/home";
import Login from "../pages/login";

const Tasks = lazy(()=>import( "../components/el_tasks"))

const routers = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/',
        element: <Home/>,
        children: [
            {
                path: '',
                element: '',
            },
            {
                path: 'tasks',
                element: <Tasks/>,
            },
            {
                path: 'market',
                element: '',
            },
            {
                path: 'tasks',
                element: '',
            },
            {
                path: 'me',
                element: '',
            },
            {
                path: 'users',
                element: '',
            },
            {
                path: 'about',
                element: '',
            },
        ]
    }
]

export default routers
