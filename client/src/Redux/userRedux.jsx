import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../Helpers/axios.jsx";

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {},
    isLoading: false,
    error: null,
};

// Signup Thunk
export const login = createAsyncThunk('auth/signup', async (data, { rejectWithValue }) => {
    try {
        const res = axiosInstance.post('auth/login', data);
        toast.promise(
            res,
            {
                loading: "Wait! for signup",
                success: (data) => data?.data?.message,
                error: "Failed to signup"
            }
        );
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

// Logout Thunk
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const res = axiosInstance.post('auth/logout');
        toast.promise(
            res,
            {
                loading: "Wait! for logout",
                success: (data) => data?.data?.message,
                error: "Failed to logout"
            }
        );
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

// Forgot Password Thunk
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, { rejectWithValue }) => {
    try {
        const res = axiosInstance.post('auth/forgot-password', { email });
        toast.success("OTP sent to your email.");
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

// Verify OTP Thunk
// Verify OTP Thunk
export const verifyOtp = createAsyncThunk('auth/verifyOTP', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post('auth/verify-otp', data);
        // Return the response data
        return res.data;
    } catch (error) {
        // Reject the value to handle it in the component
        return rejectWithValue(error?.response?.data);
    }
});


// Reset Password Thunk
// Reset Password Thunk
export const changePassword = createAsyncThunk('auth/resetPassword', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post('auth/reset-password', data);
        toast.success("Password reset successfully.");
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});


// Slice definition
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Add any additional reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.data = payload.data;
               
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('data', JSON.stringify(payload.data));
                
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.isLoggedIn = false;
                state.data = {};
                state.role = "";
            })
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(forgotPassword.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(verifyOtp.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(changePassword.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            });
    },
});

export default authSlice.reducer;
