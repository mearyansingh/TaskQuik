import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tasksReducer from '../features/tasks/taskSlice';
// import noteReducer from '../features/notes/noteSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		tasks: tasksReducer
	},
});
