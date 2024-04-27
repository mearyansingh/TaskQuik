import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Home() {

	return (
		<section className="p-3 p-md-4 p-xl-5">
			<Container>
				<Row className="justify-content-center">
					<Col sm={12} xxl={11}>
						<Card className="border-light-subtle shadow-sm">
							<Row className="g-0">
								<Col sm={12} md={6}>
									<Image fluid className="rounded-start w-100 h-100 object-fit-cover" src="https://images.unsplash.com/photo-1611223235982-891064f27716?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="In lifting others we rise." />
								</Col>
								<Col sm={12} md={6} className="d-flex align-items-center justify-content-center">
									<Card.Body className="p-3 p-md-4 p-xl-5 w-100">
										<div className="mb-5">
											<div className="text-center mb-4">
												<span className='fw-bold'>TaskQuik</span>
											</div>
											<h2 className="h4 text-center">Want to stay organized?</h2>
											<h3 className="fs-6 fw-normal text-secondary text-center m-0">Please choose from an option below</h3>
										</div>
										<div className="d-grid gap-3 ">
											<Button as={Link} to='/create-task' size="lg" variant='dark' type="button">Create New Task</Button>
											<Button as={Link} to='/tasks' size="lg" type="button">View Tasks</Button>
										</div>
									</Card.Body>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</Container>
		</section >
	)
}

export default Home