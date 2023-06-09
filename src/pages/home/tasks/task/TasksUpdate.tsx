import {useNavigate, useParams} from "react-router-dom";

import "./TasksUpdate.css"
import {useEffect, useState} from "react";
import {connect_task, connect_task_update, connect_tasks, connect_tasks_add} from "../../../../connect";
import {Loading} from "../../../../elements/Loading";
import {$message} from "../../../../elements/Message";
const TasksUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState("")
  const [info, setInfo] = useState("")
  const [cycle, setCycle] = useState("")
  const [command, setCommand] = useState("")
  let file: null;

  function handleCancel()  {
    navigate('/tasks')
  }

  function handleUpdate() {
    if (id !== "add") {
      if (name.trim() === '' || cycle.trim() === '' || command.trim() === '') {
        $message.warning('请完善带 * 号的字段')
        return
      }
    } else {
      if (name.trim() === '' || cycle.trim() === '' || command.trim() === '' || file === null) {
        $message.warning('请完善带 * 号的字段')
        return
      }
    }

    const formData = new FormData();
    formData.append('name', name)
    formData.append('info', info)
    formData.append('cycle', cycle)
    formData.append('command', command)
    if (file != null){
      formData.append('file', file);
    }

    if (id !== "add") {
      connect_task_update("PUT", setSaving, navigate, String(id), formData).then()
      file = null
    } else {
      connect_tasks_add(setSaving, navigate, formData).then()
      file = null
    }
  }

  function handleFileSelect(event: any) {
    file = event.target.files[0];
  }

  function handleName(e: any) {
    setName(e.target.value)
  }

  function handleInfo(e: any) {
    setInfo(e.target.value)
  }

  function handleCycle(e: any) {
    setCycle(e.target.value)
  }

  function handleCommand(e: any) {
    setCommand(e.target.value)
  }

  useEffect(()=>{
    if (id !== "add"){
      connect_task(String(id), {setName, setInfo, setCycle, setCommand}, setLoading, navigate).then()
    }
  }, [])

  return !loading ? (
      <>
        <div className={"tasks-update"}>
          <div className={"tasks-update-title"}>
            <h2>{id !== "add" ? "编辑" : "添加"}</h2>
          </div>
          <div className={"tasks-update-info"}>
            <span>*请输入任务名</span>
            <input type="text"
                   onChange={handleName}
                   value={name}
            />
            <span>请输入任务详情（可留白）</span>
            <input type="text"
                   onChange={handleInfo}
                   value={info}
            />
            <span>*请输入 crontab 表达式</span>
            <input type="text"
                   onChange={handleCycle}
                   value={cycle}
            />
            <span>*请输入启动命令</span>
            <input type="text"
                   onChange={handleCommand}
                   value={command}
            />
          </div>
          <input type="file" onChange={handleFileSelect} />
          <div className={"tasks-update-operate"}>
            <button className={"btn-update-save"}
                    onClick={handleUpdate}
            >
              {saving ? "保存中···" : "保存"}
            </button>
            <button className={"btn-update-cancel"}
                    onClick={handleCancel}
            >
              取消
            </button>
          </div>
        </div>
      </>
  ) : <Loading/>
}

export default TasksUpdate
