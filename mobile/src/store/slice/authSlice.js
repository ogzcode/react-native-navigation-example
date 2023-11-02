import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { login, register, getProfile } from "../../services/requestServices";

import { setToken } from "../../services/tokenServices";

export const loginAsync = createAsyncThunk(
    "login",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await login(username, password);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const registerAsync = createAsyncThunk(
    "register",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await register(email, password);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getProfileAsync = createAsyncThunk(
    "getProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getProfile();
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuth: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                setToken(action.payload.token);
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuth = false;
                state.error = action.payload;
            })
            .addCase(registerAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.data.user;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuth = false;
                state.error = action.payload;
            })
            .addCase(getProfileAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getProfileAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.user;
            })
            .addCase(getProfileAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuth = false;
                state.error = action.payload;
            });
    }
});

export const { clearError, setAuth } = authSlice.actions;

export default authSlice.reducer;