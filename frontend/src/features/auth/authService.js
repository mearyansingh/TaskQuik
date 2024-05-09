import axios from 'axios'

const API_URL = '/api/users'

//Register user
const register = async (userData) => {

	const response = await axios.post(`${import.meta.env.VITE_BASEURL}${API_URL}`, userData)
	if (response) {
		localStorage.setItem('user', JSON.stringify(response.data))//local storage can only hold string
	}
	return response.data
}

//Login user
const login = async (userData) => {
	const response = await axios.post(`${import.meta.env.VITE_BASEURL}${API_URL}/login`, userData)
	if (response) {
		localStorage.setItem('user', JSON.stringify(response.data))//local storage can only hold string
	}
	return response.data
}

//Logout user
// const logout = () => localStorage.removeItem('user')
const logout = async (token) => {

	// Retrieve token from local storage
	// const user = JSON.parse(localStorage.getItem('user'));

	if (token) {

		const config = {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		};

		// Make logout request with Authorization header(url, data, headers )
		await axios.post(`${import.meta.env.VITE_BASEURL}${API_URL}/logout`, null, config);

		// Remove user data from local storage
		localStorage.removeItem('user');
	} else {
		throw new Error('Token not found');
	}
}

const logoutAll = async (token) => {
	try {
		if (!token) {
			throw new Error('Token not found');
		}

		const config = {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		};

		// Perform the logoutAll request
		const response = await axios.post(`${import.meta.env.VITE_BASEURL}${API_URL}/logoutAll`, null, config);

		// Remove user data from local storage on all devices
		localStorage.removeItem('user');

		// Return response data
		return response.data;
	} catch (error) {
		// Handle errors gracefully
		throw new Error(error.response?.data?.message || error.message);
	}
};

//Get user Profile
const getUserProfile = async (token) => {

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}

		const response = await axios.get(`${import.meta.env.VITE_BASEURL}${API_URL}/me`, config)
		return response.data
	} catch (error) {
		throw new Error(error.response?.data?.message || error.message);
	}


}

//DELETE user profile
const deleteUserProfile = async (userId, token) => {

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const response = await axios.delete(`${import.meta.env.VITE_BASEURL}${API_URL}/me`, config)
		return response.data
	} catch (error) {
		throw new Error(error.response?.data?.message || error.message);
	}
}

const authService = { register, login, logout, getUserProfile, deleteUserProfile, logoutAll }
export default authService