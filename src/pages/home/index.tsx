import React, {Suspense, useState} from "react";
import {Outlet} from "react-router-dom";
import SidebarMenu from "../../components/sidebar_menu";
import ElHeader from "../../components/header";
import './index.css'
import {Drawer} from "../../components/elements/Drawer";
import {Loading} from "../../components/elements/Loading";


function Home() {
    let width = window.innerWidth
    const [mainWidth, updateMainW] = useState(width)
    const [winHeight, updateWinHeight] = useState(window.innerHeight)
    const [headerH, setHeader] = useState(40)
    const [menuWidth, setMenuW] = useState(300)
    const [open, setOpen] = useState(false);

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

    const showDrawer = () => {
        setOpen(!open);
    };

    return(
        <>
            <header className={"home-header"} style={{height:headerH}}>
                <ElHeader  fun={showDrawer} open={open}/>
            </header>
            <main className={"home-main"} style={{height:winHeight-headerH-0.1}}>
                <div className={"menu"}>
                    <div className={"wide-screen"} style={{width:menuWidth}}>
                        <SidebarMenu/>
                    </div>
                    <div className={"narrow-screen"}>
                        <Drawer location={"left"} open={open} label={<SidebarMenu/>} title={""}/>
                    </div>
                </div>
                <div className={"fun-app-info"} style={{width: mainWidth}}>
                    <Suspense fallback={<Loading/>}>
                        <Outlet/>
                    </Suspense>
                </div>
            </main>
        </>
    )
}

export default Home;
