import {$message} from "../elements/Message";
import cookie from "react-cookies";

const mainUrl = process.env.REACT_APP_API_URL;

const loginUrl = mainUrl + "/api/login"
const meUrl = mainUrl + "/api/me"
const systemUrl = mainUrl + "/api/system"
const usersUrl = mainUrl + "/api/users"
const userUrl = mainUrl + "/api/user?id="
const tasksUrl = mainUrl + "/api/tasks"
const countUrl = mainUrl + "/api/tasks/count"
const taskUrl = mainUrl + "/api/task?id="
const logUrl = mainUrl + "/api/task/log?id="

export const connect_login = async (
    name: string,
    pwd: string,
    loading: any, // 是否加载
    navigate: any, // 重定向
) => {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('pwd', pwd);
    loading(true) // Loading 设置
    await fetch(loginUrl, {
        method: "POST",
        body: formData
    }).then(
        response => {
            return response.json()
        }
    ).then(
        response => {
            loading(false)
            if (!response.success) {
                if (response.code === 429) {
                    $message.warning("验证错误过多，请稍后重试")
                }
                else {
                    $message.warning("用户名或密码错误")
                }
            } else {
                cookie.save("user_name", name, { path: '/' })
                cookie.save("access_token", response.token, { path: '/' })
                $message.success("登录成功")
                navigate('/')
            }
            loading(false)
        }
    ).catch(
        () => {
            loading(false)
            $message.error('连接服务器失败')
        }
    )
}

