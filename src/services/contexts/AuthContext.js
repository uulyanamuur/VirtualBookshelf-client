import React from 'react'
import UserService from "../UserService";

const AuthContext = React.createContext()
const userService = new UserService();

export const anonymous = {
    name: "",
    token: "",
    email: ""
}


const saveUser = function (newUser) {
    localStorage.setItem("name", newUser.name)
    localStorage.setItem("token", newUser.token)
    localStorage.setItem("email", newUser.email)
}

const getUser = function () {
    let user = {
        name: localStorage.getItem("name") === null ? "" : localStorage.getItem("name"),
        token: localStorage.getItem("token") === null ? "" : localStorage.getItem("token"),
        email: localStorage.getItem("email") === null ? "" : localStorage.getItem("email")
    }
    if (user.token !== null && !userService.evaluateToken(user.token, user.email)) {
        localStorage.clear()
        return anonymous
    }
    return user
}


function AuthProvider(props) {
    const [user, setUser] = React.useState(getUser())
    const value = React.useMemo(() => {
        return {
            user,
            setUser,
        }
    }, [user])
    return <AuthContext.Provider value={value} {...props} />
}

function useAuth() {

    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    const {user, setUser} = context

    return {
        user,
        setUser,
        userService,
        saveUser
    }
}

export {AuthProvider, useAuth}