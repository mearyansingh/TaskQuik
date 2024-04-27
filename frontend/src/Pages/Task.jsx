import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Button, Card, Container } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loader } from '../Components/GlobalComponents'
import { deleteTask, getTask } from '../features/tasks/taskSlice'
import { reset } from '../features/auth/authSlice'

function Task() {

	const { task, isLoading, isError, message } = useSelector(state => state.tasks)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}
		dispatch(getTask(id))
		dispatch(reset())
	}, [isError, message, dispatch, id])

	console.log(task)

	const onHandleDelete = async (taskId) => {
		// dispatch(deleteTask(taskId))
		try {
			await dispatch(deleteTask(taskId));
			navigate('/tasks');
		} catch (error) {
			// Handle any errors here, if necessary
			// Display an error toaster message, if required
			toast.error('Failed to delete account. Please try again later.');
		}
	}
	return (
		<section className="p-3 p-md-4 p-xl-5">
			<Container>
				{isLoading ?
					<Loader />
					:
					<Card className="mb-4 custom-animate-fadeup border-light-subtle shadow-sm">
						<Card.Body className='p-3 p-md-4 p-xl-5'>
							<Button as={Link} to='/tasks' variant="link" className="icon-link icon-link-hover d-inline-flex align-items-center lh-1 text-decoration-none gap-1 text-dark fw-semibold p-0 mb-3 mb-md-0">
								<i className='bi bi-arrow-left'></i>
								Back
							</Button>
							<div className='mt-3 mt-md-4 mt-xl-5'>
								<div className='d-md-flex align-items-center gap-2 mb-3'>
									<p className='fw-bold mb-0'>Task ID:</p>
									<span>{task._id}</span>
									<span className='ms-2 ms-md-0'>
										<Badge bg={`${task.completed === true ? "success" : "danger"}`} className='fw-semibold'>{task.completed === true ? "Completed" : "Incomplete"}</Badge>
									</span>
								</div>
								<div className='d-md-flex align-items-center gap-2 mb-3'>
									<p className='fw-bold mb-0'>Created on:</p>
									<span>{new Date(task.createdAt).toLocaleString('en-IN')}</span>
								</div>
								<div className=''>
									<p className='fw-bold mb-0'>Description of task:</p>
									<span>{task.description}</span>
								</div>
								<Button>Update</Button>
								<Button variant='danger' onClick={() => onHandleDelete(task._id)}>Delete</Button>
							</div>
						</Card.Body>
					</Card>
				}
			</Container >
			{/* <PopupContainer
            ref={_addNotePopup}
            title="Add Note"
            subTitle="this is subtitle"
            dialogClassName="custom-popup--sm modal-dialog-sm-end"
            isHeader={true}
         >
            <AddNotePopup
               callback={(status, data) => {
                  _addNotePopup.current.closeModal();
                  if (status && data) {
                     //remaining code
                     handleAddNote(data)
                  }
               }}
            />
         </PopupContainer> */}
		</section >
	)
}

export default Task