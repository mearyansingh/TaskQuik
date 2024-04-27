import { useEffect } from 'react';
import { toast } from 'react-toastify'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice'
import { Dropdown, Image } from 'react-bootstrap';


function Header() {

	/**Accessing the redux state */
	const { user, isError, message, isSuccess } = useSelector(state => state.auth)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	/**Function to handle logout  */
	const onLogout = () => {
		dispatch(logout());
	}

	/**Lifecycle method */
	useEffect(() => {

		if (isError) {
			toast.error(message)
		}

		//Redirect when logged out
		if (isSuccess && !user) {
			toast.success('User logged out successfully!')
			navigate('/login'); // Check if this navigates to the "/login" route
		}

		//Reset all the fields 
		dispatch(reset())
	}, [isError, isSuccess, user, message, navigate, dispatch])

	return (
		<Navbar collapseOnSelect expand="lg" className="bg-warning bg-gradient sticky-top">
			<Container>
				<Navbar.Brand as={Link} to="/" className='fw-bold'>TaskQuik</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className='ms-auto align-items-start'>
						{user ? (
							<>
								{/* <Nav.Link as="button" type='button' className='fw-semibold' onClick={onLogout}><i className="bi bi-box-arrow-in-left me-1"></i>Logout</Nav.Link> */}
								{/* <Nav.Link as={Link} type='button' className='fw-semibold' to="/profile">profile</Nav.Link> */}
								<Nav.Link as={Link} type='button' className='fw-semibold' to="/tasks">Tasks</Nav.Link>
								<Dropdown data-bs-theme="dark">
									<Dropdown.Toggle id="dropdown-basic" className="d-flex align-items-center text-dark text-decoration-none bg-transparent border-0">
										<Image fluid src="https://github.com/mdo.png" alt="user-avatar" width="32" height="32" className="rounded-circle me-2" />
										<span className='fw-semibold text-capitalize'>{user?.user?.name}</span>
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item as={Link} to="/profile">Go to profile</Dropdown.Item>
										<Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
										<Dropdown.Item href="#/action-3">Logout all</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</>

						) : (
							<>
								<Nav.Link as={Link} to="/login" className='fw-semibold'><i className="bi bi-box-arrow-in-right me-1"></i>Login</Nav.Link>
								<Nav.Link as={Link} to="/register" className='fw-semibold'><i className="bi bi-person-fill me-1"></i>Register</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container >
		</Navbar >
	);
}

export default Header;

