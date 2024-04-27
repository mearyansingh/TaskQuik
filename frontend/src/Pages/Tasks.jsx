import React, { useEffect } from 'react'
import { Badge, Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../features/auth/authSlice';
import { getTasks } from '../features/tasks/taskSlice';
import { Link } from 'react-router-dom';
import { ListEmptyPlaceholder } from '../Components/GlobalComponents';
function Tasks() {

	const { tasks, isLoading, isError, isSuccess, message } = useSelector(state => state.tasks)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getTasks())

		return () => {
			if (isSuccess) {
				dispatch(reset())
			}
		}
	}, [dispatch, isSuccess])

	return (
		<section className="p-3 p-md-4 p-xl-5">
			{tasks?.length > 0 ?
				<ListGroup>
					{
						tasks.map(task => (
							<ListGroup.Item key={task._id} variant="" as={Link} to={`/task/${task._id}`} className='d-flex justify-content-between align-items-start cursor-pointer'>
								<div className='d-flex flex-column  align-items-start justify-content-between '>
									<div className='d-inline-flex align-items-center  gap-3'>
										<h4>{task.description}</h4>
										<Badge bg={task.completed ? "success" : "danger"} className='fw-semibold'>{task.completed ? "Completed" : "Incomplete"}</Badge>
									</div>
									<small className=''>{new Date(task.createdAt).toLocaleString()}</small>
								</div>
								{/* <Button variant='link'><i className='bi bi-trash' /></Button> */}
							</ListGroup.Item>
						))
					}
				</ListGroup>
				:
				<ListEmptyPlaceholder message="Currently there is no tasks." />
			}
		</section>
	)
}

export default Tasks