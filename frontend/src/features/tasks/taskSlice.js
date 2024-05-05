import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import taskService from './taskService'

const initialState = {
	tasks: [],
	task: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

// Create task
export const createTask = createAsyncThunk(
	'tasks/create', //action type
	async (taskData, thunkAPI) => {
		try {
			console.log(taskData, "taskData")
			const token = thunkAPI.getState().auth.user.token//we can get token from auth slice using thunkAPI
			const response = await taskService.createTask(taskData, token)
			toast.success('Task created successfully!');
			return response;
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},//callback function(payload)
)

//Get all tasks
// export const getTasks = createAsyncThunk(
// 	'tasks/getTasks', //action type
// 	async (_, thunkAPI) => {
// 		try {
// 			const token = thunkAPI.getState().auth.user.token//we can get token from auth slice using thunkAPI
// 			return await taskService.getTasks(token)
// 		} catch (error) {
// 			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
// 			return thunkAPI.rejectWithValue(message)
// 		}
// 	},//callback function(payload)
// )
// Modify your Redux action to accept pagination and sorting parameters
export const getTasks = createAsyncThunk(
	'tasks/getTasks',
	async ({ completed, sortBy, page, pageSize }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await taskService.getTasks(token, { completed, sortBy, limit: pageSize, skip: (page - 1) * pageSize });
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// // Get all tasks
// export const getTasks = createAsyncThunk(
// 	'tasks/getTasks', // action type
// 	async ({ sortBy, completed, limit, skip }, thunkAPI) => {
// 		try {
// 			const token = thunkAPI.getState().auth.user.token; // Get token from auth slice using thunkAPI
// 			const queryParams = new URLSearchParams({
// 				sortBy,
// 				completed: completed ? 'true' : 'false',
// 				limit,
// 				skip
// 			}).toString();
// 			return await taskService.getTasks(token, queryParams);
// 		} catch (error) {
// 			const message =
// 				(error.response && error.response.data && error.response.data.message) ||
// 				error.message ||
// 				error.toString();
// 			return thunkAPI.rejectWithValue(message);
// 		}
// 	} // callback function(payload)
// );

//Get Single task
export const getTask = createAsyncThunk(
	'tasks/getTask', //action type
	async (taskId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token//we can get token from auth slice using thunkAPI
			return await taskService.getTask(taskId, token)
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},//callback function(payload)
)

//Delete task
export const deleteTask = createAsyncThunk(
	'tasks/deleteTask', //action type
	async (taskId, thunkAPI) => {
		try {
			console.log(taskId, "kk");
			const token = thunkAPI.getState().auth.user.token//we can get token from auth slice using thunkAPI
			const response = await taskService.deleteTask(taskId, token)
			toast.success('Task deleted successfully!');
			return response;
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},//callback function(payload)
)
//UPDATE task
export const updateTask = createAsyncThunk(
	'tasks/updateTask', //action type
	async (data, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token//we can get token from auth slice using thunkAPI
			const response = await taskService.updateTask(data, token)
			toast.success('Task updated successfully!');
			return response;
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},//callback function(payload)
)

const taskSlice = createSlice({
	name: 'tasks',
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
			.addCase(createTask.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.tasks = action.payload
			})
			.addCase(getTasks.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getTasks.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				// console.log(action.payload, "ll")
				state.tasks = action.payload
			})
			.addCase(getTasks.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(getTask.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getTask.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.task = action.payload
			})
			.addCase(getTask.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.isLoading = false
				state.tasks = state.tasks.filter((task) => task._id !== action.payload._id)
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				state.isLoading = false
				const updatedTaskIndex = state.tasks.findIndex(task => task._id === action.payload._id);
				if (updatedTaskIndex !== -1) {
					state.tasks[updatedTaskIndex].completed = action.payload.completed;
					state.tasks[updatedTaskIndex].description = action.payload.description;
				}
			})
	}
})

export const { reset } = taskSlice.actions
export default taskSlice.reducer