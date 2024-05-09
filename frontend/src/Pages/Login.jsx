import { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { Loader } from '../Components/GlobalComponents'

function Login() {

	/**Initial state */
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const [showPassword, setShowPassword] = useState(false);

	//Destructure
	const { email, password } = formData
	const navigate = useNavigate()

	//Used global state from redux
	const { user, isError, isSuccess, isLoading, message } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	/**Lifecycle method */
	useEffect(() => {
		if (isError) {
			toast.error(message)
		}
		//Redirect when logged in
		if (isSuccess && user) {
			toast.success('User logged in successfully')
			navigate('/')
		}
		//Reset all the fields 
		dispatch(reset())
	}, [isError, isSuccess, user, message, navigate, dispatch])

	const onHandleChange = (e) => {
		setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const userData = { email, password }
		dispatch(login(userData))
	}

	return (
		// < !--Registration -- >
		<section className="p-3 p-md-4 p-xl-5">
			<Container>
				{isLoading ?
					<Loader />
					:
					<Row>
						<Col md={6} className="bg-body-secondary ">
							<div className="d-flex flex-column justify-content-between h-100 p-3 p-md-4 p-xl-5">
								<h3 className="m-0">Welcome back!</h3>
								<span className="fw-bold fs-3 rounded mx-auto my-4">TaskQuik</span>
								<p className="mb-0">TaskQuik © 2024</p>
							</div>
						</Col>
						<Col md={6} className="bg-light-subtle">
							<div className="p-3 p-md-4 p-xl-5">
								<div className="row">
									<div className="col-12">
										<div className="mb-5">
											<h2 className="h3">Login</h2>
											<h3 className="fs-6 fw-normal text-secondary m-0">Enter your details to login</h3>
										</div>
									</div>
								</div>
								<Form onSubmit={handleSubmit}>
									<Row className="gy-3 gy-md-4 overflow-hidden">
										<Col sm={12}>
											<Form.Label htmlFor='email'>Email<span className="text-danger">*</span></Form.Label>
											<Form.Control
												id="email"
												name="email"
												type="email"
												placeholder="Enter email"
												required
												value={email}
												onChange={onHandleChange}
											/>
										</Col>
										<Col sm={12}>
											<Form.Label htmlFor='password'>Password<span className="text-danger">*</span></Form.Label>
											<div className="position-relative">
												<Form.Control
													id="password"
													name="password"
													// type="password"
													type={showPassword ? 'text' : 'password'}
													placeholder="Enter password"
													required
													value={password}
													onChange={onHandleChange}
												/>
												{password !== "" &&
													<span
														className={`position-absolute end-0 top-50 translate-middle cursor-pointer lh-1 fs-4 bi  ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}
														onClick={() => setShowPassword((prevState) => !prevState)}
													/>
												}
											</div>
										</Col>
										<Col sm={12}>
											<div className="d-grid">
												<Button variant="primary" type="submit">Login</Button>
											</div>
										</Col>
									</Row>
								</Form>
								<Row>
									<Col>
										<hr className="mt-5 mb-4 border-secondary-subtle" />
										<p className="m-0 text-secondary text-end">If no account? <Link to="/register" className="link-primary text-decoration-none">Register</Link></p>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				}
			</Container>
		</section>
	)
}

export default Login