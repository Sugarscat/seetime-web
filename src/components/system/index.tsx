import {CodeOutlined, FieldTimeOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {connect_system, connect_tasks_count} from "../../connect";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Template from "../../elements/Template/Template";
import {useNavigate} from "react-router-dom";
import {Loading} from "../../elements/Loading";
import "./index.css"
import cookie from "react-cookies";

function System() {
    const have_permission = cookie.load("user_data").permissions/10000 >= 1
    const [system, setSystem] = useState({
        os: "加载中···",
        arch: "加载中···",
        time: 0,
        utc: "",
    })
    const [time, seTime] = useState(0)
    const [interval, setIntervalTime] = useState()
    const [isLoading, setLoading] = useState(false)
    const [tasksCount, setCount] = useState([{
        date: "", total: 0, success: 0, fail: 0,
    }])
    const [width, setWidth] = useState(0)
    const navigate = useNavigate();

    function TimestampToDate(props: {timestamp: any}) {
        const date = new Date(props.timestamp * 1000);
        const dateString = date.toLocaleString();
        return <>{dateString}</>
    }

    function updateChartStyle() {
        let father = document.getElementById("tasks-info-map")
        if (father != null) {
            setWidth(father.clientWidth - 10)
        }
    }

    useEffect(() => {
        connect_system(setSystem, setIntervalTime, seTime, navigate).then()
        connect_tasks_count(setCount, setLoading, navigate).then()
        updateChartStyle()
        window.addEventListener('resize', function (e) {
            updateChartStyle()
        }, false);
        return () => clearInterval(interval);
    }, []);

    return(
        <>
            <Template
                title={<><CodeOutlined className={'icon'}/>系统信息</>}
            >
                <div style={!have_permission ? {display: "none"} : {display: "inline"}}>
                    <div className={"system-info"}>
                        <div className={"system-info-content"}>
                            <span className={"info-os"}>系统：{system.os}</span>
                            <span className={"info-arch"}>架构：{system.arch}</span>
                        </div>
                        <div className={"system-info-time"}>
                            <div className={"time-title"}>
                                <FieldTimeOutlined className={"time-icon"}/>
                                <span>系统时间</span>
                            </div>
                            <span className={"time-text"}>
                            <TimestampToDate timestamp={time}/>  UTC{system.utc}
                        </span>
                            <span className={"time-tip"}>*任务的执行时间按此时间计算</span>
                        </div>
                    </div>
                    <div className={"system-tasks-map"}>
                        <div className={"tasks-info-map"} id={"tasks-info-map"}>
                            {!isLoading ? (
                                <LineChart width={width} height={300} data={tasksCount} id={"LineChart"}
                                           margin={{ right: 50 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="total" stroke="#8884d8" name="任务总数"/>
                                    <Line type="monotone" dataKey="success" stroke="#82ca9d" name="运行成功"/>
                                    <Line type="monotone" dataKey="fail" stroke="#e5484d" name="运行失败"/>
                                </LineChart>
                            ) : <Loading/>}
                        </div>
                    </div>
                </div>
                <div className={"have-permission"}
                     style={have_permission ? {display: "none"} : {display: "inline"}}>
                    无权限
                </div>
            </Template>
        </>
    )
}

export default System
