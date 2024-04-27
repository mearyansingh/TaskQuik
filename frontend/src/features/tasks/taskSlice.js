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
         return await taskService.createTask(taskData, token)
      } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
         return thunkAPI.rejectWithValue(message)
      }
   },//callback function(payload)
)

//Get all tasks
export const getTasks = createAsyncThunk(
   'tasks/getTasks', //action type
   async (_, thunkAPI) => {
      try {
         const token = thunkAPI.getState().auth.user.token//we can get token from auth slice using thunkAPI
         return await taskService.getTasks(token)
      } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
         return thunkAPI.rejectWithValue(message)
      }
   },//callback function(payload)
)

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
   'tickets/deleteTask', //action type
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
         .addCase(createTask.pending, (state) => {
            state.isLoading = true
         })
         .addCase(createTask.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.tasks = action.payload
         })
         .addCase(createTask.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
         })
         .addCase(getTasks.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getTasks.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
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
            // state.tasks = action.payload
            console.log(action.payload._id, "action.payload._id")
            state.tasks = state.tasks.filter((task) => task._id !== action.payload._id)
         })
   }
})

export const { reset } = taskSlice.actions
export default taskSlice.reducer