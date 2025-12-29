import { Router } from "express";
import { createSubTask, createTask, deleteSubTask, deleteTask, getCompletedTasksCount, getTaskById, getTasks, getTasksForUser, updateSubTask, updateTask } from "../controllers/task.controllers.js";
import { isLoggedIn, validateProjectPermission } from "../middlewares/auth.middleware.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
    .route("/getAll/:projectId")
    .get(isLoggedIn, getTasks);

router
    .route("/getTask/:taskId")
    .get(isLoggedIn, getTaskById);

router
    .route("/getUserTasks")
    .get(isLoggedIn, getTasksForUser);

//Added multer middleware
router
    .route("/create/:projectId")
    .post(isLoggedIn, validateProjectPermission(AvailableUserRoles), upload.array("attachment", 5), createTask);

router
    .route("/:projectId/update/:taskId")
    .patch(isLoggedIn, validateProjectPermission(AvailableUserRoles), updateTask);

router
    .route("/:projectId/delete/:taskId")
    .delete(isLoggedIn, validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), deleteTask);

router
    .route("/completed-count")
    .get(isLoggedIn, getCompletedTasksCount);

//Subtask routes
router
    .route("/subtask/:projectId/create/:taskId")
    .post(isLoggedIn, validateProjectPermission(AvailableUserRoles), createSubTask);

router
    .route("/subtask/:projectId/update/:subtaskId")
    .patch(isLoggedIn, validateProjectPermission(AvailableUserRoles), updateSubTask);

router
    .route("/subtask/:projectId/delete/:subtaskId")
    .delete(isLoggedIn, validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), deleteSubTask);

export default router;
