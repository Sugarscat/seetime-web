import {Loading} from "../../../elements/Loading";
import {Outlet} from "react-router-dom";
import React, {Suspense} from "react";


const Users = ()=> {

    return (
        <>
            <Suspense fallback={<Loading/>}>
                <Outlet/>
            </Suspense>
        </>
    )
}

export default Users
