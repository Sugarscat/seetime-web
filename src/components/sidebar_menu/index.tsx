import './index.css'
import {NavLink} from "react-router-dom";
import {
    AppstoreOutlined,
    BarsOutlined,
    CodeOutlined,
    IdcardOutlined,
    LinkOutlined,
    UserOutlined
} from '@ant-design/icons';

function SidebarMenu() {
    return (
        <div className={"el-sidebar-menu"}>
            <ul>
                <li>
                    <NavLink to={"/"}>
                        <h2>
                            <CodeOutlined className={'icon'}/>
                            系统信息
                        </h2>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/tasks"}>
                        <h2>
                            <BarsOutlined className={'icon'}/>
                            任务管理
                        </h2>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/market'}>
                        <h2>
                            <AppstoreOutlined className={'icon'}/>
                            任务模板
                        </h2>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/me'}>
                        <h2>
                            <IdcardOutlined className={'icon'}/>
                            个人资料
                        </h2>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/users'}>
                        <h2>
                            <UserOutlined className={'icon'}/>
                            用户管理
                        </h2>
                    </NavLink>
                </li>
                <li>
                    <a href="https://seetime.sugarscat.com" target="_blank"  rel="noreferrer">
                        <h2>
                            <LinkOutlined className={'icon'}/>
                            关于我们
                        </h2>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default SidebarMenu
