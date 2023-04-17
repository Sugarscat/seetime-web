import {CompassFilled, GithubOutlined, MenuOutlined} from "@ant-design/icons";
import './index.css'
import {Tooltip} from "antd";

function ElHeader(props: { data: any; }) {
    const {data} = props;
    return(
        <div className="el-header">
            <div className={"menu-logo"}>
                <button className={"show-menu"} onClick={data}>
                    <MenuOutlined style={{fontSize: '23px'}}/>
                </button>
                <h5>见时</h5>
            </div>
            <ul>
                <li>
                    <Tooltip placement="bottom" title={"指南"}>
                        <a href="https://seetime.sugarscat.com/guide/" target="_blank">
                            <CompassFilled style={{fontSize: '23px'}}/>
                        </a>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip placement="bottom" title={"GitHub"}>
                        <a href="https://github.com/Sugarscat/seetime" target="_blank">
                            <GithubOutlined style={{fontSize: '23px'}}/>
                        </a>
                    </Tooltip>
                </li>
            </ul>
        </div>
    )
}

export default ElHeader
