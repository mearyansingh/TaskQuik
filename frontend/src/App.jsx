import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Container } from "react-bootstrap";
import Header from './Components/LayoutComponents/Header';
import Footer from './Components/LayoutComponents/Footer';
import PrivateRoute from "./Components/AppComponents/PrivateRoute";
import { Loader } from "./Components/GlobalComponents";

function App() {

	// Lazy load components
	const Register = lazy(() => import('./Pages/Register'));
	const Login = lazy(() => import('./Pages/Login'));
	const Home = lazy(() => import('./Pages/Home'));
	const Profile = lazy(() => import('./Pages/Profile'));
	const CreateTask = lazy(() => import('./Pages/CreateTask'));
	const Tasks = lazy(() => import('./Pages/Tasks'));
	const NoMatch = lazy(() => import('./Pages/NoMatch'));

	return (
		<>
			<Router>
				<div className='d-flex flex-column justify-content-between min-vh-100'>
					<Header />
					<main className='flex-grow-1'>
						<Container>
							<Suspense fallback={<Loader />}>
								<Routes>
									<Route path='/' element={<Home />} />
									<Route path='/login' element={<Login />} />
									<Route path='/register' element={<Register />} />
									<Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
									<Route path='/create-task' element={<PrivateRoute><CreateTask /></PrivateRoute>} />
									<Route path='/tasks' element={<PrivateRoute><Tasks /></PrivateRoute>} />
									<Route path='*' element={<NoMatch />} />
								</Routes>
							</Suspense>
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
