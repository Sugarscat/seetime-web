import {UserOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {connect_users} from "../../connect";
import UserList from "./UserList";
import cookie from "react-cookies";
import './User.css'


const User = ()=> {
    const [isLoading, setLoading] = useState(false)
    const [isAddLoading, setAddLoading] = useState(false)
    const [usersList, setList] = useState([])
    const navigate = useNavigate();
    const userData = cookie.load("user_data")
    const refreshInfo = () => {
        connect_users("GET",setList, setLoading, navigate, "").then()
    }

    const addUser = ()=> {
        navigate("/users/update/add") // -1 表示添加用户
    }

    const user = usersList.map((user: any) =>
        <UserList key={user.id}
                  name={user.name}
                  identity={user.identity}
                  permissions={user.permissions}
                  operate={user.id}
                  fun={setList}
        />
    );

    useEffect(()=>{
        setLoading(!userData.identity)
        setAddLoading(!userData.identity)
        if(userData.identity)
            connect_users("GET", setList, setLoading, navigate, "").then()
    }, [])

    return (
        <>
            <div className={"users-title"}>
                <h2>
                    <UserOutlined className={'icon'}/>
                    用户管理
                </h2>
            </div>
            <div className={"users-operate"}>
                <div className={"users-btn"}>
                    <button className={"btn-refresh"}
                            onClick={refreshInfo}
                            disabled={isLoading}
                    >
                        {isLoading ? "刷新中···" : "刷新"}
                    </button>
                    <button className={"btn-add"}
                            onClick={addUser}
                            disabled={isAddLoading}
                    >
                        添加
                    </button>
                </div>
            </div>
            <div className={"users-list"}>
                <table role="table">
                    <thead role="rowgroup">
                    <tr>
                        <th>用户名</th>
                        <th>身份</th>
                        <th>权限</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody role="rowgroup">
                    {user}
                    </tbody>
                </table>
            </div>
            <div className={"have-permission"}
                 style={userData.identity ? {display: "none"} : {display: "inline"}}>
                无权限
            </div>
        </>
    )
}

export default User
