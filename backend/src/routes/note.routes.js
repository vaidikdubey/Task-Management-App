import { Router } from "express";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controllers/note.controllers.js";
import { isLoggedIn, validateProjectPermission } from "../middlewares/auth.middleware.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";

const router = Router();

router
    .route("/getAll/:projectId")
    .get(getNotes);

router
    .route("/:projectId/getNote/:noteId")
    .get(getNoteById);

router
    .route("/create/:projectId")
    .post(validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]) ,createNote);

router
    .route("/:projectId/update/:noteId")
    .patch(validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), updateNote);

router
    .route("/:projectId/delete/:noteId")
    .delete(validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), deleteNote);

export default router;
