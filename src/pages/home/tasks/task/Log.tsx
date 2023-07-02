import {useEffect, useState} from "react";
import {connect_task_log} from "../../../../connect";
import {Loading} from "../../../../elements/Loading";
import "./Log.css"

function Log(props: {id: number,  navigate: any}) {
    const [text, seText] = useState("")
    const [loading, setLoading] = useState(false)

    function TextWithLineBreaks(props: {text: string}) {
        const text = props.text;
        const textArray = text.split('\n');
        return (
            <span>
                {textArray.map((line, index) => (
                    <span key={index}>
                        {line}
                        {index !== textArray.length - 1 && <br />} {/* 最后一个元素后不添加换行 */}
                    </span>
                ))}
            </span>
        );
    }

    useEffect(()=>{
        connect_task_log(seText, setLoading, props.navigate, String(props.id)).then()
    },[])

    return !loading ? (
        <>
            <div className={"log-content"}>
                <TextWithLineBreaks text={text} />
            </div>
        </>
    ) : <Loading/>
}

export default Log
