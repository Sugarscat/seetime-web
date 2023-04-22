import {EditOutlined} from "@ant-design/icons";
import "./TaskTitle.css"
function TaskTitle(props: {
    fun: any;
    title: any;
    }) {
    return (
        <>
            <div className={"task-header"}>
                <div className={"task-title"}>
                    <h2>
                        {props.title}
                    </h2>
                </div>
                <button onClick={props.fun}
                        title={"修改任务"}
                >
                    <EditOutlined />
                </button>
            </div>
        </>
    )
}

export default TaskTitle
