import { useEffect, useState } from "react";
import { NOTE_API } from "../api/noteApi";
import { toast } from 'react-toastify';

let TaskModal =({ isOpen, onClose, mode, task, fetchtasks })=>{

    let token = localStorage.getItem("accessToken")

    const initialNote = {
                            title: "",
                            description: "",
                            status: "todo",
                            priority: "medium",
                            dueDate: ""
                        };

    let [note, setNote] = useState(initialNote);
    let [errors, setErrors] = useState({});
    let [loading, setLoading] = useState(false);

    useEffect(()=>{
        console.log("model render")
        if(!isOpen)
        {
            return ;
        }
        if(mode == "edit" && task)
        {
            setNote({
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0]  : "" 
            });
        }
        else
        {
            setNote(initialNote);
        }
        setErrors({});
    }, [task, mode, isOpen])

    let handleChange=(e)=>{
        setNote((note)=>({
            ...note,
            [e.target.name]: e.target.value
        }))
        setErrors((errors)=>({
            ...errors,
            [e.target.name]: ""
        }))
    }

    let handleSubmit =async(e)=>{
        setLoading(true);
        e.preventDefault();
        console.log(note)
        try
        {
            if(mode == "edit")
            {
                let response = await NOTE_API.patch(`/${task._id}`, note, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response);
                toast.success(response.data.message)
            }
            else
            {
                let response = await NOTE_API.post("/", note, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response);
                toast.success(response.data.message)
            }
            setNote(initialNote);
            onClose();
            fetchtasks();

        }
        catch(error)
        {
            console.log(error.response);
            if(error?.response?.data?.errors)
            {
                setErrors(error?.response?.data?.errors)
            }
        }
        finally
        {
            setLoading(false)
        }
    }
    
    if(!isOpen)
    {
        return ;
    }

    return (
        <div className="bg-black/50 border border-red-600 fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded px-4 max-w-lg w-full shadow-xl space-y-4 pb-4" >
                <div className="flex items-center justify-between border-b border-black/20 py-4">
                    <h1 className="font-serif text-xl">{mode == "create" ? 'New Task' : 'Update task'} </h1>
                    <button onClick={onClose} className="font-bold py-2 px-4 rounded-lg cursor-pointer flex items-center justify-center bg-black/10 hover:bg-black/20">X</button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-black/65" htmlFor="title">Title</label>
                        <input value={note.title} onChange={handleChange} className="mb-1.5 w-full border border-black/20 outline-none rounded-lg py-2 px-3" type="text" id="title" name="title" placeholder="title" />
                        <span className="text-sm text-gray-700/70">{errors && errors.title}</span>
                    </div>
                    <div>
                        <label htmlFor="description" className="mb-2 block text-sm font-medium text-black/65">Description</label>
                        <textarea value={note.description} onChange={handleChange} name="description" className="mb-1.5 w-full border border-black/20 outline-none rounded-lg py-2 px-3" id="description" placeholder="description"></textarea>
                        <span className="text-sm text-gray-700/70">{errors && errors.description}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div >
                        <label className="mb-2 block text-sm font-medium text-black/65" htmlFor="status">Status</label>
                        <select name="status" value={note.status} onChange={handleChange} className="w-full border border-black/20 px-3 py-2 outline-none">
                            <option value="todo">To do</option>
                            <option value="in-progress">In progress</option>
                            <option value="review">Review</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-black/65" htmlFor="status">Priority</label>
                        <select name="priority" value={note.priority} onChange={handleChange} className="w-full border border-black/20 px-3 py-2 outline-none">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="due-date" className="mb-2 block text-sm font-medium text-black/65">Due date</label>
                    <input value={note.dueDate} onChange={handleChange} className="w-full border border-black/20 px-3 py-2 outline-none" type="date" name="dueDate" id="due-date" />
                </div>

                <div className="flex flex-row gap-3 items-center justify-end">
                    <button onClick={onClose} className="cursor-pointer rounded-lg text-gray-500 font-bold bg-gray-200 py-2 px-4">Cancel</button>
                    <button onClick={handleSubmit} className="cursor-pointer rounded-lg text-white bg-[#131a2f] py-2 px-4 font-bold">
                        {mode == "edit" ? 'Edit task' : 'Create task' }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskModal;