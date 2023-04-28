import {useState} from "react";
import { useNavigate } from "react-router-dom";
import cookie from 'react-cookies'
import {$message} from '../../components/elements/Message';
import {connect_login} from "../../connect";
import './index.css'

function Login() {
    const [username, setUsername] = useState(cookie.load("user_name"))
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();

    const clearValue = ()=> {
        setUsername('')
        setPassword('')
    }

    const submitInfo = async () => {
        // 去“空格”，判断是否为空
        if (username.trim() == '' || password.trim() == '') {
            $message.error('用户名或密码不可为空')
            setLoading(false)
            return
        }
        await connect_login(username, password, setLoading, navigate)
    }

    function handleKeyPress(event: any) {
        if (event.key == 'Enter') {
            event.preventDefault()
            event.stopPropagation()
            submitInfo().then()
        }
    }

    return (
        <>
        <div className={"login"}>
            <header className={"login-header"}>
                <h1 style={{fontSize: "30px"}}>登录</h1>
            </header>
            <main className={"login-main"}>
                <input type="text" value={username}
                       onChange={(e)=>setUsername(e.target.value)}
                       onKeyPress={handleKeyPress}
                       placeholder={"输入您的用户名"}
                />
                <input type="password" value={password}
                       onChange={(e)=>setPassword(e.target.value)}
                       onKeyPress={handleKeyPress}
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
