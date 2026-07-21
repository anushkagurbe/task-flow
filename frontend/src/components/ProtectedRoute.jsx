import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { Navigate } from "react-router-dom";

let ProtectedRoute =({ children })=>{

    let { isLogin, user, loading } = useContext(AuthContext);
    console.log(isLogin);
    console.log(user);

    if(loading)
    {
        return <h1>Loading</h1>
    }

    if(!user)
    {
        return <Navigate to="/signin" replace />
    }

    return children;

}

export default ProtectedRoute;