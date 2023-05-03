import {BarsOutlined, PlusOutlined} from "@ant-design/icons";
import './index.css'
import {Task} from "../../elements/Task";
import {useEffect, useState} from "react";
import {connect_tasks, connect_users} from "../../connect";
import {useNavigate} from "react-router-dom";



function ElTasks() {
    const [tasksList, setList] = useState([])
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();

    const task = tasksList.map((task: any) =>
        <Task key={task.id} id={task.id} name={task.name} info={task.info} lastime={task.lastime} diy={task.diy}/>
    );

    const refreshInfo = () => {
        connect_tasks("GET", setList, setLoading, navigate).then()
    }

    useEffect(()=>{
        connect_tasks("GET", setList, setLoading, navigate).then()
    }, [])

    return (
        <>
            <div className={"tasks-title"}>
                <h2>
                    <BarsOutlined className={'icon'}/>
                    任务管理
                </h2>
            </div>
            <div className={"tasks-operate"}>
                <div className={"tasks-btn"}>
                    <button className={"btn-refresh"}
                            onClick={refreshInfo}
                            disabled={isLoading}
                    >
                        {isLoading ? "刷新中···" : "刷新"}
                    </button>
                    <button className={"btn-add"}
                            // onClick={addUser}
                            // disabled={isAddLoading}
                    >
                        添加
                    </button>
                </div>
            </div>
            <div className={"task-info"}>
                {task}
            </div>
        </>
    )
}

export default ElTasks
