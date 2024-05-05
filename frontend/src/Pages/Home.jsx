import { Button, Col, Image, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import taskManageImg from '../assets/images/task-manage.jpg'

function Home() {

	const navigate = useNavigate()

	return (
		<>
			<Col className="py-5">
				<Row className="flex-lg-row-reverse align-items-center g-5">
					<Col sm={8} lg={6} className="col-10">
						<Image
							fluid
							src={taskManageImg}
							className="d-block mx-lg-auto img-fluid"
							alt="hero-img"
							width="700"
							height="500"
							loading="lazy"
						/>
					</Col>
					<Col className="col-lg-6">
						<h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">TaskQuik - Streamline Your Tasks, Boost Your Productivity!</h1>
						<p className="lead">TaskQuik is your ultimate task management companion designed to simplify your workflow and supercharge your productivity. With TaskQuik, you can effortlessly organize your tasks and stay on top of your deadlines. Say goodbye to chaos and hello to efficiency with TaskQuik's intuitive interface, powerful features, and seamless integration. Whether you're a busy professional, a student with deadlines, or a team leader managing projects, TaskQuik has everything you need to conquer your tasks and achieve your goals. Try TaskQuik today and experience the difference!</p>
						<div className="d-grid gap-2 d-md-flex justify-content-md-start">
							<Button as={Link} to='/create-task' type="button" className="btn-lg px-4 me-md-2" size="lg">Create New Task</Button>
							<Button onClick={() => navigate('/tasks')} type="button" variant='outline-secondary' className="px-4" size="lg">My Tasks</Button>
						</div>
					</Col>
				</Row>
			</Col>
		</>
	)
}

export default Home