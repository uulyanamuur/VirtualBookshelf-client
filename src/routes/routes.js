import {Navigate, Outlet, Route, Routes as ReactRoutes} from 'react-router-dom';
import Profile from "../components/sites/profile";
import React from "react";
import SignInSide from "../components/sites/signIn";
import SignUp from "../components/sites/signUp";
import {useAuth} from "../services/contexts/AuthContext";
import Content from "../components/common/Content";

const PrivateRoute = () => {
    let {user} = useAuth(); // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user.token !== ""
        ? <Outlet/> : <Navigate to="/auth/login"/>;
}

const AuthRoute = () => {
    let {user} = useAuth(); // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to home page
    return user.name === ""
        ? <Outlet/> : <Navigate to="/"/>;
}

export function Routes() {
    return (
        <ReactRoutes>
                <Route exact path="/profile" element={Content(
                    {
                        title: "Profile",
                        content: <Profile/>
                    }
                )}/>
            <Route exact path="/auth" element={<AuthRoute/>}>
                <Route exact path="/auth/login" element={SignInSide()}/>
                <Route exact path="/auth/registration" element={SignUp()}/>
            </Route>
        </ReactRoutes>
    )
}

