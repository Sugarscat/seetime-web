import {createRef, MouseEventHandler, useState} from 'react'
import './Hamburger.css'

export const Hamburger = (props: {
    open: Boolean;
    onClick: MouseEventHandler<HTMLButtonElement>})=> {
    const open = () => {
        if (!props.open)
            return ""
        return " menu-show"
    }
    return(
        <>
            <button className={"hamburger" + open()} onClick={props.onClick}>
                <label className="menu-open-button">
                    <span className="lines line-1"></span>
                    <span className="lines line-2"></span>
                    <span className="lines line-3"></span>
                </label>
            </button>
        </>
    )
}
