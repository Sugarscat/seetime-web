import {Card} from "../Card";
import {
    CaretRightOutlined,
    DeleteOutlined,
    DownloadOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import {useState} from "react";
import TaskTitle from "./TaskTitle";
import "./Task.css"
import {useNavigate} from "react-router-dom";
import {connect_tasks, connect_users} from "../../connect";
import {showModal} from "../Modal";
import Log from "./Log";
import cookie from "react-cookies";
import {$message} from "../Message";
export interface TaskCardProps {
    id: number
    name: string
    info: string
    lastime: string
    diy: boolean
    run: boolean
    type: string
    setList: any
}

export const Task = (props: TaskCardProps) => {
    const [working, changeStatue] = useState(false)
    const [loading, setLoading] = useState(false)
    const userData = cookie.load("user_data")
    const navigate = useNavigate();

    function updateTask(id: any) {
        return ()=>{
            if (userData.permissions%10000%1000/100 >= 1)
                navigate('/tasks/update/' + id)
            else
                $message.warning("没有权限")
        }
    }

    function seeLog(id: any) {
        return ()=>{
            showModal({
                className: "task-log-info",
                title: "任务日志",
                children: <Log id={id}  navigate={navigate}/>,
                onConfirm: ()=>{}
            });
        }
    }

    function runTask(id: any) {
        return ()=>{
            changeStatue(true)
            connect_tasks("GET", props.setList, setLoading, navigate, "/run?id="+props.id).then()
            setTimeout(
                ()=>{
                    changeStatue(false)
                    return
                }, 60000)
        }
    }

    function exportTask(id: any) {
        return ()=>{

        }
    }

    function deleteTask(id: any) {
        return ()=>{
            if (userData.permissions%10000%1000%100/10 >= 1)
                connect_tasks("DELETE", props.setList, setLoading, navigate, "?id="+props.id).then()
            else
                $message.warning("没有权限")
        }
    }

    return (
        <>
            <Card className={props.type}
                  title={
                <TaskTitle
                    id={props.id}
                    title={props.name}
                    update={updateTask(props.id)}
                    run={props.run}
                    setList={props.setList}
                  />}
                  width={280}
            >
                <div className={"task-info"}>
                    <div className={"task-text"}>
                        {props.info}
                    </div>
                    <div className={"time-record"}>
                        <span>
                            上次：{props.lastime}
                        </span>
                    </div>
                    <div className={"task-setting"}>
                        <div className={"task-type"}>
                            <div className={props.diy ? "diy" : "template"}>
                                {props.diy ? "自定义" : "模板"}
                            </div>
                        </div>
                        <div className={"task-setting-btn"}>
                            <button className={"btn-log"}
                                    onClick={seeLog(props.id)}
                                    title={"日志"}
                            >
                                <ExclamationCircleOutlined />
                            </button>
                            <button className={working ? "btn-work work" : "btn-work stop"}
                                    onClick={runTask(props.id)}
                                    disabled={working}
                                    title={working ? "已发送请求，1分钟后可再次运行" : "运行一次"}
                            >
                                <LoadingOutlined className={"work-icon"}/>
                                <CaretRightOutlined className={"stop-icon"}/>
                            </button>
                            <button className={"btn-export"}
                                    onClick={exportTask(props.id)}
                                    disabled={loading}
                                    title={"导出任务"}
                            >
                                <DownloadOutlined/>
                            </button>
                            <button className={"btn-delete"}
                                    onClick={deleteTask(props.id)}
                                    disabled={loading}
                                    title={"删除任务"}
                            >
                                <DeleteOutlined/>
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}
