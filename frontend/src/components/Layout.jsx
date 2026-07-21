import { CircleUserRound, Grid2X2, ListChecks, LogOut, Menu, WavesHorizontal, X } from "lucide-react";
import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext";

let Layout =()=>{

    let [isMobileOpen, setIsMobileOpen] = useState(false);
    let { user, logout } = useContext(AuthContext);
    let navigate = useNavigate();

    let handleLogout = ()=>{
        logout();
        navigate("/signin");
    }

    return (
        <div className="min-h-screen bg-[#f1f4f8] flex">

            <div className="fixed z-30 inset-x-0 top-0 bg-[#131a2f] py-3 px-4 md:hidden flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <WavesHorizontal className="text-[#4f46e5]" />
                    <span className="font-display text-lg font-serif text-white">TaskFlow</span>
                </div>
                <div>
                    <button onClick={()=>setIsMobileOpen(!isMobileOpen)} className="text-white">
                        {
                            isMobileOpen ? <X size={22} /> : <Menu size={22} />
                        }
                    </button>
                </div>
            </div>


            <aside className={`text-white md:w-64 bg-[#131a2f] fixed left-0 top-0 bottom-0 transition-transform md:translate-x-0 flex flex-col z-20 pt-7
                ${isMobileOpen ? "translate-x-0": "-translate-x-full"}`}
            >

                <div className="flex items-center gap-2 px-6">
                    <WavesHorizontal className="text-[#4f46e5]" />
                    <h2 className="font-serif text-[20px] text-white">TaskFlow</h2>
                </div>

                <nav className="flex flex-1 flex-col space-y-2 px-3 py-10">
                    <NavLink to="/dashboard" onClick={()=>setIsMobileOpen(false)} end className={({isActive})=>
                        `flex gap-2 items-center px-2 py-3 rounded-lg text-sm font-medium
                        ${isActive ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/90'}`
                    }>
                        <Grid2X2 size={18} strokeWidth={2}/>
                        Overview
                    </NavLink>

                    <NavLink to="/dashboard/tasks" onClick={()=>setIsMobileOpen(false)} className={({isActive})=>
                        `flex gap-2 items-center px-2 py-3 rounded-lg text-sm font-medium
                        ${isActive ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/90'}`
                    }>
                        <ListChecks/>
                        Tasks
                    </NavLink>

                    <NavLink to="/dashboard/profile" onClick={()=>setIsMobileOpen(false)} className={({isActive})=>
                        `flex gap-2 items-center px-2 py-3 rounded-lg text-sm font-medium
                        ${isActive ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/90'}`
                    }>
                        <CircleUserRound/>
                        Profile
                    </NavLink>
                </nav>

                <div className="border-t border-white/10 p-4">
                    <div className="flex items-center gap-3 p-2" >
                        <div className="w-9 h-9 bg-[#4f46e5] flex items-center justify-center rounded-full text-sm font-semibold text-white">
                            {
                                user?.name?.charAt(0).toUpperCase()
                            }
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-white">{user?.name}</p>
                            <p className="text-sm font-medium text-white/40">{user?.role}</p>
                        </div>
                    </div>
                </div>

                <button className="m-2 flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
                    hover:text-[#4f46e5] hover:bg-white/5 text-white/40"
                    onClick={handleLogout}
                >
                    <LogOut size={18}/> Logout
                </button>

            </aside>

            <main className={`flex-1 md:ml-64 p-4 md:p-7 md:pt-7 pt-16`}
            >
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout;