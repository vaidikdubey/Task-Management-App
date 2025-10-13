import { asyncHandler } from "../utils/async-handler.js";
import { ProjectNote } from "../models/note.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import mongoose from "mongoose";

const getNotes = asyncHandler(async (req, res) => {
  //get project id from req.params
  //find all notes with that project
  //return all notes

  try {
    const { projectId } = req.params;

    if (!projectId) {
      throw new ApiError(404, "Project not found")
    }

    const notes = await ProjectNote.find({
      project: new mongoose.Types.ObjectId(projectId)
    }).populate("createdBy", "username fullname avatar") //Fetch data from user model by using reference in createdBy field of note model

    if (!notes) {
      throw new ApiError(404, "No notes found")
    }
    
    return res.status(200)
      .json(new ApiResponse(200, notes, "Notes found successfully"));
    
  } catch (error) {
    throw new ApiError(500, "Error finding notes", [error], error.stack);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  //get note id from params
  //find note based on id
  //return note

  const { noteId } = req.params;

  if (!noteId) {
    throw new ApiError(404, "Invalid note id")
  }

  try {
    const note = await ProjectNote.findById(noteId);

    if (!note) {
      throw new ApiError(404, "Note not found")
    }

    return res.status(200)
    .json(new ApiResponse(200, note, "Note found successfully"))

  } catch (error) {
    throw new ApiError(500, "Error finding note", [error], error.stack)
  }
});

const createNote = asyncHandler(async (req, res) => {
  //get projectId from req.params
  //get content from req.body
  //get userid from req.user._id
  //verify projectId and content
  // create new note
  //send response

  const { projectId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;
  try {
    if (!projectId || !content) {
      throw new ApiError(400, "Missing projectId or content")
    }

    const note = await ProjectNote.create({
      project: projectId,
      createdBy: userId,
      content
    })

    if (!note) {
      throw new ApiError(500, "Error creating new note")
    }

    return res.status(201)
      .json(new ApiResponse(201, {
        project: projectId,
        createdBy: userId,
        content
      }, "Note created successfully"));

  } catch (error) {
    console.error(error)
    throw new ApiError(500, "Error creating note", [error], error.stack)
  }
});

const updateNote = asyncHandler(async (req, res) => {
  //get note id from req.params
  //get content from req.body
  //find note based on id
  //update note content
  //save note
  //return response

  const { noteId } = req.params
  
  if (!noteId) {
    throw new ApiError(404, "Invalid or missing note")
  }

  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "Content cannot be empty")
  }

  try {
    const note = await ProjectNote.findByIdAndUpdate(noteId, { content }, { new: true, runValidators: true });

    if (!note) {
      throw new ApiError(404, "Note not found")
    }

    return res.status(200)
      .json(new ApiResponse(200, {
        noteId: note._id,
        projectId: note.project,
        content: note.content
      }, "Note updated successfully"));
    
  } catch (error) {
   throw new ApiError(500, "Error updating note", [error], error.stack) 
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  //get noteid from req.params
  //find note based on id
  //delete note
  //return response

  const { noteId } = req.params;

  if (!noteId) {
    throw new ApiError(404, "Note not found")
  }

  try {
    const note = await ProjectNote.findByIdAndDelete(noteId);

    if (!note) {
      throw new ApiError(404, "Invalid note id, note not found")
    }

    return res.status(200)
      .json(new ApiResponse(200, note, "Note deleted successfully"));
    
  } catch (error) {
    throw new ApiError(500, "Error deleting note", [error], error.stack)
  }
});

export { createNote, deleteNote, getNoteById, getNotes, updateNote };
