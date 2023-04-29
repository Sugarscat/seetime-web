import React, {Suspense, useState} from "react";
import {Outlet} from "react-router-dom";
import SidebarMenu from "../../components/sidebar_menu";
import ElHeader from "../../components/header";
import './index.css'
import {Drawer} from "../../elements/Drawer";
import {Loading} from "../../elements/Loading";

function Home() {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(!open);
    };

    return(
        <>
            <header className={"home-header"}>
                <ElHeader  fun={showDrawer} open={open}/>
            </header>
            <main className={"home-main"}>
                <div className={"menu"}>
                    <div className={"wide-screen"}>
                        <SidebarMenu/>
                    </div>
                    <div className={"narrow-screen"}>
                        <Drawer location={"left"} open={open} label={<SidebarMenu/>} title={""}/>
                    </div>
                </div>
                <div className={"fun-app-info"}>
                    <Suspense fallback={<Loading/>}>
                        <Outlet/>
                    </Suspense>
                </div>
            </main>
        </>
    )
}

export default Home;
