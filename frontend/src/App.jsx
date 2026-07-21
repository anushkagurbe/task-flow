import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";

let App =()=>{
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing/>} />

                <Route 
                    path="/signup"
                    element={
                        <PublicRoute>
                            <Signup/>
                        </PublicRoute>
                    }
                />

                <Route 
                    path="/signin"
                    element={
                        <PublicRoute>
                            <Login/>
                        </PublicRoute>
                    }
                />

                <Route 
                    element={
                        <ProtectedRoute>
                            <Layout/>
                        </ProtectedRoute>
                    }
                >
                    <Route path="/dashboard">
                        <Route index element={<Dashboard/>} />
                        <Route path="tasks" element={<Tasks/>} />
                        <Route path="profile" element={<Profile/>} />
                    </Route>
                </Route>
                
            </Routes>
            <ToastContainer />
        </>
    )
}

export default App;