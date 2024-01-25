import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './app/screens/login';


interface Props {
    logged: boolean
}


const AppRoutes = function (props: Props) {

    return (

        routesValidate()

    );

    function routesValidate() {
        return (
            <Routes>
                <Route path="*" element={Login()} />
            </Routes>
        )

    }

}


export default AppRoutes;
