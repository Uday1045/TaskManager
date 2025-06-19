import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTasks,
    addTask,
    deleteTask,
    toggleComplete,
    updateTask,
} from "../features/taskSlice";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.tasks || {});
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        if (isEditing) {
            dispatch(updateTask({ ...formData, _id: editTaskId }));
            setIsEditing(false);
            setEditTaskId(null);
        } else {
            dispatch(addTask(formData));
        }

        setFormData({ title: "", description: "" });
    };

    const startEdit = (task) => {
        setIsEditing(true);
        setEditTaskId(task._id);
        setFormData({ title: task.title, description: task.description });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-indigo-400">My Tasks</h1>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-800 p-6 rounded-xl shadow-md mb-8"
                >
                    <h2 className="text-xl font-semibold mb-4">
                        {isEditing ? "Edit Task" : "Add New Task"}
                    </h2>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Task Title"
                        className="w-full mb-3 px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Task Description"
                        className="w-full mb-4 px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-md transition"
                    >
                        {isEditing ? "Update Task" : "Add Task"}
                    </button>
                </form>


                {loading && <p className="text-center text-gray-300">Loading tasks...</p>}
                {error && <p className="text-center text-red-400">{error}</p>}

                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <li
                            key={task._id}
                            className="bg-gray-800 p-5 rounded-lg shadow flex justify-between items-start"
                        >
                            <div className="flex-1 pr-4">
                                <h3
                                    className={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : "text-white"
                                        }`}
                                >
                                    {task.title}
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => dispatch(toggleComplete(task))}
                                    className="w-5 h-5 accent-indigo-500"
                                />
                                <div className="flex gap-3 mt-2">
                                    <button
                                        onClick={() => startEdit(task)}
                                        className="text-indigo-400 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => dispatch(deleteTask(task._id))}
                                        className="text-red-400 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
