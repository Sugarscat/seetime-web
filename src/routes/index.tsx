import React, {lazy, ReactElement, Suspense, useEffect, useState} from "react";
import {Navigate, useRoutes} from "react-router-dom";
import cookie from "react-cookies";
import {$message} from "../elements/Message";
import {Loading} from "../elements/Loading";

const Login = lazy(()=>import("../pages/login"))
const Home = lazy(()=>import("../pages/home"))
const Tasks = lazy(() => import("../components/tasks"))
const Me = lazy(() => import("../components/me"))
const Users = lazy(()=>import("../components/users"))
const User = lazy(()=>import("../elements/User/UsersList"));
const UsersUpdate = lazy(()=>import("../elements/User/UsersUpdate"))

const mainUrl = process.env.REACT_APP_API_URL;

interface PrivateRouteProps {
    element: ReactElement;
    [key: string]: any;
}

const PrivateRoute = ({ element, ...rest }: PrivateRouteProps) => {
    const [isPass, setIsPass] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const connect_me = async () => {
            const connectUrl = mainUrl + "/api/me";
            const response = await fetch(connectUrl, {
                method: "GET",
                headers: {
                    Authorization: cookie.load("access_token"),
                    Accept: "application/json",
                },
            });
            if (!response.ok) {
                setIsPass(false);
            } else {
                const data = await response.json();
                cookie.save("user_data", data.data, { path: "/" }); // 保存现登录用户的数据
                setIsPass(true);
            }
            setLoading(false);
        };

        connect_me().then();
    }, []);

    if (loading) {
        return null; // 或者可以显示一个 loading 组件
    }

    if (!isPass)
        $message.warning("身份令牌过期，请重新登录")

    // 检查用户是否已登录
    return isPass ? (
        React.cloneElement(element, rest)
    ) : (
        <Navigate to="/login" replace />
    );
};

const routes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <Navigate to="/404" replace />,
    },
    {
        path: "/404",
        element: "",
    },
    {
        path: "/",
        element: <PrivateRoute element={<Home />} />,
        children: [
            {
                path: "/",
                element: <PrivateRoute element={<div>Home</div>} />,
            },
            {
                path: "tasks",
                element: <PrivateRoute element={<Tasks />} />,
            },
            {
                path: "market",
                element: <PrivateRoute element={<div>Market</div>} />,
            },
            {
                path: "me",
                element: <PrivateRoute element={<Me />} />,
            },
            {
                path: "users",
                element: <PrivateRoute element={<Users/>} />,
                children: [
                    {
                        path: "",
                        element: <PrivateRoute element={<User/>} />,
                    },
                    {
                        path: "update/:id",
                        element: <PrivateRoute element={<UsersUpdate />} />,
                    },
                ]
            },
        ],
    },
];

const Router = () => {
    const element = useRoutes(routes);
    return <>
        <Suspense fallback={
            <div className={"H_loader"}><Loading/></div>
        }>
            {element}
        </Suspense>
    </>;
};

export default Router;
