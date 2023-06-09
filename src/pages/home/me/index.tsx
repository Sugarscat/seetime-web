import {useNavigate} from "react-router-dom";
import {useState} from "react";
import cookie from "react-cookies";
import {IdcardOutlined} from "@ant-design/icons";
import {$message} from "../../../elements/Message";
import {connect_me} from "../../../connect";
import "./index.css"
import Template from "../../../elements/Template/Template";


function Me() {
    // 此页面需优化
    const [username, setUsername] = useState(cookie.load("user_name"))
    const [password, setPassword] = useState("")
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();

    const userData = cookie.load("user_data")
    const cookieRemove = ()=> {
        cookie.remove("access_token")
        cookie.remove("user_data")
    }

    const changeInfo = () => {
        setLoading(true)
        // 去“空格”，判断是否为空
        if (username.trim() === '') {
            $message.error('用户名不可为空')
            setLoading(false)
            return
        }
        connect_me(username, password, setLoading, navigate).then()
    }

    const sign_out = ()=> {
        cookieRemove()
        navigate('/login')
    }

    return (
        <>
            <Template
                title={<><IdcardOutlined className={'icon'}/>更新配置文件</>}
            >
                <div className={"me-login-info"}>
                    <span>上次登录时间：{userData.time}</span>
                    <span>上次登录IP：{userData.ip}</span>
                </div>
                <div className={"me-input"}>
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
                    <span className={userData.permissions/10000 >= 1 ? "true" : "false"}>系统信息</span>
                    <span className={userData.permissions%10000/1000 >= 1 ? "true" : "false"}>添加任务</span>
                    <span className={userData.permissions%10000%1000/100 >= 1 ? "true" : "false"}>更新任务</span>
                    <span className={userData.permissions%10000%1000%100/10 >= 1 ? "true" : "false"}>删除任务</span>
                    <span className={userData.permissions%10000%1000%100%10 >= 1 ? "true" : "false"}>下载任务</span>
                </div>
            </Template>
        </>
    )
}

export default Me
