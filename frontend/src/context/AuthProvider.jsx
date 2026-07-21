import { useEffect, useState } from "react";
import { AUTH_API } from "../api/authApi";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children })=>{

    let [user, setUser] = useState(null);
    let [isLogin, setIsLogin] = useState(false);
    let [loading, setLoading] = useState(true);
    
    
    useEffect(()=>{
        let accessToken = localStorage.getItem("accessToken");
        console.log("Access Token:", accessToken);
        let getLoggedinUser = async ()=>{
            if(!accessToken)
            {
                console.log("No token found")
                setUser(null);
                setIsLogin(false);
                setLoading(false);
                return ;
            }
            try
            {
                let response = await AUTH_API.get("/get-me", {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
                console.log(response);
                setUser(response.data.user);
                setIsLogin(true);

            }
            catch(error)
            {
                console.log(error);
                localStorage.removeItem("accessToken");
                setUser(null);
                setIsLogin(false);
            }
            finally
            {
                setLoading(false);
            }
        }
        getLoggedinUser();
    },[])

    let login = (user, token)=>{
        console.log(user)
        setUser(user);
        setIsLogin(true);
        localStorage.setItem("accessToken", token);
    }

    let logout = ()=>{
        setUser(null);
        setIsLogin(false);
        localStorage.removeItem("accessToken");
    }


    return (
        <AuthContext.Provider value={{ user, isLogin, login, logout, loading, setUser }}>
            {
                children
            }
        </AuthContext.Provider>
    )
}