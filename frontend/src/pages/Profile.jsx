import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { KeyRoundIcon, User } from "lucide-react";
import { useState } from "react";
import { AUTH_API } from "../api/authApi";
import { toast } from "react-toastify";

let Profile =()=>{

    let {user, setUser} = useContext(AuthContext);
    let token = localStorage.getItem("accessToken");
    let [name, setName] = useState(user.name);
    let [oldPassword, setOldPassword] = useState("");
    let [newPassword, setNewPassword] = useState("");

    let handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(name);
        try
        {
            let response = await AUTH_API.patch("/updateName",{ name }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setUser({
                ...user,
                name
            })
            toast.success(response.data.message);
        }
        catch(error)
        {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    let handlePasswordChange = async(e)=>{
        e.preventDefault();
        try
        {
            let response = await AUTH_API.patch("/updatePassword",{ oldPassword, newPassword }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success(response.data.message);
            setNewPassword("");
            setOldPassword("");
        }
        catch(error)
        {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <div>
                    <p className="font-mono uppercase text-xs tracking-[0.2em] text-[#4338ca]">Account</p>
                    <h1 className="mt-3 font-serif text-3xl text-[#131a2f]">
                        Your profile
                    </h1>
                </div>

            </div>
            <div className="bg-white shadow-xl rounded-lg max-w-lg w-full p-4">
                <div className="flex items-center gap-4 p-2" >
                        <div className="w-12 h-12 bg-[#4f46e5] flex items-center justify-center rounded-full text-lg font-semibold text-[#131a2f]">
                            {
                                user?.name?.charAt(0).toUpperCase()
                            }
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xl font-serif text-[#131a2f]">{user?.name}</p>
                            <p className="text-sm font-serif text-gray-900/70">{user?.email}</p>
                            <p className="text-sm font-serif text-gray-900/70">{user?.role}</p>
                        </div>
                </div>
            </div>

            <div className="bg-white shadow-xl rounded-lg max-w-lg p-4">
                <div className="flex flex-col gap-4" >
                    <h1 className="font-serif text-lg text-[#131a2f] flex items-center gap-2">
                        <User color="#4f46e5" size={18} />
                        Personal information
                    </h1>
                    <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm text-gray-900/50">Full Name</label>
                            <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full border text-sm border-black/20 outline-none rounded-lg py-2 px-3" type="text" id="name" name="name"placeholder="Enter your name" />
                    </div>
                    <button onClick={handleSubmit} className="cursor-pointer rounded-lg text-white bg-[#131a2f] py-2 px-4 font-bold">
                        Save changes
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-xl rounded-lg max-w-lg p-4">
                <div className="flex flex-col gap-4" >
                    <h1 className="font-serif text-lg text-[#131a2f] flex items-center gap-2">
                        <KeyRoundIcon size={18} color="#4f46e5" />
                        Change password
                    </h1>
                    <div className="flex flex-col gap-2">
                            <label htmlFor="oldPassword" className="text-gray-900/50">Old password</label>
                            <input value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} className="text-sm w-full border border-black/20 outline-none rounded-lg py-2 px-3" type="password" id="oldPassword" name="oldPassword" placeholder="Enter current password" />
                    </div>
                    <div className="flex flex-col gap-2">
                            <label htmlFor="newPassword" className="text-gray-900/50">New Password</label>
                            <input value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="text-sm w-full border border-black/20 outline-none rounded-lg py-2 px-3" type="password" id="newPassword" name="newPassword" placeholder="Enter new password" />
                    </div>
                    <button onClick={handlePasswordChange} className="cursor-pointer rounded-lg text-white bg-[#131a2f] py-2 px-4 font-bold">
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile;