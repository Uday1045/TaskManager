import Task from "../models/Task.js";


export const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
};


export const createTask = async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({
        user: req.user._id,
        title,
        description,
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
};

export const updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user._id.toString()) {
        return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await task.deleteOne();
        res.json({ message: "Task deleted" });
    } catch (error) {
        console.error("Error in deleteTask:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
