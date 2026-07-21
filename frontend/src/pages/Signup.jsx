import { UserRoundPlus, WavesHorizontal } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_API } from "../api/authApi";
import { toast } from "react-toastify";

let Signup=()=>{

    let [formData, setFormdata] = useState({
        name: "",
        email: "",
        password: ""
    })
    let [isLoading, setIsLoading] = useState(false);

    let [errors, setErrors] = useState({});

    let navigate = useNavigate();

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
            let response = await AUTH_API.post("/signup", formData);
            console.log(response);
            toast.success(response.data.message);
            setFormdata({
                name: "",
                email: "",
                password: ""
            });
            navigate("/signin")
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
                    <h1 className="text-2xl text-gray-900 mb-2 font-serif font-medium">Create your account</h1>
                    <p className="text-sm text-gray-600">Start organizing your work in minutes</p>

                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-600 mb-1.5">Name</label>
                            <input 
                                type="text"
                                id="name" 
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                // minLength={2}
                                className="border border-gray-300 rounded-lg py-2 px-3"
                                placeholder="Chris George"
                            />
                            <span className="text-sm text-gray-700/70">{errors && errors.name}</span>
                        </div>

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
                                name="password"
                                required
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
                                isLoading ? "Creating account..." : (<><UserRoundPlus /> Create account </>)
                            }
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-600">
                        Already have an account? <Link to="/signin" className="text-[#4f46e5] font-medium">SignIn</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup;