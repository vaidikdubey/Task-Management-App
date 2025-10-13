import { Router } from "express";
import { addMemberToProject, createProject, deleteMember, deleteProject, getProjectById, getProjectMembers, getProjects, updateMemberRole, updateProject } from "../controllers/project.controllers.js";
import { isLoggedIn, validateProjectPermission } from "../middlewares/auth.middleware.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";

const router = Router();

router
    .route("/create")
    .post(isLoggedIn, createProject);

router.
    route("/getAll")
    .get(isLoggedIn, getProjects);

router
    .route("/getProject/:projectId")
    .get(isLoggedIn, getProjectById);

router
    .route("/update/:projectId")
    .patch(isLoggedIn, validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), updateProject);

router
    .route("/delete/:projectId")
    .delete(isLoggedIn, validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), deleteProject);

//project members routes
router
    .route("/member/getAll/:projectId")
    .get(isLoggedIn, getProjectMembers);

router
    .route("/member/add/:projectId")
    .post(isLoggedIn, validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), addMemberToProject);

router
    .route("/member/:projectId/delete/:memberId")
    .delete(isLoggedIn, validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), deleteMember);

router
    .route("/member/:projectId/updateRole/:memberId")
    .patch(isLoggedIn, validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), updateMemberRole);

export default router;
