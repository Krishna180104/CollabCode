import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, status, assignedTo, project, dueDate } = req.body;
        const task = await Task.create({
            title,
            description,
            status,
            assignedTo,
            project,
            dueDate,
            createdBy: req.user.id
        });

        res.status(201).json({ message: "Task created successfully",task});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const tasks = await Task.find({ project: projectId }).populate('assignedTo', 'name email').populate('createdBy', 'name email');

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const updated = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
        res.json({ message: "Task Updated", task: updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        await Task.findByIdAndDelete(taskId);
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}