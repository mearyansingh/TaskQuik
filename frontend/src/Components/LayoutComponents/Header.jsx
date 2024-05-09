import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Dropdown, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice'
import { useTheme } from '../../Context/ThemeContext';
import UserAvatar from '../../assets/images/avatar.png'

function Header() {

	/**Theme context */
	const { theme, toggleTheme } = useTheme();

	/**Accessing the redux state */
	const { user, isError, message, isSuccess } = useSelector(state => state.auth)

	/** State initialization */
	const [themeTab, setThemeTab] = useState(theme);

	const navigate = useNavigate()
	const dispatch = useDispatch()

	/**Handle theme change */
	const handleThemeChange = (newTheme) => {
		setThemeTab(newTheme)
		if (newTheme === 'auto') {
			const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			toggleTheme(preferredTheme);
		} else {
			toggleTheme(newTheme);
		}
	};

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
		<Navbar collapseOnSelect expand="lg" className="bg-primary bg-gradient sticky-top">
			<Container>
				<Navbar.Brand as={Link} to="/" className='fw-bold text-light'>TaskQuik</Navbar.Brand>
				<div className='d-flex gap-3 flex-grow-1 flex-nowrap align-items-center justify-content-between justify-content-md-end'>
					{user ? (
						<>
							<Dropdown>
								<Dropdown.Toggle id="dropdown-basic" className="p-0 d-flex align-items-center text-dark text-decoration-none bg-transparent border-0">
									<Image fluid src={user?.user?.image ? user?.user?.image : UserAvatar} alt="User avatar" width="32" height="32" className="rounded-circle me-2" />
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
							<Nav.Link as={Link} to="/login" className='fw-semibold'>
								<i className="bi bi-box-arrow-in-right me-1 d-none d-md-inline-block" />
								Login
							</Nav.Link>
							<Nav.Link as={Link} to="/register" className='fw-semibold'>
								<i className="bi bi-person-fill me-1 d-none d-md-inline-block" />
								Register
							</Nav.Link>
						</>
					)}
					<Nav as="ul" variant="pills" className="rounded-2 bg-primary-subtle p-1 flex-row" activeKey={themeTab} onSelect={(eventKey) => handleThemeChange(eventKey)}>
						<Nav.Item className="flex-grow-1 lh-1" as="li">
							<Nav.Link eventKey="light" className={` text-center py-2 px-3 ${theme === 'light' ? 'bg-body text-primary-emphasis' : ''}`}>
								<i className="bi bi-brightness-high-fill"></i>
							</Nav.Link>
						</Nav.Item>
						<Nav.Item className="flex-grow-1 lh-1" as="li">
							<Nav.Link eventKey="dark" className={`text-center py-2 px-3 ${theme === 'dark' ? 'bg-light' : 'text-primary-emphasis'}`}>
								<i className="bi bi-moon-fill"></i>
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</div>
			</Container >
		</Navbar >
	);
}

export default Header;

