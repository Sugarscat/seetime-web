import {EditOutlined} from "@ant-design/icons";
import { Tooltip } from "antd";

function TaskCardTitle(props: { data: any; }) {
    const {data} = props;
    return (
        <>
            <div className={"task-title"}>
                {data.title}
            </div>
            <Tooltip placement="top" title={"修改任务"}>
                <button onClick={data.fun}>
                    <EditOutlined />
                </button>
            </Tooltip>

        </>
    )
}

export default TaskCardTitle
