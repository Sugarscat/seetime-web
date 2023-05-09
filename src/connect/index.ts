import {$message} from "../elements/Message";
import cookie from "react-cookies";

const mainUrl = process.env.REACT_APP_API_URL;

const loginUrl = mainUrl + "/api/login?name="
const meUrl = mainUrl + "/api/me"
const systemUrl = mainUrl + "/api/system"
const usersUrl = mainUrl + "/api/users"
const userUrl = mainUrl + "/api/user?id="
const tasksUrl = mainUrl + "/api/tasks"
const countUrl = mainUrl + "/api/tasks/count"
const taskUrl = mainUrl + "/api/task?id="
const logUrl = mainUrl + "/api/task/log?id="

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
        headers: {"Authorization":"","Content-Type": "application/json;charset=utf-8"},
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

export  const connect_system = async (
    setSystem: any, // 是否加载
    setIntervalTime: any,
    seTime: any,
    navigate: any, // 重定向
) => {
    let isCan = true

    const response = await fetch(systemUrl, {
        method: "GET",
        headers: {
            Authorization: cookie.load("access_token"),
            Accept: 'application/json'
        },
    }).then(
        response => {
            return response.json()
        }
    ).then().catch(
        () => {
            $message.error('连接服务器失败')
            isCan = false
        }
    )

    // 若无法连接服务器，中断函数
    if (!isCan) {
        return
    }

    if (!response.success) {
        $message.warning(response.message)
        if (response.code === 403){
            $message.warning("身份令牌过期，请重新登录")
            navigate('/login')
        }
    } else {
        setSystem(response.data)
        seTime(response.data.time)
        setIntervalTime(setInterval(async () => {
            seTime(response.data.time++)
        }, 1000))
    }
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

    const response = await fetch(meUrl, {
        method: putMethod,
        headers: {
            Authorization: cookie.load("access_token"),
            Accept: 'application/json'
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

    if (!response.success) {
        $message.warning(response.message)
        if (response.code === 403){
            $message.warning("身份令牌过期，请重新登录")
            navigate('/login')
        }
    } else {
        $message.success("修改成功")
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
            $message.warning("身份令牌过期，请重新登录")
            navigate('/login')
        }
    } else {
        $message.success(response.message)
        fun(response.data.content)
    }
    funL(false)
}

export const connect_users_update = async (
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
        funL(true)
        $message.warning(response.message)
        if (response.code === 403){
            $message.warning("身份令牌过期，请重新登录")
            navigate('/login')
        }
    } else {
        $message.success("更新/添加成功")
        navigate('/users')
    }
    funL(false)
}

export const connect_user = async (
    id: string,
    fun: {
        setUsername: any
        setIdentity: any
        checkedState: any
        setCheckedState: any
    },
    funL: any, // 是否加载
    navigate: any, // 重定向
) => {

    let isCan = true
    funL(isCan)

    const response = await fetch(userUrl + id, {
        method: "GET",
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
        funL(true)
        $message.warning(response.message)
        if (response.code === 403){
            $message.warning("身份令牌过期，请重新登录")
            navigate('/login')
        }
    } else {
        fun.setUsername(response.data.name)
        fun.setIdentity(response.data.identity)
        let permissions = Number(response.data.permissions)
        // 将 permissions 转换成对应的 checkedState 的值
        const newState = {
            situation: permissions/10000 >= 1,
            addTask: permissions%10000/1000 >= 1,
            changeTask: permissions%10000%1000/100 >= 1,
            deleteTask: permissions%10000%1000%100/10 >= 1,
            downloadTask: permissions%10000%1000%100%10 >= 1,
        };
        fun.setCheckedState({ ...fun.checkedState, ...newState });
    }
    funL(false)
}

export const connect_tasks = async (
    method: string, // 请求方式
    fun: any, // 未知函数
    funL: any, // 是否加载
    navigate: any, // 重定向
    url: string,
) => {
    let isCan = true
    funL(true)
    const response = await fetch(tasksUrl + url, {
        method: method,
        headers: {
            ContentType: "application/json;charset=utf-8",
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
        funL(false)
        $message.warning(response.message)
        if (response.code === 403){
            $message.warning("身份令牌过期，请重新登录")
            navigate('/login')
        }
    } else {
        $message.success(response.message)
        fun(response.data.content)
        funL(false)
    }
}

export const connect_tasks_add = async (
    funL: any, // 是否加载
    navigate: any, // 重定向
    body: FormData
) => {
    let isCan = true
    funL(true)
    const response = await fetch(tasksUrl, {
        method: "POST",
        headers: {
            ContentType: "application/json;charset=utf-8",
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
        funL(false)
        $message.warning(response.message)
        if (response.code === 403){
            $message.warning("身份令牌过期，请重新登录")
            navigate('/login')
        }
    } else {
        navigate('/tasks')
    }
}

export const connect_tasks_count = async (
    fun: any, // 未知函数
    funL: any, // 是否加载
    navigate: any, // 重定向
) => {
    let isCan = true
    funL(true)
    const response = await fetch(countUrl, {
        method: getMethod,
        headers: {
            ContentType: "application/json;charset=utf-8",
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
        funL(false)
        if (response.code === 403){
            $message.warning("身份令牌过期，请重新登录")
            navigate('/login')
        }
    } else {
        fun(response.data)
        funL(false)
    }
}

export const connect_task = async (
    id: string,
    fun: {
        setName: any
        setInfo: any
        setCycle: any
        setCommand: any
    },
    funL: any, // 是否加载
    navigate: any, // 重定向
) => {

    let isCan = true
    funL(isCan)

    const response = await fetch(taskUrl + id, {
        method: "GET",
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
        funL(true)
        $message.warning(response.message)
        if (response.code === 403){
            $message.warning("身份令牌过期，请重新登录")
            navigate('/login')
        }
    } else {
        fun.setName(response.data.name)
        fun.setInfo(response.data.info)
        fun.setCycle(response.data.cycle)
        fun.setCommand(response.data.command)
    }
    funL(false)
}

export const connect_task_update = async (
    method: string, // 请求方式
    funL: any, // 是否加载
    navigate: any, // 重定向
    id: string ,
    body: FormData
) => {

    let isCan = true
    funL(isCan)

    const response = await fetch(taskUrl + id, {
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
        funL(true)
        $message.warning(response.message)
        if (response.code === 403){
            $message.warning("身份令牌过期，请重新登录")
            navigate('/login')
        }
    } else {
        $message.success("更新/添加成功")
        navigate('/tasks')
    }
    funL(false)
}

export const connect_task_log = async (
    seText: any,
    funL: any, // 是否加载
    navigate: any, // 重定向
    id: string ,
) => {

    let isCan = true
    funL(isCan)

    const response = await fetch(logUrl+id, {
        method: getMethod,
        headers: {
            Authorization: cookie.load("access_token"),
            Accept: "application/json",
        },
    }).then(
        response => {
            return response.json()
        }
    ).then().catch(
        (err) => {
            console.log(err)
            $message.error('连接服务器失败')
            isCan = false
            funL(false)
            seText('连接服务器失败')
        }
    )

    // 若无法连接服务器，中断函数
    if (!isCan) {
        return
    }

    if (!response.success) {
        funL(true)
        $message.warning(response.message)
        if (response.code === 403){
            $message.warning("身份令牌过期，请重新登录")
            navigate('/login')
        }
        seText(response.message)
    } else {
        seText(response.data)
    }
    funL(false)
}
