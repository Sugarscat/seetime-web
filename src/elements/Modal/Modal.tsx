import React from "react";
import "./Modal.css";
import {createRoot} from "react-dom/client";
import {CloseOutlined} from "@ant-design/icons";

export interface ModalProps {
    className: string;
    title: any;
    children: any;
    onConfirm: any;
    onCancel: any;
}

function Modal(props: ModalProps) {
    const {className, title, children, onConfirm, onCancel } = props;

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        onCancel()
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <div className={"modal " + className}>
            <div className="modal-title">
                <h2>{title}</h2>
                <button className="close-button" onClick={handleCancel}>
                    <CloseOutlined />
                </button>
            </div>
            <div className="modal-content">{children}</div>
            <div className="modal-bottom">
                <div className="confirmation-modal-buttons">
                    <button className={"confirm-btn"} onClick={handleConfirm}>确认</button>
                    <button className={"cancel-btn"} onClick={handleCancel}>取消</button>
                </div>
            </div>
        </div>
    );
}

export function showModal(modalProps: {
    className: string
    title: any
    children: any
    onConfirm: any
}) {
    const el = document.createElement("div");
    el.className = "sugar-modal";
    document.body.appendChild(el);

    let props = {
        className: modalProps.className,
        title: modalProps.title,
        children: modalProps.children,
        onConfirm: modalProps.onConfirm,
        onCancel: destroyModal
    }

    const root = createRoot(el!); // createRoot(container!) if you use TypeScript
    root.render(<Modal {...props}/>);

    function destroyModal() {
        document.body.removeChild(el);
    }
}
