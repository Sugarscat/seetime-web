import {CompassFilled, GithubOutlined} from "@ant-design/icons";
import './index.css'
import {Hamburger} from "../../../elements/Hamburger";

function ElHeader(props: {
    open: boolean;
    fun: any; }) {
    const {fun} = props;
    return(
        <div className="el-header">
            <div className={"menu-logo"}>
                <div className={"show-menu"}>
                    <Hamburger onClick={fun} open = {props.open}/>
                </div>
            </div>
            <ul>
                <li>
                    <a href="https://seetime.sugarscat.com/guide/"
                       target="_blank"
                       rel="noreferrer"
                       title="文档"
                    >
                        <CompassFilled style={{fontSize: '23px'}}/>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/Sugarscat/seetime"
                       target="_blank"
                       rel="noreferrer"
                       title="GitHub"
                    >
                        <GithubOutlined style={{fontSize: '23px'}}/>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default ElHeader
