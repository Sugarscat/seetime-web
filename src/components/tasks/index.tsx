import {BarsOutlined, PlusOutlined} from "@ant-design/icons";
import {Card} from '../elements/Card'
import './index.css'
import {TaskCard} from "../elements/TaskCard";


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
               <button><PlusOutlined/></button>
            </div>
            <div className={"tasks-info"}>
                <TaskCard id={1}/>
                <TaskCard id={2}/>
            </div>
        </>
    )
}

export default ElTasks
