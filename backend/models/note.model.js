import mongoose from 'mongoose';

let noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true ,
        minlength: [5, "Task must be at least 5 characters"],
        maxlength: [500, "Task must not exceed 500 characters"],
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [10, "Description must be at least 5 characters"],
        maxlength: [500, "Description must not exceed 500 characters"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    priority: {
        type: String,
        enum: [
            "low",
            "medium",
            "high"
        ],
        default: "low"
    },
    dueDate: {
        type: Date
    },
    status: {
        type: String,
        enum: [
            "todo",
            "in-progress",
            "review",
            "completed"
        ],
        default: "todo"
    }

},
{
    timestamps: true
});

let noteModel = mongoose.model("note", noteSchema);

export default noteModel;