function init(id: any){
    const task = {
        title: "任务sadddddddddddddddddddddddddddddd",
        info: "简介：saddddddddddddsaddddddddddddddddddddddd",
        last: "2023-02-03",
        next: "2023-54-00"
    }
    return task
}

function checkWork(changeStatue: any) {
    changeStatue(true)
    setTimeout(
        ()=>{
            if (true){
                changeStatue(false)
                return
            }
            checkWork(changeStatue)
        }, 5000)
}

function changeTask(id: any) {
    return ()=>{

    }
}

function startTask(id: any, changeStatue: any) {
    return ()=>{
        checkWork(changeStatue)
    }
}

function exportTask(id: any) {
    return ()=>{

    }
}

function deleteTask(id: any) {
    return ()=>{

    }
}

export {init, changeTask, startTask, exportTask, deleteTask}
