import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { Task } from "../models/task.models.js";
import { SubTask } from "../models/subtask.models.js";
import { UserRolesEnum } from "../utils/constants.js";
import { Project } from "../models/project.models.js";

const getTasks = asyncHandler(async (req, res) => {
  //get project id from req.params
  //get assigned and status from req.query
  //add filters based on assigned and status
  //find task based on status
  //return response

  const { projectId } = req.params;

  if (!projectId) {
    throw new ApiError(400, "Project id is required");
  }

  const filter = { project: projectId };

  //optional filters from req.query
  if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;
  if (req.query.assignedBy) filter.assignedBy = req.query.assignedBy;
  if (req.query.status) filter.status = req.query.status;

  try {
    const tasks = await Task.find(filter)
      .populate("assignedTo", "username fullname avatar")
      .populate("assignedBy", "username fullname avatar");
    
    return res.status(200)
      .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Error fetching notes", [error], error.stack)
  }
});

const getTaskById = asyncHandler(async (req, res) => {
  //get taskId from req.params
  //find task based on task id
  //return response

  const { taskId } = req.params;

  if (!taskId) {
    throw new ApiError(400, "Task ID is required");
  }

  try {
    const task = await Task.findById(taskId);

    return res.status(200)
      .json(new ApiResponse(200, task, "Task fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Error fetching task", [error], error.stack);
  }
});

const createTask = asyncHandler(async (req, res) => {
  //get project id from req.params
  //get {title, description, assignedTo, status} from req.body
  //validate data
  //get attachments from req.files
  //create a new task in db with the given values
  //save db
  //return response

  const { projectId } = req.params;

  if (!projectId) throw new ApiError(400, "Project ID is required");

  const { title, description, assignedTo, status } = req.body;

  let { assignedBy } = req.body;

  if (!title || !assignedTo) throw new ApiError(400, "All fields are required");

  if (!assignedBy || ![UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN].includes(req.user.role)) {
    assignedBy = req.user._id;
  }

  const attachments = req.files?.map((file) => ({
    url: file.path,
    mimetype: file.mimetype,
    size: file.size
  })) || [];

  try {
    const newTask = await Task.create({
      title,
      description,
      project: projectId,
      assignedTo,
      assignedBy,
      status,
      attachments
    })

    return res.status(201)
      .json(new ApiResponse(201, newTask, "Task created successfully"));
  } catch (error) {
    throw new ApiError(500, "Task creation failed", [error], error.stack);
  }
});

const updateTask = asyncHandler(async (req, res) => {
  //get task id from req.params
  //get {title, description, assignedTo, assignedBy, status} from req.body
  //find and update task based on id
  //return response

  const { taskId } = req.params;

  const { title, description, assignedTo, assignedBy, status } = req.body;

  const updateData = {};
  
  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (assignedTo) updateData.assignedTo = assignedTo;
  if (status) updateData.status = status;

  if (assignedBy) {
    if (![UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN].includes(req.user.role)) {
      throw new ApiError(403, "You do not have access to modify assigned by field");
    }
    updateData.assignedBy = assignedBy
  }

  try {
    const task = await Task.findByIdAndUpdate(taskId,
      { $set: updateData },
      { new: true, runValidators: true });
    
    if (!task) throw new ApiError(404, "Task not found");

    return res.status(200)
      .json(new ApiResponse(200, task, "Task updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Error updating task", [error], error.stack);
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  //get task id from req.params
  //find and delete task by id
  //return response

  const { taskId } = req.params;

  if (!taskId) throw new ApiError(400, "Task ID is required");

  try {
    const delTask = await Task.findByIdAndDelete(taskId);

    if (!delTask) throw new ApiError(404, "Task not found");

    return res.status(200)
      .json(new ApiResponse(200, delTask, "Task deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "Error deleting task", [error], error.stack);
  }
});

const createSubTask = asyncHandler(async (req, res) => {
  //get task id from req.params
  //get {title, description, isCompleted, createdBy} from req.body
  //create new subtask
  //return response

  const { taskId } = req.params;

  const { title, description, isCompleted } = req.body;

  let { createdBy } = req.body;

  if (!createdBy || ![UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN].includes(req.user.role)) {
    createdBy = req.user._id;
  }

  const subTaskData = { title, createdBy, task: taskId };

  if (description !== undefined) subTaskData.description = description;
  if (isCompleted !== undefined) subTaskData.isCompleted = isCompleted;

  try {
    const newSubTask = await SubTask.create(subTaskData);

    return res.status(201)
      .json(new ApiResponse(201, newSubTask, "Sub Task created successfully"));
  } catch (error) {
    throw new ApiError(500, "Error creating sub task", [error], error.stack);
  }
});

const updateSubTask = asyncHandler(async (req, res) => {
  //get subtaskid from req.params
  //get {title, description, isCompleted, createdBy} from req.body
  //validate createdBy field
  //find and update task by id
  //return response

  const { subtaskId } = req.params;

  const { title, description, isCompleted, createdBy } = req.body;

  if (createdBy) {
    if (![UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN].includes(req.user.role)) {
      throw new ApiError(403, "You do not have access to modify created by field");
    }
  }

  const subTaskData = {}

  if (title) subTaskData.title = title;
  if (description) subTaskData.description = description;
  if (isCompleted) subTaskData.isCompleted = isCompleted;

  try {
    const subtask = await SubTask.findByIdAndUpdate(subtaskId,
      { $set: subTaskData },
      { new: true, runValidators: true });
    
    if (!subtask) throw new ApiError(404, "Sub Task not found");

    return res.status(200)
      .json(new ApiResponse(200, subtask, "Sub Task updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Error updating subtask", [error], error.stack);
  }
});

const deleteSubTask = asyncHandler(async (req, res) => {
  //get subtask id from req.params
  //find and delete subtask based on id
  //return response

  const { subtaskId } = req.params
  
  if (!subtaskId) throw new ApiError(400, "SubTask ID is required");

  try {
    const delSubTask = await SubTask.findByIdAndDelete(subtaskId);

    if (!delSubTask) throw new ApiError(404, "SubTask not found");

    return res.status(200)
      .json(new ApiResponse(200, delSubTask, "Sub Task deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "Error deleting subtask", [error], error.stack);
  }
});

const getCompletedTasksCount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const projects = await Project.find({
      createdBy: userId
    }).select("_id");
  
    const projectIds = projects.map(p => p._id);
  
    const stats = await Task.aggregate([
      {
        $match: {
          project: { $in: projectIds },
          status: "done"
        }
      },
      {
        $group: {
          _id: "$project",
          count: { $sum: 1 }
        }
      }
    ])
  
    const result = {};
  
    stats.forEach(s => {
      result[s._id] = s.count
    })

    return res.status(200)
      .json(new ApiResponse(200, result, "Completed tasks count fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Error fetching completed tasks count", [error], error.stack);
  }
})

export {
  createSubTask,
  createTask,
  deleteSubTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateSubTask,
  updateTask,
  getCompletedTasksCount
};
