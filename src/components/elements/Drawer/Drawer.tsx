import React from "react";

import './Drawer.css'

export interface DrawerProps {
    location: string;
    open: boolean;
    backgroundColor: string;
    color: string;
    title: string;
    label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

export const Drawer = (props: DrawerProps) => {
    const hidden = ()=>{
        if (props.open){
            return ""
        }
        return " sugar-drawer-hidden"
    }

    return (
        <>
            <div className={"sugar-drawer-background" + hidden()}>
                <div className={"sugar-drawer " + props.location}
                     style={{backgroundColor: props.backgroundColor}}
                >
                    <div className={"sugar-drawer-header"}>
                        <h2>
                            {props.title}
                        </h2>
                    </div>
                    <div className={"sugar-drawer-body"}>
                        {props.label}
                    </div>
                </div>
            </div>
        </>
    )
};

Drawer.defaultProps = {
    location: "right",
    open: false,
    backgroundColor: "var(--color-background)",
    color: "var(--color-text)"
}