export  const connect_system = async (
    setSystem: any, // 是否加载
    setIntervalTime: any,
    seTime: any,
    navigate: any, // 重定向
) => {
    await fetch(systemUrl, {
        method: "GET",
        headers: {
            Authorization: cookie.load("access_token"),
            Accept: 'application/json'
        },
    }).then(
        response => {
            return response.json()
        }
    ).then(
        response => {
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
    ).catch(
        () => {
            $message.error('连接服务器失败')
        }
    )
}

export  const connect_me = async (
    name: string,
    pwd: string,
    loading: any, // 是否加载
    navigate: any, // 重定向
) => {
    loading(true)
    let formData = new FormData();
    formData.append('name', name);
    formData.append('pwd', pwd);
    await fetch(meUrl, {
        method: "PUT",
        headers: {
            Authorization: cookie.load("access_token"),
            Accept: 'application/json'
        },
        body: formData
    }).then(
        response => {
            return response.json()
        }
    ).then(
        response => {
            loading(false)
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
        }
    ).catch(
        () => {
            loading(false)
            $message.error('连接服务器失败')
        }
    )
}

export const connect_users = async (
    method: string, // 请求方式
    fun: any, // 未知函数
    loading: any, // 是否加载
    navigate: any, // 重定向
    url: string,
) => {
    loading(true)
    await fetch(usersUrl + url, {
        method: method,
        headers: {
            Authorization: cookie.load("access_token"),
            Accept: "application/json",
        },
    }).then(
        response => {
            return response.json()
        }
    ).then(
        response => {
            if (!response.success) {
                if (response.code === 400) {
                    $message.warning("没有权限")
                }
                else if (response.code === 403){
                    $message.warning("身份令牌过期，请重新登录")
                    navigate('/login')
                }
                else if (response.code === 404) {
                    $message.warning("没有此用户")
                }
            } else {
                fun(response.data.content)
            }
            loading(false)
        }
    ).catch(
        () => {
            $message.error('连接服务器失败')
            loading(false)
        }
    )
}

export const connect_users_update = async (
    method: string, // 请求方式
    loading: any, // 是否加载
    navigate: any, // 重定向
    url: string ,
    body: FormData
) => {
    loading(true)
    await fetch(usersUrl + url, {
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
    ).then(
        response => {
            if (!response.success) {
                loading(true)
                $message.warning(response.message)
                if (response.code === 403){
                    $message.warning("身份令牌过期，请重新登录")
                    navigate('/login')
                }
            } else {
                $message.success("更新/添加成功")
                navigate('/users')
            }
            loading(false)
        }
    ).catch(
        () => {
            $message.error('连接服务器失败')
            loading(false)
        }
    )
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
    funL(true)
    await fetch(userUrl + id, {
        method: "GET",
        headers: {
            Authorization: cookie.load("access_token"),
            Accept: "application/json",
        },
    }).then(
        response => {
            return response.json()
        }
    ).then(
        response => {
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
    ).catch(
        () => {
            $message.error('连接服务器失败')
            funL(false)
        }
    )
}

export const connect_tasks = async (
    method: string, // 请求方式
    fun: any, // 未知函数
    loading: any, // 是否加载
    navigate: any, // 重定向
    url: string,
) => {
    loading(true)
    await fetch(tasksUrl + url, {
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
    ).then(
        response => {
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
            loading(false)
        }
    ).catch(
        () => {
            $message.error('连接服务器失败')
            loading(false)
        }
    )
}

export const connect_tasks_add = async (
    loading: any, // 是否加载
    navigate: any, // 重定向
    body: FormData
) => {
    loading(true)
    await fetch(tasksUrl, {
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
    ).then(
        response => {
            if (!response.success) {
                $message.warning(response.message)
                if (response.code === 403){
                    $message.warning("身份令牌过期，请重新登录")
                    navigate('/login')
                }
            } else {
                navigate('/tasks')
            }
            loading(false)
        }
    ).catch(
        () => {
            $message.error('连接服务器失败')
            loading(false)
        }
    )
}

export const connect_tasks_count = async (
    fun: any, // 未知函数
    loading: any, // 是否加载
    navigate: any, // 重定向
) => {
    loading(true)
    await fetch(countUrl, {
        method: "PUT",
        headers: {
            ContentType: "application/json;charset=utf-8",
            Authorization: cookie.load("access_token"),
            Accept: "application/json",
        },
    }).then(
        response => {
            return response.json()
        }
    ).then(
        response => {
            if (!response.success) {
                if (response.code === 403){
                    $message.warning("身份令牌过期，请重新登录")
                    navigate('/login')
                }
            } else {
                fun(response.data)
            }
            loading(false)
        }
    ).catch(
        () => {
            $message.error('连接服务器失败')
            loading(false)
        }
    )
}

export const connect_task = async (
    id: string,
    fun: {
        setName: any
        setInfo: any
        setCycle: any
        setCommand: any
    },
    loading: any, // 是否加载
    navigate: any, // 重定向
) => {
    loading(true)
    await fetch(taskUrl + id, {
        method: "GET",
        headers: {
            Authorization: cookie.load("access_token"),
            Accept: "application/json",
        },
    }).then(
        response => {
            return response.json()
        }
    ).then(
        response => {
            if (!response.success) {
                loading(true)
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
            loading(false)
        }
    ).catch(
        () => {
            $message.error('连接服务器失败')
            loading(false)
        }
    )
}

export const connect_task_update = async (
    method: string, // 请求方式
    loading: any, // 是否加载
    navigate: any, // 重定向
    id: string ,
    body: FormData
) => {
    loading(true)
    await fetch(taskUrl + id, {
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
    ).then(
        response => {
            if (!response.success) {
                $message.warning(response.message)
                if (response.code === 403){
                    $message.warning("身份令牌过期，请重新登录")
                    navigate('/login')
                }
            } else {
                $message.success("更新/添加成功")
                navigate('/tasks')
            }
            loading(false)
        }
    ).catch(
        () => {
            $message.error('连接服务器失败')
            loading(false)
        }
    )
}

export const connect_task_log = async (
    seText: any,
    loading: any, // 是否加载
    navigate: any, // 重定向
    id: string ,
) => {
    loading(true)
    await fetch(logUrl+id, {
        method: "GET",
        headers: {
            Authorization: cookie.load("access_token"),
        },
    }).then(
        response => {
            return response.json()
        }
    ).then(
        response => {
            if (!response.success) {
                if (response.code === 400) {
                    $message.warning("没有权限")
                    seText("没有权限")
                }
                else if (response.code === 403){
                    $message.warning("身份令牌过期，请重新登录")
                    navigate('/login')
                }
                else if (response.code === 404) {
                    seText("没有日志")
                }
            } else {
                seText(response.data)
            }
            loading(false)
        }
    ).catch(
        () => {
            $message.error('连接服务器失败')
            loading(false)
            seText('连接服务器失败')
        }
    )
}
