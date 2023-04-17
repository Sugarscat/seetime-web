function checkInfo(user: string, password: string) {
    if (user !== password){
        return false
    }
    return true
}

export default checkInfo;
