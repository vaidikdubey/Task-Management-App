import { asyncHandler } from "../utils/async-handler.js";
import { Project } from "../models/project.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { UserRolesEnum } from "../utils/constants.js";

const getProjects = asyncHandler(async (req, res) => {
  //get user id from req.user._id
  //find all projects based on user id
  //return response

  const userId = req.user._id

  try {
    const projects = await Project.find({
      createdBy: userId
    }).populate("createdBy", "username fullname avatar");

    if (!projects) {
      throw new ApiError(404, "No project found")
    }

    return res.status(200)
      .json(new ApiResponse(200, projects, "Projects found successfully"));
    
  } catch (error) {
    throw new ApiError(500, "Error finding projects", error)
  }
});

const getProjectById = asyncHandler(async (req, res) => {
  //get project id from req.params
  //find project based on id
  //return response

  const { projectId } = req.params;

  if (!projectId) {
    throw new ApiError(404, "Project id not found")
  }

  try {
    const project = await Project.findById(projectId)

    if (!project) {
      throw new ApiError(404, "Project not found")
    }

    return res.status(200)
      .json(new ApiResponse(200, project, "Project found successfully"));
    
  } catch (error) {
    throw new ApiError(500, "Error finding project", error);
  }
});

const createProject = asyncHandler(async (req, res) => {
  //get name, description from req.body
  //get user id from req.user._id
  //validate data
  //create new project
  //create new project member and assign role as project admin -> for protected routes
  //save db
  //return response

  const { name, description } = req.body;

  if (!name) {
    throw new ApiError(400, "Project name is required");
  }

  const userId = req.user._id;

  try {
    const newProject = await Project.create({
      name,
      description,
      createdBy: userId
    })

    const newProjectMember = await ProjectMember.create({
      project: newProject._id,
      user: userId,
      role: UserRolesEnum.PROJECT_ADMIN
    })

    return res.status(201)
      .json(new ApiResponse(201, {
        project: newProject,
        projectMember: newProjectMember
      }, "Project created successfully"));
  } catch (error) {
    throw new ApiError(500, "Error creating project", error);
  }
});

const updateProject = asyncHandler(async (req, res) => {
  //get data from req.body
  //get project id from req.params
  //update db with new data
  //return response

  const { name, description } = req.body;

  const { projectId } = req.params;

  try {
    const project = await Project.findByIdAndUpdate(projectId, {
      name,
      description
    }, { new: true, runValidators: true });

    if (!project) {
      throw new ApiError(404, "Project not found")
    }

    return res.status(200)
      .json(new ApiResponse(200, project, "Project updated successfully"));
    
  } catch (error) {
    throw new ApiError(500, "Error updating project", error);
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  //get project id from req.params
  //find project based on id
  //delete project
  //return response
  
  const { projectId } = req.params;

  try {
    const delProject = await Project.findOneAndDelete(projectId);

    if (!delProject) {
      throw new ApiError(404, "Project not found")
    }

    return res.status(200)
      .json(new ApiResponse(200, delProject, "Project deleted successfully"));
    
  } catch (error) {
    throw new ApiError(500, "Error deleting project", error);
  }
});

const getProjectMembers = asyncHandler(async (req, res) => {
  //get project id from req.params
  //find all project members on project id
  //return response

  const { projectId } = req.params;

  if (!projectId) {
    throw new ApiError(404, "Invalid or missing project id");
  }

  try {
    const projectMembers = await ProjectMember.find({
      project: projectId
    })
      .populate("project", "name createdBy")
      .populate("user", "username fullname avatar");
    
    if (!projectMembers) {
      throw new ApiError(404, "Project members not found");
    }

    return res.status(200)
      .json(new ApiResponse(200, projectMembers, "Project members found successfully"));
    
  } catch (error) {
    throw new ApiError(500, "Error finding project memebers", error)
  }
});

const addMemberToProject = asyncHandler(async (req, res) => {
  //get project id from req.params
  //get user id and role from req.body
  //find user based on user and project id in projectmember db -> if found alread exists
  //if no user found create new project member
  //create new document with data in projectmember db
  //return response

  const { projectId } = req.params;

  const { userId, role } = req.body;

  if (!projectId || !userId) {
    throw new ApiError(404, "Invalid or missing project/user id");
  }

  try {
    const existingProjectMember = await ProjectMember.findOne({
      project: projectId,
      user: userId
    });

    if (existingProjectMember) {
      throw new ApiError(400, "User is already a member of this project");
    }

    const projectMember = await ProjectMember.create({
      project: projectId,
      user: userId,
      role: role
    })

    return res.status(201)
      .json(new ApiResponse(201, projectMember, "Project member added successfully"));
    
  } catch (error) {
    throw new ApiError(500, "Error adding project member", error);
  }
});

const deleteMember = asyncHandler(async (req, res) => {
  //get projectMember from req.params
  //find and delete projectMember based on projectMember id
  //return response

  const { memberId } = req.params;

  if (!memberId) {
    throw new ApiError(404, "Missing project member id");
  }

  try {
    const delMember = await ProjectMember.findByIdAndDelete(memberId);

    if (!delMember) {
      throw new ApiError(404, "Project member not found");
    }

    return res.status(200)
      .json(new ApiResponse(200, delMember, "Project member deleted successfully"));
    
  } catch (error) {
    throw new ApiError(500, "Error deleting project member", error);
  }
});

const updateMemberRole = asyncHandler(async (req, res) => {
  //get projectMember id from req.params
  //get role from req.body
  //find project member based on id
  //update member role
  //save db
  //return response

  const { memberId } = req.params;

  const { role } = req.body;

  if (!memberId) {
    throw new ApiError(404, "Missing project member id");
  }

  if (!role) {
    throw new ApiError(404, "Member role cannot be empty");
  }

  try {
    const projectMember = await ProjectMember.findByIdAndUpdate(memberId, {
      role
    }, { new: true, runValidators: true });

    if (!projectMember) {
      throw new ApiError(404, "Project member not found");
    }

    return res.status(200)
      .json(new ApiResponse(200, projectMember, "Project member role updated successfully"));
    
  } catch (error) {
    console.error(error)
    throw new ApiError(500, "Error updating project member role", error);
  }
});

export {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
};
