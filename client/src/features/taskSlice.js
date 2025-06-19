import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getToken = () => JSON.parse(localStorage.getItem("user"))?.token;
const API_URL = import.meta.env.VITE_API_URL;
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${API_URL}/api/tasks`, {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue("Failed to load tasks");
    }
});

export const addTask = createAsyncThunk("tasks/addTask", async (task, thunkAPI) => {
    try {
        const res = await axios.post(`${API_URL}/api/tasks`, task, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue("Failed to add task");
    }
});

export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (id, thunkAPI) => {
        try {
           await axios.delete(`${API_URL}/api/tasks/${id}`, {
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});

            return id;
        } catch (err) {
            console.error("DELETE error:", err.response?.data || err.message);
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to delete task"
            );
        }
    }
);
export const updateTask = createAsyncThunk("tasks/updateTask", async (task, thunkAPI) => {
    try {
       const res = await axios.put(
    `${API_URL}/api/tasks/${task._id}`,
    {
        title: task.title,
        description: task.description,
    },
    {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    }
);

        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(
            err.response?.data?.message || "Failed to update task"
        );
    }
});

export const toggleComplete = createAsyncThunk("tasks/toggleComplete", async (task, thunkAPI) => {
    try {
       const res = await axios.put(`${API_URL}/api/tasks/${task._id}`, {
    ...task,
    completed: !task.completed,
}, {
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue("Failed to update task");
    }
});

const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.unshift(action.payload);
            })


            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task._id !== action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(t => t._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })



            .addCase(toggleComplete.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(t => t._id === action.payload._id);
                state.tasks[index] = action.payload;
            });
    },
});

export default taskSlice.reducer;
