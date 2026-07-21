import { LogIn, WavesHorizontal } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_API } from "../api/authApi";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

let Login=()=>{

    let [formData, setFormdata] = useState({
        email: "",
        password: ""
    })
    let [errors, setErrors] = useState({});
    let [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    let { login } = useContext(AuthContext);


    let handleChange =(event)=>{
        setFormdata((formData)=>({
            ...formData,
            [event.target.name]: event.target.value
        }))
        setErrors((errors)=>({
            ...errors,
            [event.target.name]: ""
        }))
    }

    let handleSubmit = async(event)=>{
        event.preventDefault();
        setErrors({});
        setIsLoading(true);
        try
        {
            let response = await AUTH_API.post("/login", formData);
            console.log(response);
            login(response.data.user, response.data.accessToken);
            toast.success(response.data.message);
            setFormdata({
                email: "",
                password: ""
            })
            navigate("/dashboard");
            
        }
        catch(error)
        {
            console.log(error.response);
            if(error.response?.data?.errors)
            {
                setErrors(error.response.data.errors)
                return ;
            }
            toast.error(error.response.data.message)
        }
        finally
        {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f1f4f8] px-4">
            <div className="w-full max-w-sm" >
                <div className="flex items-center justify-center gap-3 mb-5">
                    <WavesHorizontal className="text-[#4f46e5]" />
                    <h2 className="font-serif text-[20px] text-gray-900 text-center">TaskFlow</h2>
                </div>

                <div className="rounded-lg bg-[#ffffff] border border-[#eaeaec] p-7 shadow-xl">
                    <h1 className="text-2xl text-gray-900 mb-2 font-serif font-medium">Welcome back</h1>
                    <p className="text-sm text-gray-600">Sign in to keep your work moving.</p>

                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1.5">Email</label>
                            <input 
                                type="text" 
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg py-2 px-3"
                                placeholder="chris@gmail.com"
                            />
                            <span className="text-sm text-gray-700/70">{errors && errors.email}</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-600 mb-1.5">Password</label>
                            <input 
                                type="password" 
                                id="password"
                                required
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                // minLength={8}
                                className="border border-gray-300 rounded-lg py-2 px-3"
                                placeholder="********"
                            />
                            <span className="text-sm text-gray-700/70">{errors && errors.password}</span>
                        </div>

                        <button type="submit" className="w-full flex items-center justify-center gap-3 cursor-pointer items-center rounded-lg text-white bg-[#131a2f] py-3 px-6 font-bold hover:bg-[#4f46e5]" >
                            {
                                isLoading ? "Signing In..." : (<><LogIn/> Sign In</>)
                            }
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-600">
                        New to taskflow? <Link to="/signup" className="text-[#4f46e5] font-medium">Create account</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;