import mongoose from "mongoose";
import express from 'express';
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { noteSchema } from "../validators/note.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addNote, deleteNote, getAllNotes, getNoteById, getNotesStat, updateNote } from "../controllers/note.controllers.js";

let router = express.Router();

router.use(authMiddleware);

router.post("/", validateMiddleware(noteSchema), addNote);
router.get("/getStat", getNotesStat);
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.patch("/:id", validateMiddleware(noteSchema), updateNote);
router.delete("/:id", deleteNote);

export default router;