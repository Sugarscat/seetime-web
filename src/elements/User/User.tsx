import {useState} from "react";
import "./User.css"
import {useNavigate} from "react-router-dom";
import {connect_users} from "../../connect";
import {showModal} from "../Modal";
import {$message} from "../Message";

const User = (props:{
    name: string,
    identity: boolean,
    permissions: number,
    operate: number,
    fun: any // 更新列表
}) => {
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();
    const url = "?id="

    const isAdmin = (identity: boolean)=> {
        if (identity)
            return " true"
        return ""
    }

    const deleteUser = (id: number) => {
        return ()=> {
            if (id === 0) {
                $message.warning("不可删除根管理员")
                return
            }
            showModal({
                className: "user-delete-confirmation",
                title: "删除用户",
                children: "你确定要删除此用户吗？",
                onConfirm: ()=>connect_users("DELETE", props.fun, setLoading, navigate, url + id).then(),
            });

        }
    }

    const updateUser = (id: number) => {
        return ()=>{
            if (id === 0) {
                $message.warning("不可修改根管理员信息")
                return
            }
            navigate('/users/update/' + id)
        }
    }

    return (
        <>
            <tr>
                <td className={"td-name"}>
                <span className={"user-name"}>
                    {props.name}
                </span>
                </td>
                <td className={"td-identity"}>
                <span className={"user-identity" + isAdmin(props.identity)}>
                   {props.identity ? "管理员" : ""}
                </span>
                </td>
                <td className={"td-permissions"}>
                    <div className={"user-permissions"}>
                        <div className={props.permissions/10000 >= 1 ? "true" : "false"}></div>
                        <div className={props.permissions%10000/1000 >= 1 ? "true" : "false"}></div>
                        <div className={props.permissions%10000%1000/100 >= 1 ? "true" : "false"}></div>
                        <div className={props.permissions%10000%1000%100/10 >= 1 ? "true" : "false"}></div>
                        <div className={props.permissions%10000%1000%100%10 >= 1 ? "true" : "false"}></div>
                    </div>
                </td>
                <td className={"td-operate"}>
                    <div className={"user-btn"}>
                        <button className={"btn-update"}
                                onClick={updateUser(props.operate)}
                        >
                            编辑
                        </button>
                        <button className={"btn-delete"}
                                onClick={deleteUser(props.operate)}
                                disabled={isLoading}
                        >
                            {isLoading ? "删除中···" : "删除"}
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default User
