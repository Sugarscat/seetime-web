import {ChangeEvent, useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import './UsersUpdate.css'
import {connect_user, connect_users_update} from "../../connect";
import {$message} from "../Message";
import {Loading} from "../Loading";

const UsersUpdate = () => {
    // 字符串索引签名
    interface CheckedState {
        [key: string]: boolean;
    }

    const { id } = useParams();
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [identity, setIdentity] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isSaving, setSaving] = useState(false)
    const [checkedState, setCheckedState] = useState<CheckedState>({
        situation: false,
        addTask: false,
        updateTask: false,
        deleteTask: false,
        downloadTask: false,
    });

    let permissions = 0

    const handleOnChangeChecked = (event: any) => {
        const { name, checked } = event.target;
        setCheckedState({ ...checkedState, [name]: checked });
    };

    const handleOnChangeIdentity = (event: any) => {
        setIdentity(event.target.checked)
    }

    const setName = (e: ChangeEvent<HTMLInputElement>)=> {
        setUsername(e.target.value)
    }

    const setPwd = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    // 设置权限
    const setPrem = () => {
        let prem = ""
        // 将布尔值转换成 ”10“ 字符串
        for (const key in checkedState) {
            let value = checkedState[key]
            let bit = value ? "1" : "0";
            prem += bit
        }
        permissions = Number(prem) // ”10“ 字符串转换成 Number
    }

    function updateUsers() {
        setPrem()

        let url = ""
        let method = "POST"
        if (id !== "add") {
            url = "?id=" + id
            method = "PUT"
            // 去“空格”，判断是否为空
            if (username.trim() === '') {
                $message.error('用户名不可为空')
                setLoading(false)
                return
            }
        } else {
            if (username.trim() === '' || password.trim() === '') {
                $message.error('用户名或密码不可为空')
                setLoading(false)
                return
            }
        }
        // 创建表单
        let formData = new FormData();
        formData.append('name', username);
        formData.append('pwd', password);
        formData.append('identity', String(identity));
        formData.append('permissions', String(permissions))

        connect_users_update(method, setSaving, navigate, url, formData).then()
    }

    function handleCancel()  {
        navigate('/users')
    }

    useEffect(()=>{
        if (0 === Number(id)) {
            $message.warning("不可修改根管理员信息")
            navigate("/users")
        }
        if (id !== "add"){
            connect_user(
                typeof id === "string" ? id : "-1",
                {
                    setUsername,
                    setIdentity,
                    checkedState,
                    setCheckedState
                },
                setLoading,
                navigate
            ).then()
        }
    }, [])

    return !isLoading ? (
        <>
            <div className={"users-update"}>
                <div className={"users-update-title"}>
                    <h2>{id !== "add" ? "编辑" : "添加"}</h2>
                </div>
                <div className={"users-update-info"}>
                    <input type="text" value={username}
                           onChange={(e)=>setName(e)}
                           placeholder={"请输入用户名"}
                    />
                    <input type="password"
                           onChange={(e)=>setPwd(e)}
                           placeholder={id === "add" ? "请输入密码" : "如果您不想更改密码，请保持为空"}
                    />
                </div>
                <div className={"users-update-permission"}>
                    <label className={"is-admin"}>
                        <span>设为管理员</span>
                        <input type={"checkbox"}
                               name={"admin"}
                               checked={identity}
                               onChange={handleOnChangeIdentity}
                        />
                    </label>

                    <label className={"permission-situation"}>
                        <span>系统信息</span>
                        <input type={"checkbox"}
                               name={"situation"}
                               checked={checkedState.situation}
                               onChange={handleOnChangeChecked}
                        />
                    </label>

                    <label className={"permission-add-task"}>
                        <span>添加任务</span>
                        <input type={"checkbox"}
                               name={"addTask"}
                               checked={checkedState.addTask}
                               onChange={handleOnChangeChecked}
                        />
                    </label>

                    <label className={"permission-change-task"}>
                        <span>更新任务</span>
                        <input type={"checkbox"}
                               name={"changeTask"}
                               checked={checkedState.changeTask}
                               onChange={handleOnChangeChecked}
                        />
                    </label>

                    <label className={"permission-delete-task"}>
                        <span>删除任务</span>
                        <input type={"checkbox"}
                               name={"deleteTask"}
                               checked={checkedState.deleteTask}
                               onChange={handleOnChangeChecked}
                        />
                    </label>

                    <label className={"permission-download-task"}>
                        <span>下载任务</span>
                        <input type={"checkbox"}
                               name={"downloadTask"}
                               checked={checkedState.downloadTask}
                               onChange={handleOnChangeChecked}
                        />
                    </label>
                </div>
                <div className={"users-update-operate"}>
                    <button className={"btn-update-save"}
                            onClick={updateUsers}
                    >
                        {isSaving ? "保存中···" : "保存"}
                    </button>
                    <button className={"btn-update-cancel"}
                            onClick={handleCancel}
                    >
                        取消
                    </button>
                </div>
            </div>
        </>
    ) : (<Loading/>)
}

export default UsersUpdate
