import { useEffect, useState } from 'react'
import { Form, Button, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTask } from '../features/tasks/taskSlice'
import { reset } from '../features/auth/authSlice'
import { Loader } from '../Components/GlobalComponents'

function CreateTask() {


	const { isLoading, isError, isSuccess, message } = useSelector(state => state.tasks)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	/**Initial state */
	const [description, setDescription] = useState('')
	const [completed, setCompleted] = useState(false);

	/**Lifecycle method */
	useEffect(() => {
		if (isError) {
			toast.error(message)
		}
		//Redirect when submit the ticket without error
		// if (isSuccess) {
		// 	// dispatch(reset())
		// 	// toast.success('Task created successfully')
		// 	navigate('/tasks')
		// }
		//Reset all the fields 
		dispatch(reset())
	}, [isError, isSuccess, message, navigate, dispatch])

	function onHandleSubmit(e) {
		e.preventDefault()
		console.log(description, completed)
		dispatch(createTask({ description, completed }))
	}

	return (
		<section className="p-3 p-md-4 p-xl-5">
			<Container>
				{isLoading ?
					<Loader />
					:
					<Card className='border-light-subtle shadow-sm'>
						<Card.Body className='p-3 p-md-4 p-xl-5'>
							<Button as={Link} to='/' variant="link" className="icon-link icon-link-hover d-inline-flex align-items-center lh-1 text-decoration-none gap-1 text-dark fw-semibold p-0 mb-3 mb-md-0">
								<i className='bi bi-arrow-left'></i>
								Back
							</Button>
							<h1 className='text-center'>Create new task</h1>
							<p className='text-center'>Please fill out the form below</p>
							<Form onSubmit={onHandleSubmit}>
								<Form.Group className="mb-3" controlId="description">
									<Form.Label>Description</Form.Label>
									<Form.Control as="textarea" required rows={3} placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
								</Form.Group>
								<Form.Check
									type="radio"
									name="completionStatus"
									label="Complete"
									id="complete"
									value="complete"
									checked={completed}
									onChange={() => setCompleted(!completed)}
								/>
								<Form.Check
									type="radio"
									name="completionStatus"
									label="Incomplete"
									id="incomplete"
									value="incomplete"
									checked={!completed}
									onChange={() => setCompleted(!completed)}
								/>
								<Button type='submit' className="mx-auto d-block">Submit</Button>
							</Form>
						</Card.Body>
					</Card>
				}
			</Container>
		</section>
	)
}

export default CreateTask