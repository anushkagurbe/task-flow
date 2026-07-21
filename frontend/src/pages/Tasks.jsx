import { Calendar, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import TaskModal from "../components/TaskModal";
import { useState } from "react";
import { useEffect } from "react";
import { NOTE_API } from "../api/noteApi";

let Tasks =()=>{

    let [modal, setModal] = useState({
        isOpen: false,
        task: null,
        mode: "create"
    });

    let [tasks, setTasks] = useState([]);
    let token = localStorage.getItem("accessToken");
    let [loading, setLoading] = useState(true);

    let openCreateModal =()=>{
        setModal((modal)=>({
            ...modal,
            task: null,
            isOpen: true,
            mode: "create"
        }))
    }

    let openEditModal =(task)=>{
        setModal((modal)=>({
            ...modal,
            mode: "edit",
            isOpen: true,
            task: task
        }))
    }

    let closeModal =()=>{
        setModal((modal)=>({
            ...modal,
            isOpen: false,
            task: null,
            mode: "create"
        }))
    }

    let fetchTasks = async()=>{
        setLoading(true)
        try
        {
            let response = await NOTE_API.get("/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.data);
            setTasks(response.data.data);
        }
        catch(error)
        {
            console.log(error);
            alert(error.response.data.message)
        }
        finally
        {
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchTasks();
    },[])

    return (
        <div className="space-y-8">
            <div className="flex sm:items-end justify-between gap-3 sm:flex-row flex-col">
                <div>
                    <p className="font-mono uppercase text-xs tracking-[0.2em] text-[#4338ca]">Your tasks</p>
                    <h1 className="mt-3 font-serif text-3xl text-ink-900">
                        Taskboard
                    </h1>
                </div>
                <button onClick={openCreateModal}  className="cursor-pointer rounded-lg justify-center text-white bg-[#131a2f] py-2 px-4 font-bold hover:bg-[#4f46e5] flex items-center gap-3">
                    Create task <Plus/>
                </button>
            </div>
                    
            {
                loading ? <h1>Loading...</h1>  :
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                <div className="space-y-4">
                    <p className="text-[#131a2f] text-sm font-serif font-bold">Todo</p>
                    <div className="bg-[#161e3105] p-2 rounded-lg space-y-3">
                        {
                            tasks.filter((task)=> task.status == "todo").map((task)=>(
                                    <div className="bg-white shadow-xl rounded-lg p-2 cursor-pointer" key={task._id} onClick={()=>openEditModal(task)} >
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm text-[#131a2f] font-medium">{task.title}</p>
                                            <p className="text-xs text-gray-900/70">{task.description}</p>
                                            
                                            <div className="flex items-center justify-between border-t border-gray-700/20 pt-3 mt-2">
                                                <span className="text-xs font-mono text-gray-700/90 flex gap-2 items-center"><Calendar size={14}/> {task.dueDate.split("T")[0]}</span>
                                                <span className="flex items-center justify-center rounded-lg bg-[#e0dfeb] text-[#4338ca] px-2 py-0.5 text-xs">{task.priority}</span>
                                            </div>
                                        </div>
                                    </div> 
                            ))
                        }
                    </div>
                </div>
                <div className="space-y-4">
                    <p className="text-[#131a2f] text-sm font-serif font-bold">In progress</p>
                    <div className="bg-[#161e3105] p-2 rounded-lg space-y-3">
                        {
                            tasks.filter((task)=> task.status == "in-progress").map((task)=>(
                                    <div className="bg-white shadow-xl rounded-lg p-2 cursor-pointer" key={task._id} onClick={()=>openEditModal(task)}>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm text-[#131a2f] font-medium">{task.title}</p>
                                            <p className="text-xs text-gray-900/70">{task.description}</p>
                                            
                                            <div className="flex items-center justify-between border-t border-gray-700/20 pt-3 mt-2">
                                                <span className="text-xs font-mono text-gray-700/90 flex gap-2 items-center"><Calendar size={14}/> {task.dueDate.split("T")[0]}</span>
                                                <span className="flex items-center justify-center rounded-lg bg-[#e0dfeb] text-[#4338ca] px-2 py-0.5 text-xs">{task.priority}</span>
                                            </div>
                                        </div>
                                    </div> 
                            ))
                        }
                    </div>
                </div>
                <div className="space-y-4">
                    <p className="text-[#131a2f] text-sm font-serif font-bold">Review</p>
                    <div className="bg-[#161e3105] p-2 rounded-lg space-y-3">
                        {
                            tasks.filter((task)=> task.status == "review").map((task)=>(
                                    <div className="bg-white shadow-xl rounded-lg p-2 cursor-pointer" key={task._id} onClick={()=>openEditModal(task)}>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm text-[#131a2f] font-medium">{task.title}</p>
                                            <p className="text-xs text-gray-900/70">{task.description}</p>
                                            
                                            <div className="flex items-center justify-between border-t border-gray-700/20 pt-3 mt-2">
                                                <span className="text-xs font-mono text-gray-700/90 flex gap-2 items-center"><Calendar size={14}/> {task.dueDate.split("T")[0]}</span>
                                                <span className="flex items-center justify-center rounded-lg bg-[#e0dfeb] text-[#4338ca] px-2 py-0.5 text-xs">{task.priority}</span>
                                            </div>
                                        </div>
                                    </div> 
                            ))
                        }
                    </div>
                </div>
                <div className="space-y-4">
                    <p className="text-[#131a2f] text-sm font-serif font-bold">Completed</p>
                    <div className="bg-[#161e3105] p-2 rounded-lg space-y-3">
                        {
                            tasks.filter((task)=> task.status == "completed").map((task)=>(
                                    <div className="bg-white shadow-xl rounded-lg p-2 cursor-pointer" key={task._id} onClick={()=>openEditModal(task)}>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm text-[#131a2f] font-medium">{task.title}</p>
                                            <p className="text-xs text-gray-900/70">{task.description}</p>
                                            
                                            <div className="flex items-center justify-between border-t border-gray-700/20 pt-3 mt-2">
                                                <span className="text-xs font-mono text-gray-700/90 flex gap-2 items-center"><Calendar size={14}/> {task.dueDate.split("T")[0]}</span>
                                                <span className="flex items-center justify-center rounded-lg bg-[#e0dfeb] text-[#4338ca] px-2 py-0.5 text-xs">{task.priority}</span>
                                            </div>
                                        </div>
                                    </div> 
                            ))
                        }
                    </div>
                </div>
            </div>
            }

            {   modal.isOpen
                &&
                <TaskModal
                    isOpen={modal.isOpen}
                    task={modal.task}
                    onClose={closeModal}
                    mode={modal.mode}
                    fetchtasks={fetchTasks}
                />
            }
        </div>
    )
}
export default Tasks;