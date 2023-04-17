import React, {Suspense, useState} from "react";
import {Outlet} from "react-router-dom";
import type { DrawerProps } from 'antd';
import {Drawer} from 'antd';
import SidebarMenu from "../../components/el_sidebar_menu";
import './index.css'
import ElHeader from "../../components/el_header";

function Home() {
    let width = window.innerWidth
    const [mainWidth, updateMainW] = useState(width)
    const [winHeight, updateWinHeight] = useState(window.innerHeight)
    const [headerH, setHeader] = useState(40)
    const [menuWidth, setMenuW] = useState(300)

    const updateMain = ()=>{
        width = window.innerWidth
        if (width < 370){
            return
        } else if (width >= 370 && width <= 840) {
            updateMainW(width)
        }
        else {
            updateMainW(width - menuWidth)
        }
    }

    window.onload =  updateMain
    window.addEventListener('resize', function (e) {
        updateMain()
    }, false);
    window.addEventListener('resize', function (e) {
        if (window.innerHeight > 512){
            updateWinHeight(window.innerHeight)
        }
    }, false);

    // 第三方组件
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('left');
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return(
        <>
            <header className={"home-header"} style={{height:headerH}}>
                <ElHeader  data={showDrawer}/>
            </header>
            <main className={"home-main"} style={{height:winHeight-headerH-0.1}}>
                <div className={"menu"}>
                    <Drawer
                        title="见时"
                        placement={placement}
                        closable={true}
                        onClose={onClose}
                        open={open}
                        key={placement}
                    >
                        <SidebarMenu/>
                    </Drawer>
                    <div className={"wide-screen"} style={{width:menuWidth}}>
                        <SidebarMenu/>
                    </div>
                </div>
                <div className={"fun-app-info"} style={{width: mainWidth}}>
                    <Suspense fallback={123}>
                        <Outlet/>
                    </Suspense>
                </div>
            </main>
        </>
    )
}

export default Home;
