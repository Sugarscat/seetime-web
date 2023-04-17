import {BarsOutlined, PlusOutlined} from "@ant-design/icons";
import {Button} from "antd";
import TaskCard from "../elements/task-card";
import './index.css'


function ElTasks() {
    return (
        <>
            <div className={"tasks-title"}>
                <h2>
                    <BarsOutlined className={'icon'}/>
                    任务管理
                </h2>
            </div>
            <div className={"tasks-operate"}>
                <Button type="primary">
                    <PlusOutlined />
                    添加
                </Button>
            </div>
            <div className={"tasks-info"}>
                <TaskCard data={{id: "1"}}/>
                <TaskCard data={{id: "1"}}/>
            </div>
        </>
    )
}

export default ElTasks
