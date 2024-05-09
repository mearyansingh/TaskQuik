import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authService from './authService'

//Get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

// Register new user
export const register = createAsyncThunk(
	'auth/register', //action type
	async (user, thunkAPI) => {
		try {
			return await authService.register(user)
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},//callback function(payload)
)

// Login user
export const login = createAsyncThunk(
	'auth/login', //action type
	async (user, thunkAPI) => {
		try {
			return await authService.login(user)
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},//callback function(payload)
)

//Logout user
export const logout = createAsyncThunk(
	'auth/logout',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token//we can get token from auth slice using thunkAPI
			const response = await authService.logout(token)
			toast.success('User logout successfully!');
			return response;
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)
//Logout all user
export const logoutAll = createAsyncThunk(
	'auth/logoutAll',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token//we can get token from auth slice using thunkAPI
			const response = await authService.logoutAll(token)
			toast.success('All users logout successfully!');
			return response;
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Get User profile
export const getUserProfile = createAsyncThunk(
	'auth/getUserProfile',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token//we can get token from auth slice using thunkAPI
			return await authService.getUserProfile(token)
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// DELETE User profile
export const deleteUserProfile = createAsyncThunk(
	'auth/deleteProfile',
	async (userId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token//we can get token from auth slice using thunkAPI
			const response = await authService.deleteUserProfile(userId, token)
			// Dispatch toaster message upon successful deletion
			toast.success('Account deleted successfully!');
			return response;
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ''
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.user = null
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.user = null
			})
			.addCase(logout.pending, (state) => {
				state.isLoading = true
			})
			.addCase(logout.fulfilled, (state) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = null
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.user = null
			})
			.addCase(logoutAll.pending, (state) => {
				state.isLoading = true
			})
			.addCase(logoutAll.fulfilled, (state) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = null
			})
			.addCase(logoutAll.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.user = null
			})
			.addCase(getUserProfile.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getUserProfile.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user.user = { user, ...action.payload }
			})
			.addCase(getUserProfile.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(deleteUserProfile.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deleteUserProfile.fulfilled, (state) => {
				state.isLoading = false
				//Update the user state to null
				state.user = null
				// Clear user data from local storage
				localStorage.removeItem('user');
			})
			.addCase(deleteUserProfile.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	}
})

export const { reset } = authSlice.actions
export default authSlice.reducer