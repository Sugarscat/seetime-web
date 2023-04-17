import {useState} from "react";
import {
    CaretRightOutlined,
    DeleteOutlined,
    DownloadOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import {Card, Tooltip} from "antd";
import TaskCardTitle from "./TaskCardTitle";
import {init, changeTask, startTask, exportTask, deleteTask} from "./fun"
import './index.css'

function TaskCard(props: { data: any}) {
    const {data:{id}} = props;
    const [isWork, changeStatue] = useState(false)
    const task = init(id)

    return (
        <Card title={<TaskCardTitle data={{title: task.title, changeTask: changeTask(id)}}/>}
              className={"tasks-list"} bordered={false} style={{width: 300}}>
            <span className={"task-info-text"}>
                {task.info}
            </span>
            <div className={"time-record"}>
                <h6>
                    上次：{task.last}
                </h6>
                <h6>
                    下次：{task.next}
                </h6>
            </div>
            <div className={"tasks-setting"}>
                <Tooltip placement="bottom" title={"日志"}>
                    <button className={"btn-log"} disabled={isWork}>
                        <ExclamationCircleOutlined />
                    </button>
                </Tooltip>
                <Tooltip placement="bottom" title={isWork ? "运行中，请等待" : "执行一次"}>
                    <button className={isWork ? "btn-work work" : "btn-work stop"}
                            onClick={startTask(id, changeStatue)}
                            disabled={isWork}
                    >
                        <LoadingOutlined className={"work-icon"}/>
                        <CaretRightOutlined className={"stop-icon"}/>
                    </button>
                </Tooltip>
                <Tooltip placement="bottom" title={"导出任务"}>
                    <button className={"btn-export"}
                            onClick={exportTask(id)}
                    >
                        <DownloadOutlined/>
                    </button>
                </Tooltip>
                <Tooltip placement="bottom" title={"删除任务"}>
                    <button className={"btn-delete"}
                            onClick={deleteTask(id)}
                    >
                        <DeleteOutlined/>
                    </button>
                </Tooltip>
            </div>
        </Card>
    )
}

export default TaskCard
