import { asyncWrapper } from "../middlewares/asyncWrapper.middleware.js";
import noteModel from "../models/note.model.js";
import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

export let addNote = asyncWrapper(async (req, res)=>{
    let { title, description, priority, status, dueDate } = req.body;
    console.log(req.body);
    console.log("addnote")

    await noteModel.create({ 
        title,
        description, 
        priority,
        status,
        dueDate,
        user: req.user._id
    })

    return res.status(201).json({ success: true, message: "Note added successfully" });
})

export let updateNote = asyncWrapper(async(req, res)=>{
    let { title, description, dueDate, priority, status } = req.body
    let {id} = req.params;
    console.log(`dueDate ${dueDate}`);

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        throw new AppError("Invalid note id", 400);
    }

    let note = await noteModel.findById(id);
    if(!note)
    {
        throw new AppError("Note not found", 404);
    }

    if(note.user.toString() !== req.user._id.toString())
    {
        throw new AppError("You are not authorized to update this note", 403);
    }

    let updatedNote = await noteModel.findByIdAndUpdate(
        id,
        {
            $set: {
                title,
                description,
                status,
                priority,
                dueDate
            }
        },
        {
            new: true
        }
    )
    console.log(updatedNote)

    return res.status(200).json({
        success: true,
        message: "Note updated successfully"
    });
})


export let deleteNote = asyncWrapper(async(req, res)=>{
    let { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        throw new AppError("Invalid note id", 400);
    }

    let note = await noteModel.findById(id);
    if(!note)
    {
        throw new AppError("Note not found", 404);
    }

    if(note.user.toString() !== req.user._id.toString())
    {
        throw new AppError("You are not authorized to update this note", 403);
    }

    await noteModel.findByIdAndDelete(id);

    return res.status(200).json({
        success: true,
        message: "Note deleted successfully"
    });
})


export let getAllNotes = asyncWrapper(async(req, res)=>{
    let userId = req.user._id;

    
    let notes = await noteModel.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        message: "Notes fetched successfully",
        data: notes
    })
})


export let getNoteById = asyncWrapper(async(req, res)=>{
    let { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        throw new AppError("Invalid note id", 400);
    }

    let note = await noteModel.findById(id);

    if(!note)
    {
        throw new AppError("Note not found", 404);
    }

    if(note.user.toString() !== req.user._id.toString())
    {
        throw new AppError("You are not authorized to update this note", 403);
    }

    return res.status(200).json({
        success: true,
        message: "Note fetched successfully",
        data: note
    })
})

export let getNotesStat = asyncWrapper(async(req, res)=>{
    let tasks = await noteModel.find({
        user: req.user._id
    });

    let totalTasks = tasks.length;

    let completed = 0;
    let overDue = 0;
    let inProgress = 0;
    let review = 0;
    let todo = 0;

    let now = new Date();

    tasks.forEach((task)=>{
        switch(task.status)
        {
            case "completed" :
                    completed++;
                    break;
            case "in-progress":
                    inProgress++;
                    break;
            case "review":
                    review++;
                    break;
            case "todo":
                    todo++;
                    break;
        }
        if(task && task.dueDate < now && task.status !== "completed")
        {
            overDue++;
        }
    })

    let completionRate = tasks.length == 0  ? 0 : Math.round((completed / totalTasks)*100);

    let recentActivity = await noteModel.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5);

    return res.status(200).json({
        success: true,
        data: {
            summary: {
                totalTasks,
                completionRate,
                inProgress,
                overDue
            },
            statusBreakdown: {
                completed,
                todo,
                review,
                inProgress: inProgress
            },
            recentActivity
        },
    })
})