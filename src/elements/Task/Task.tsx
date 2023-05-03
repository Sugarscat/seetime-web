import {Card} from "../Card";
import {
    CaretRightOutlined,
    DeleteOutlined,
    DownloadOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import {changeTask, startTask, exportTask, deleteTask} from "./fun"
import {useState} from "react";
import TaskTitle from "./TaskTitle";
import "./Task.css"
export interface TaskCardProps {
    id: number
    name: string
    info: string
    lastime: string
    diy: boolean
}

export const Task = (props: TaskCardProps) => {
    const [isWork, changeStatue] = useState(false)

    return (
        <>
            <Card title={<TaskTitle fun={changeTask(props.id)} title={props.name}/>}  width={280}>
                <div className={"task-info"}>
                    <div className={"task-text"}>
                        {props.info}
                    </div>
                    <div className={"time-record"}>
                        <h6>
                            上次：{props.lastime}
                        </h6>
                    </div>
                    <div className={"task-setting"}>
                        <div className={"task-type"}>
                            <div className={props.diy ? "diy" : "template"}>
                                {props.diy ? "自定义" : "模板"}
                            </div>
                        </div>
                        <div className={"task-setting-btn"}>
                            <button className={"btn-log"}
                                    title={"日志"}
                            >
                                <ExclamationCircleOutlined />
                            </button>
                            <button className={isWork ? "btn-work work" : "btn-work stop"}
                                    onClick={startTask(props.id, changeStatue)}
                                    disabled={isWork}
                                    title={isWork ? "运行中···" : "运行一次"}
                            >
                                <LoadingOutlined className={"work-icon"}/>
                                <CaretRightOutlined className={"stop-icon"}/>
                            </button>
                            <button className={"btn-export"}
                                    onClick={exportTask(props.id)}
                                    title={"导出任务"}
                            >
                                <DownloadOutlined/>
                            </button>
                            <button className={"btn-delete"}
                                    onClick={deleteTask(props.id)}
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
