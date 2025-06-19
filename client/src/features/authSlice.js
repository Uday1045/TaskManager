import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user || null,
    loading: false,
    error: null,
};


export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/register", userData);
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message || "Registration failed");
    }
});


export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/login", userData);
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message || "Login failed");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
