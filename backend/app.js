import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { errorMiddleware } from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import noteRoutes from "./routes/note.routes.js";

let app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    return res.status(200).json({ success: true, message: "Welcome to notes api" });
})

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", noteRoutes);

app.use(errorMiddleware);

export default app;