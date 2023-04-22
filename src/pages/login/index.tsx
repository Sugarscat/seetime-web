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
    const connectUrl = "http://localhost:3000/api/login?name="

    const clearValue = ()=> {
        setUsername('')
        setPassword('')
    }

    const cookieSave = (id: number, token: string)=> {
        cookie.save("user_id", id, { path: '/' })
        cookie.save("user_token", token, { path: '/' })
        navigate('/')
    }

    const connect = async () => {
        let url = connectUrl + username + "&password=" + password
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

        if (!res.success) {
            if (res.code === 404) {
                warning("用户名或密码错误")
            }
            else {
                warning("过多请求，请稍后重试")
            }
        } else {
            success()
            cookieSave(res.id, res.token)
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
                       placeholder={"输入您的用户名"}/>
                <input type="password" value={password}
                       onChange={(e)=>setPassword(e.target.value)}
                       placeholder={"输入您的密码"}/>
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
