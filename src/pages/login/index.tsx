import {useState} from "react";

import checkInfo from "./checkInfo";
import './index.css'

function Login() {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')

    function init(){

    }

    function clearInfo() {
        setUsername('')
        setPassword('')
    }

    function submitInfo() {
        // 去“空格”，判断是否为空
        if (username.trim() === '' || password.trim() === ''){
            console.log("用户名和密码不可为空")
            return
        }
        checkInfo(username, password);
    }

    return (
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
                    <label>
                        <input type="checkbox" className="" id=""/>
                        记住账号
                    </label>
                    <a className="" target="_blank" href="/">忘记密码？</a>
                </div>
                <div className={"login-button"}>
                    <button className="login-btn-clear" onClick={clearInfo}>清除</button>
                    <button className="login-btn-submit" onClick={submitInfo}>登录</button>
                </div>
            </main>
            <footer>
                <div className={"ui-config"}>

                </div>
            </footer>
        </div>
    );

}

export default Login;
