
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

export {changeTask, startTask, exportTask, deleteTask}
