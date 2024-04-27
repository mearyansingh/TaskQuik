// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Container } from "react-bootstrap";
import './App.css'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Header from './Components/LayoutComponents/Header';
import Footer from './Components/LayoutComponents/Footer';
import NoMatch from './Pages/NoMatch'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import CreateTask from './Pages/CreateTask'
import Tasks from './Pages/Tasks'
import Task from "./Pages/Task";
function App() {

	return (
		<>
			<Router>
				<div className='d-flex flex-column justify-content-between min-vh-100'>
					<Header />
					<main className='flex-grow-1 py-4'>
						<Container>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/login' element={<Login />} />
								<Route path='/register' element={<Register />} />
								<Route path='/profile' element={<Profile />} />
								<Route path='/create-task' element={<CreateTask />} />
								<Route path='/tasks' element={<Tasks />} />
								<Route path='/task/:id' element={<Task />} />
								{/* <Route path='/new-ticket' element={<PrivateRoute><NewTicket /></PrivateRoute>} /> */}
								{/* <Route path='/tickets' element={<PrivateRoute><Tickets /></PrivateRoute>} /> */}
								{/* <Route path='/ticket/:ticketId' element={<PrivateRoute> <Ticket /></PrivateRoute>} /> */}
								{/* <Route path='/ticket/:ticketId/notes' element={<PrivateRoute> <Notes /></PrivateRoute>} /> */}
								<Route path='*' element={<NoMatch />} />
							</Routes>
						</Container>
					</main>
					<Footer />
				</div>
			</Router>
			<ToastContainer />
		</>
	)
}

export default App
