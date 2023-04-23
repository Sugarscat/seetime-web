import {lazy} from "react";
import Home from "../pages/home";
import Login from "../pages/login";

const Tasks = lazy(()=>import("../components/tasks"))
const Me = lazy(()=>import("../components/me"))

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
                path: 'me',
                element: <Me/>,
            },
            {
                path: 'users',
                element: '',
            },
        ]
    }
]

//根据路径获取路由
const checkAuth = (routers:any, path:String)=>{
    for (const data of routers) {
        if (data.path==path) return data
        if (data.children) {
            const res:any = checkAuth(data.children, path)
            if (res) return res
        }
    }
    return null
}

export default routers
