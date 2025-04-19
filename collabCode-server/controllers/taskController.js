import Task from "../models/Task.js";
import Project from "../models/Project.js";
import mongoose from "mongoose";
import {ObjectId} from "bson"

// Create a task
export const createTask = async (req, res) => {
    try {
        const { title, description, priority, deadline, project, assignedTo } = req.body;

        const newTask = await Task.create({
            title,
            description,
            priority,
            deadline,
            project,
            assignedTo,
            createdBy: req.user.id
        });

        res.status(201).json({ message: "Task created", task: newTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get tasks for a specific project
export const getTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const id = mongoose.Types.ObjectId.createFromHexString(projectId);
        console.log()
        const tasks = await Task.find({ project: id })
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email");

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a task
export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const {status} = req.body;

        const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
        if (!task) return res.status(404).json({ message: "Task not found" });

        res.json({ message: "Task updated", task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findByIdAndDelete(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add comment to task
export const addComment = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { text } = req.body;

        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        task.comments.push({
            user: req.user.id,
            text
        });

        await task.save();
        res.json({ message: "Comment added", task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
