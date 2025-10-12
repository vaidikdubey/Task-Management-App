import { Router } from "express";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controllers/note.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router
    .route("/getall/:projectId")
    .get(isLoggedIn, getNotes);

router
    .route("/getnote/:noteId")
    .get(isLoggedIn, getNoteById)

router
    .route("/create/:projectId")
    .post(isLoggedIn, createNote);

router
    .route("/update/:noteId")
    .patch(isLoggedIn, updateNote);

router
    .route("/delete/:noteId")
    .delete(isLoggedIn, deleteNote);

export default router;
