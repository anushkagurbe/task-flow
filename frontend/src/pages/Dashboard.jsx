import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext";
import { AlertCircle, Clock, ListChecks, MoveRight, TrendingUp } from "lucide-react";
import { NOTE_API } from "../api/noteApi";
import StatChart from "../components/StatChart"


let Dashboard = () => {
    let { user } = useContext(AuthContext);
    let [loading, setLoading] = useState(true);
    let [summary, setSummary] = useState(null);
    let [stat, setStat] = useState(null);
    let [recentActivity, setRecentActivity] = useState([]);
    let token = localStorage.getItem("accessToken");

    let getNotesStat = async()=>{
        try
        {
            setLoading(true);
            let response = await NOTE_API.get("/getStat", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setSummary(response.data.data.summary);
            setStat(response.data.data.statusBreakdown)
            setRecentActivity(response.data.data.recentActivity)
        }
        catch(error)
        {
            console.log(error.response.data);
        }
        finally
        {
            setLoading(false);
        }
    }

    useEffect(()=>{
        getNotesStat();
    },[])

    return (
        <div className="space-y-8">
            <div className="flex sm:items-end justify-between gap-3 sm:flex-row flex-col">
                <div>
                    <p className="font-mono uppercase text-xs tracking-[0.2em] text-[#4338ca]">Your overview</p>
                    <h1 className="mt-3 font-serif text-3xl text-[#131a2f]">
                        Hey {user?.name?.split(' ')[0]}, here's the state of play.
                    </h1>
                </div>
                <Link to="/dashboard/tasks" className="rounded-lg justify-center text-white bg-[#131a2f] py-2 px-4 font-bold hover:bg-[#4f46e5] flex items-center gap-3">
                    Open board <MoveRight/>
                </Link>
            </div>
            
            {
                loading ? <h1>Loading...</h1> : 
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                        <div className="px-4 py-5 flex flex-row items-center gap-3 rounded-lg bg-white shadow-xl">
                            <div className="rounded-lg bg-[#e0dfeb] p-3">
                                <ListChecks color="#4338ca"/>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-[#131a2f]">{summary.totalTasks}</h1>
                                <p className="text-gray-900/60 text-sm">Total tasks</p>
                            </div>
                        </div>

                        <div className="px-4 py-5 flex flex-row items-center gap-3 rounded-lg bg-white shadow-xl">
                            <div className="rounded-lg bg-[#e3eedd] p-3">
                                <TrendingUp color="#009933"/>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-[#131a2f]">{summary.completionRate} %</h1>
                                <p className="text-gray-900/60 text-sm">Completion Rate</p>
                            </div>
                        </div>

                        <div className="px-4 py-5 flex flex-row items-center gap-3 rounded-lg bg-white shadow-xl">
                            <div className="rounded-lg bg-[#f2d8d8] p-3">
                                <AlertCircle color="#da2727"/>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-[#131a2f]">{summary.overDue}</h1>
                                <p className="text-gray-900/60 text-sm">Overdue</p>
                            </div>
                        </div>

                        <div className="px-4 py-5 flex flex-row items-center gap-3 rounded-lg bg-white shadow-xl">
                            <div className="rounded-lg bg-[#f2d8d8] p-3">
                                <Clock color="#da2727"/>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-[#131a2f]">{summary.inProgress}</h1>
                                <p className="text-gray-900/60 text-sm">In progress</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-5 gap-5 grid-cols-1">
                        <div className="lg:col-span-2 bg-white shadow-xl p-4 rounded-lg">
                            <h1 className="text-[#131a2f] text-lg font-serif">Status breakdown</h1>
                            <StatChart data={stat} />
                        </div>
                        <div className="lg:col-span-3 bg-white shadow-xl p-4 rounded-lg">
                            <h1 className="text-[#131a2f] text-lg font-serif mb-4">Recent activity</h1>
                            <div className="space-y-4 p-4" >
                                {
                                    recentActivity.map((activity)=>(
                                        <div className="flex items-center justify-between gap-4" key={activity._id}>
                                            <div>
                                                <p className="text-[#131a2f] text-sm font-medium font-serif">{activity.title}</p>
                                                <span className="text-xs font-mono text-gray-700/90">{activity.createdAt.split("T")[0]}</span>
                                            </div>
                                            <div className="flex flex-row gap-4">
                                                <span className="flex items-center justify-center rounded-lg bg-[#e0dfeb] text-[#4338ca] px-2 py-0.5 text-xs">{activity.status}</span>
                                                <span className="flex items-center justify-center rounded-lg bg-[#dfe2e2] text-gray-700/70 px-2 py-0.5 text-xs">{activity.priority}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>
            </div>

            }
        </div>
    )
}

export default Dashboard;
