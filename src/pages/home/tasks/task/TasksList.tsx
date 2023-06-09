import {BarsOutlined} from "@ant-design/icons";
import {Task} from "./Task";
import {useEffect, useState} from "react";
import {connect_tasks} from "../../../../connect";
import {useNavigate} from "react-router-dom";
import Template from "../../market/template/Template";
import './TasksList.css'
import cookie from "react-cookies";

function TasksList() {
    const [tasksList, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const have_permission = cookie.load("user_data").permissions >= 1
    const navigate = useNavigate();

    const task = tasksList.map((task: any) =>
        <Task key={task.id}
              id={task.id}
              name={task.name}
              info={task.info}
              lastime={task.lastime}
              diy={task.diy}
              run={task.run}
              setList={setList}
              type={setType(task)}/>
    );

    function setType(task: any) {
        if (task.success) {
            if (task.run) {
                return "success"
            }
            return ""
        }
        return "fail"
    }

    const refreshInfo = () => {
        connect_tasks("GET", setList, setLoading, navigate, "").then()
    }

    const addTask = ()=> {
        navigate("/tasks/update/add") // -1 表示添加用户
    }

    useEffect(()=>{
        connect_tasks("GET", setList, setLoading, navigate, "").then()
    }, [])

    return (
        <>
            <Template
                title={<><BarsOutlined className={'icon'}/>任务管理</>}
                operate={<><div className={"tasks-btn"}>
                    <button className={"btn-refresh"}
                            onClick={refreshInfo}
                            disabled={loading}
                    >
                        {loading ? "刷新中···" : "刷新"}
                    </button>
                    <button className={"btn-add"}
                        onClick={addTask}
                        // disabled={isAddLoading}
                    >
                        添加
                    </button>
                </div></>}
            >
                <div className={"tasks-list"}>
                    {task}
                </div>
                <div className={"have-permission"}
                     style={have_permission ? {display: "none"} : {display: "inline"}}>
                    无权限
                </div>
            </Template>
        </>
    )
}

export default TasksList
