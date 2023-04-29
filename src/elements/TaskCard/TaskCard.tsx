import {Card} from "../Card";
import {
    CaretRightOutlined,
    DeleteOutlined,
    DownloadOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import {init, changeTask, startTask, exportTask, deleteTask} from "./fun"
import {useState} from "react";
import TaskTitle from "./TaskTitle";
import "./TaskCard.css"
export interface TaskCardProps {
    id: number;
}

export const TaskCard = (props: TaskCardProps) => {
    const [isWork, changeStatue] = useState(false)
    const task = init(props.id)

    return (
        <>
            <Card title={<TaskTitle fun={changeTask(props.id)} title={task.title}/>}  width={280}>
                <div className={"task-info"}>
                    <div className={"task-text"}>
                        {task.info}
                    </div>
                    <div className={"time-record"}>
                        <h6>
                            上次：{task.last}
                        </h6>
                        <h6>
                            下次：{task.next}
                        </h6>
                    </div>
                    <div className={"tasks-setting"}>
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
            </Card>
        </>
    )
}
