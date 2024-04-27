import axios from 'axios'

const API_URL = '/api/tasks'


//Create  task
const createTask = async (taskData, token) => {

	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.post(`${import.meta.env.VITE_BASEURL}${API_URL}`, taskData, config)
	return response.data
}

//Get tasks
const getTasks = async (token) => {

	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.get(`${import.meta.env.VITE_BASEURL}${API_URL}`, config)
	return response.data
}

//Get task
const getTask = async (taskId, token) => {

	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}
	const response = await axios.get(`${import.meta.env.VITE_BASEURL}${API_URL}/${taskId}`, config)
	return response.data
}

//DELETE task
const deleteTask = async (taskId, token) => {

	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}
	const response = await axios.delete(`${import.meta.env.VITE_BASEURL}${API_URL}/${taskId}`, config)
	return response.data
}

const authService = { createTask, getTasks, getTask, deleteTask }
export default authService