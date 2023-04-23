import {useState} from "react";
import { useNavigate } from "react-router-dom";
import cookie from 'react-cookies'
import './index.css'
import {$message} from '../../components/elements/Message';


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();
    const connectUrl = "http://localhost:3000/api/login?"

    const clearValue = ()=> {
        setUsername('')
        setPassword('')
    }

    const cookieSave = (id: number, name: string, token: string)=> {
        cookie.save("user_id", id, { path: '/' })
        cookie.save("user_name", name, { path: '/' })
        cookie.save("user_token", token, { path: '/' })
    }

    const connect = async () => {
        let url = connectUrl + "name=" +username + "&password=" + password
        const res = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json;charset=utf-8"},
        }).then(
            response => {
                return response.json()
            }
        ).then().catch(
            () => {
                error('连接服务器失败')
                setLoading(false)
                return
            }
        )

        if (isNaN(res.success)) {
            return
        }

        if (!res.success) {
            if (res.code === 429) {
                warning("验证错误过多，请稍后重试")
            }
            else {
                warning("用户名或密码错误")
            }
        } else {
            success()
            cookieSave(res.id, username, res.token)
            navigate('/')
        }
        setLoading(false)
    }

    const submitInfo = async () => {
        setLoading(true)
        // 去“空格”，判断是否为空
        if (username.trim() === '' || password.trim() === '') {
            error('用户名或密码不可为空')
            setLoading(false)
            return
        }
        await connect()
    }

    const success = () => {
        $message.success("登录成功")
    };

    const error = (content: string) => {
        $message.error(content)
    };

    const warning = (content: string) => {
        $message.warning(content)
    };

    return (
        <>
        <div className={"login"}>
            <header className={"login-header"}>
                <h1 style={{fontSize: "30px"}}>登录</h1>
            </header>
            <main className={"login-main"}>
                <input type="text" value={username}
                       onChange={(e)=>setUsername(e.target.value)}
                       placeholder={"输入您的用户名"}
                />
                <input type="password" value={password}
                       onChange={(e)=>setPassword(e.target.value)}
                       placeholder={"输入您的密码"}
                />
                <div className="login-remember-tip">
                    <a className="" target="_blank" href="/">忘记密码？</a>
                </div>
                <div className={"login-button"}>
                    <button className="login-btn-clear"
                            onClick={clearValue}
                    >
                        清除
                    </button>
                    <button className="login-btn-submit"
                            onClick={submitInfo}
                            disabled={isLoading}
                    >
                        {isLoading ? "登录中···" : "登录"}
                    </button>
                </div>
            </main>
            <footer>
                <div className={"ui-config"}>

                </div>
            </footer>
        </div>
        </>
    )

}

export default Login
