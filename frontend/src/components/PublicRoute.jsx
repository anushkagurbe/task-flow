import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { Navigate } from "react-router-dom";

let PublicRoute =({ children })=>{

    let { user, loading } = useContext(AuthContext);

    if(loading)
    {
        return <h1>Loading</h1>
    }

    if(user)
    {
        return <Navigate to="/dashboard" replace />
    }

    return children;

}

export default PublicRoute;