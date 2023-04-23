import {useNavigate} from "react-router-dom";
import {IdcardOutlined} from "@ant-design/icons";
import {useState} from "react";
import cookie from "react-cookies";
import {$message} from "../elements/Message";
import "./index.css"

const Me = () => {
    // 此页面需优化
    const [username, setUsername] = useState(cookie.load("user_name"))
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState(false)

    const [time, setTime] = useState("")
    const [ip, setIp] = useState("")
    const [situation,setSituation] = useState("false")
    const [addTask, setAddTask] = useState("false")
    const [changeTask,setChangeTask] = useState("false")
    const [deleteTask,setDeleteTask] = useState("false")
    const [downloadTask,setDownloadTask] = useState("false")

    const navigate = useNavigate();
    const connectUrl = "http://localhost:3000/api/me"
    const localInfo = "id=" + cookie.load("user_id") + "&token=" + cookie.load("user_token")

    const cookieSave = (id: number, name: string, token: string) => {
        cookie.save("user_id", id, {path: '/'})
        cookie.save("user_name", name, {path: '/'})
        cookie.save("user_token", token, {path: '/'})
    }

    const connect_me = () => async () => {
        let url = connectUrl + "?" + localInfo
        const res = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json;charset=utf-8"},
        }).then(
            response => {
                return response.json()
            }
        ).then().catch(
            () => {
                $message.error('连接服务器失败')
                setLoading(false)
                return false
            }
        )

        if (isNaN(res.success)) {
            return false
        }

        if (!res.success){
            $message.warning(res.message)
            if (res.code == 403)
                navigate('/login')
            return false
        }

        setTime(res.time)
        setIp(res.ip)
        setSituation(res.permissions.situation ? "true" : "false")
        setAddTask(res.permissions.addtask ? "true" : "false")
        setChangeTask(res.permissions.changetask ? "true" : "false")
        setDeleteTask(res.permissions.deletetask ? "true" : "false")
        setDownloadTask(res.permissions.downloadtask ? "true" : "false")

        return true
    }

    const [isConnect, setConnect] = useState(connect_me())

    const connect_change = async () => {
        let url = connectUrl + "/change?" + localInfo + "&name=" +username + "&password=" + password
        const res = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json;charset=utf-8"},
        }).then(
            response => {
                return response.json()
            }
        ).then().catch(
            () => {
                $message.error('连接服务器失败')
                setLoading(false)
                return
            }
        )

        if (!res.success) {
            $message.error(res.message)
            if (res.code === 403){
                navigate('/login')
            }
        } else {
            $message.success(res.message)
            cookieSave(res.id, username, res.token)
        }
        setLoading(false)
    }

    const changeInfo = async () => {
        setLoading(true)
        // 去“空格”，判断是否为空
        if (username.trim() === '' || password.trim() === '') {
            $message.error('用户名或密码不可为空')
            setLoading(false)
            return
        }
        await connect_change()
    }

    const sign_out = ()=> {
        cookieSave(-1, "", "")
        navigate('/login')
    }

    return (
        <>
            <div className={"me-title"}>
                <h2>
                    <IdcardOutlined className={'icon'}/>
                    更新配置文件
                </h2>
            </div>
            <div className={"me-login-info"}>
                <span>上次登录时间：{time}</span>
                <span>上次登录IP：{ip}</span>
            </div>
            <div className={"me-operate"}>
                <div className={"me-name"}>
                    <div className={"me-name-text"}>修改用户名</div>
                    <input type="text" value={username}
                           onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>
                <div className={"me-pwd"}>
                    <div className={"me-pwd-text"}>更改密码</div>
                    <input type="password" value={password}
                           onChange={(e)=>setPassword(e.target.value)}
                           placeholder={"********"}
                    />
                    <div className={"me-tip"}>
                        如果您不想更改密码，请保持为空
                    </div>
                </div>
            </div>
            <div className={"me-btn"}>
                <button onClick={changeInfo} disabled={isLoading} className={"btn-save"}>
                    {isLoading ? "保存中···" : "保存"}
                </button>
                <button onClick={sign_out} className={"btn-sign-out"}>
                    退出
                </button>
            </div>
            <div className={"me-info"}>
                <span className={situation}>系统信息</span>
                <span className={addTask}>添加任务</span>
                <span className={changeTask}>修改任务</span>
                <span className={deleteTask}>删除任务</span>
                <span className={downloadTask}>下载任务</span>
            </div>
        </>
    )
}

export default Me
