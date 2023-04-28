import {$message} from "../components/elements/Message";
import cookie from "react-cookies";

const loginUrl = "http://localhost:3000/api/login?name="
const meUrl = "http://localhost:3000/api/me"
const usersUrl = "http://localhost:3000/api/users"

const getMethod = "GET"
const putMethod = "PUT"

export const connect_login = async (
    name: string,
    pwd: string,
    funL: any, // 是否加载
    navigate: any, // 重定向
) => {

    let isCan = true
    funL(isCan) // Loading 设置

    let url = loginUrl + name + "&pwd=" + pwd
    const res = await fetch(url, {
        method: getMethod,
        headers: {"Content-Type": "application/json;charset=utf-8"},
    }).then(
        response => {
            return response.json()
        }
    ).then().catch(
        () => {
            $message.error('连接服务器失败')
            isCan = false
            funL(false)
            return
        }
    )

    // 若无法连接服务器，中断函数
    if (!isCan) {
        return
    }

    if (!res.success) {
        if (res.code === 429) {
            $message.warning("验证错误过多，请稍后重试")
        }
        else {
            $message.warning("用户名或密码错误")
        }
    } else {
        cookie.save("user_name", name, { path: '/' })
        cookie.save("access_token", res.token, { path: '/' })
        $message.success("登录成功")
        navigate('/')
    }
    funL(false)
}

export  const connect_me = async (
    name: string,
    pwd: string,
    funL: any, // 是否加载
    navigate: any, // 重定向
) => {

    let isCan = true
    funL(isCan)

    let formData = new FormData();
    formData.append('name', name);
    formData.append('pwd', pwd);

    const res = await fetch(meUrl, {
        method: putMethod,
        headers: {
            'Authorization': cookie.load("access_token"),
            'Accept': 'application/json'
        },
        body: formData
    }).then(
        response => {
            return response.json()
        }
    ).then().catch(
        () => {
            $message.error('连接服务器失败')
            isCan = false
            funL(false)
        }
    )

    // 若无法连接服务器，中断函数
    if (!isCan) {
        return
    }

    if (!res.success) {
        $message.error(res.message)
        if (res.code === 403){
            navigate('/login')
        }
    } else {
        $message.success(res.message)
        cookie.save("user_name", name, {path: '/'})
    }
    funL(false)
}

export const connect_users = async (
    method: string, // 请求方式
    fun: any, // 未知函数
    funL: any, // 是否加载
    navigate: any, // 重定向
    url: string,
) => {

    let isCan = true
    funL(isCan)

    const response = await fetch(usersUrl + url, {
        method: method,
        headers: {
            Authorization: cookie.load("access_token"),
            Accept: "application/json",
        },
    }).then(
        response => {
            return response.json()
        }
    ).then().catch(
        () => {
            $message.error('连接服务器失败')
            isCan = false
            funL(false)
        }
    )

    // 若无法连接服务器，中断函数
    if (!isCan) {
        return
    }

    if (!response.success) {
        $message.warning(response.message)
        if (response.code === 403){
            navigate('/login')
        }
    } else {
        $message.success(response.message)
        fun(response.data.content)
    }
    funL(false)
}

export const  connect_users_update = async (
    method: string, // 请求方式
    funL: any, // 是否加载
    navigate: any, // 重定向
    url: string ,
    body: FormData
) => {

    let isCan = true
    funL(isCan)

    const response = await fetch(usersUrl + url, {
        method: method,
        headers: {
            Authorization: cookie.load("access_token"),
            Accept: "application/json",
        },
        body: body
    }).then(
        response => {
            return response.json()
        }
    ).then().catch(
        () => {
            $message.error('连接服务器失败')
            isCan = false
            funL(false)
        }
    )

    // 若无法连接服务器，中断函数
    if (!isCan) {
        return
    }

    if (!response.success) {
        $message.warning(response.message)
        funL(true)
        if (response.code === 403){
            navigate('/login')
        }
    } else {
        $message.success(response.message)
        navigate('/users')
    }
    funL(false)
}
