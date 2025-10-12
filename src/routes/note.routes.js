import { Router } from "express";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controllers/note.controllers.js";
import { isLoggedIn, validateProjectPermission } from "../middlewares/auth.middleware.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";

const router = Router();

router.use("/:projectId", isLoggedIn, validateProjectPermission(AvailableUserRoles))

router
    .route("/getall")
    .get(getNotes);

router
    .route("/getnote/:noteId")
    .get(getNoteById);

router
    .route("/create")
    .post(validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]) ,createNote);

router
    .route("/update/:noteId")
    .patch(validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), updateNote);

router
    .route("/delete/:noteId")
    .delete(validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), deleteNote);

export default router;
