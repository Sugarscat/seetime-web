import { useState,useEffect } from 'react';
import './Message.css'
import {createRoot} from "react-dom/client";
import {CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, WarningFilled} from "@ant-design/icons";

let add: (L: List) => void;

export interface MessageApi {
    info: (text: string) => void;
    success: (text: string) => void;
    warning: (text: string) => void;
    error: (text: string) => void;
}

export interface List {
    text: string;
    key: string;
    type: 'info' | 'success' | 'error' | 'warning';
}

export const MessageContainer = () => {
    const [lists ,setList] = useState<List[]>([]);
    const remove = (L:List) => {
        const { key } = L;
        setList((pre:List[]) => ( pre.filter((each:List) => key !== each.key) ))
    }

    const Msg = ({type, text }:{ type:string, text: string }) => {
        return (
            <div className={`sugar-message ${type}`}>
                <ExclamationCircleFilled className={"icon icon-info"}/>
                <CloseCircleFilled className={"icon icon-error"}/>
                <WarningFilled className={"icon icon-warning"}/>
                <CheckCircleFilled className={"icon icon-success"}/>
                {text}
            </div>
        );
    };

    add = (option:List) => {
        setList((pre:List[])=>{
            const obj = [...pre,option ];
            setTimeout(() => {
                remove(option)
            }, 3000)
            return obj
        })
    }

    useEffect(() => {
        if (lists.length > 10) {
            lists.shift();
        }
    }, [lists])

    return (
        <>
            {
                lists.map(({ text, key, type }) => (
                    <Msg key={key} type={type} text={text} />
                ))
            }
        </>
    )
}

// 获取唯一id
const getId = () => {
    return (Math.random() * 1000).toFixed()
}

// 挂载容器到页面
const createMessage = () => {
    let el = document.getElementById('#sugar-message-wrap');
    // 这一步是必要的的，因为在执行到这里的时候，页面还没有挂载，所以获取不到el节点
    if (!el) {
        el = document.createElement('div')
        el.className = 'sugar-message-wrap'
        el.id = 'sugar-message-wrap'
        document.body.append(el)
    }
    const root = createRoot(el!); // createRoot(container!) if you use TypeScript
    root.render(<MessageContainer />);
}
createMessage();

export const $message: MessageApi = {
    info: (text) => {
        add({
            text,
            key: getId(),
            type: 'info'
        })
    },
        success: (text) => {
        add({
            text,
            key: getId(),
            type: 'success'
        })
    },
        warning: (text) => {
        add({
            text,
            key: getId(),
            type: 'warning'
        })
    },
        error: (text) => {
        add({
            text,
            key: getId(),
            type: 'error'
        })
    }
}
