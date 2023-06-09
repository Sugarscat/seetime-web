import {EditOutlined} from "@ant-design/icons";
import "./TaskTitle.css"
import {connect_task, connect_tasks} from "../../../../connect";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import cookie from "react-cookies";
import {$message} from "../../../../elements/Message";
function TaskTitle(props: {
    id: number
    title: any;
    run: boolean;
    update: any;
    setList: any
    }) {
    const [loading, setLoading] = useState(false)
    const [run, setRun] = useState(props.run)
    const navigate = useNavigate();
    const userData = cookie.load("user_data")

    function updateRun() {
        if (!(userData.permissions%10000/1000 >= 1 || userData.permissions%10000%1000/100 >= 1)) {
            $message.warning("没有权限")
            return
        }
        if (run){
            connect_tasks("GET", props.setList, setLoading, navigate, "/stop?id="+props.id).then()
            setRun(false)
        } else {
            connect_tasks("GET", props.setList, setLoading, navigate, "/activate?id="+props.id).then()
            setRun(true)
        }
    }

    return (
        <>
            <div className={"task-header"}>
                <div className={"task-title"}>
                    <h2>
                        {props.title}
                    </h2>
                </div>
                <div className={"task-operate"}>
                    <div className="cl-toggle-switch"
                         title={"开启/暂停任务"}
                    >
                        <label className="cl-switch">
                            <input type="checkbox"
                                   onChange={updateRun}
                                   checked={run}
                                   disabled={loading}
                            ></input>
                            <span></span>
                        </label>
                    </div>
                    <button onClick={props.update}
                            title={"更新任务"}
                    >
                        <EditOutlined />
                    </button>
                </div>
            </div>
        </>
    )
}

export default TaskTitle
