/**
 * Tasks component that fetches tasks from the backend and displays them in a list.
 * It also provides functionality to sort, filter, and paginate tasks.
 */
import { useEffect, useRef, useState } from 'react'
import { Badge, Button, ListGroup, Pagination, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset } from '../features/auth/authSlice';
import { deleteTask, getTasks, updateTask } from '../features/tasks/taskSlice';
import { ListEmptyPlaceholder } from '../Components/GlobalComponents';
import { UpdateTaskPopup, ConfirmPopup, PopupContainer, Tooltip, ViewTaskPopup } from '../Components/GlobalComponents';

function Tasks() {

	const { tasks, isLoading, isError, isSuccess, message } = useSelector(state => state.tasks)

	const dispatch = useDispatch()
	const navigate = useNavigate()


	/** Initial state */
	const [sortBy, setSortBy] = useState('');
	const [completed, setCompleted] = useState(null);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const totalPages = Math.ceil(tasks.length / pageSize);

	/**Stateless variable */
	const _updateTaskPopup = useRef(null)
	const _deleteTaskPopup = useRef(null)
	const _viewTaskPopup = useRef(null)

	/**Lifecycle method */
	// useEffect(() => {

	// 	if (isError) {
	// 		toast.error(message)
	// 	}

	// 	dispatch(getTasks())

	// 	return () => {
	// 		if (isSuccess) {
	// 			dispatch(reset())
	// 		}
	// 	}
	// }, [dispatch, isSuccess, isError, message])

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		// Fetch tasks when component mounts or when pagination/sorting parameters change
		dispatch(getTasks({ completed, sortBy, page, pageSize }));
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess, isError, message, completed, sortBy, page, pageSize]);

	/** function to handle update task */
	const handleTaskUpdate = (data) => {
		dispatch(updateTask(data))
	}

	/** Function to handle pagination navigation **/
	function handlePageChange(page) {
		setPage(page);
	}

	const onHandleDelete = async (taskId) => {
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
		<>
			<section className="py-3 py-md-4 py-xl-5">
				<div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
					<div className="form-floating">
						<Form.Select className="form-select" id="floatingSelect" value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Floating label select example">
							<option value="">Sort by</option>
							<option value="createdAt:desc">Sort by Newest</option>
							<option value="createdAt:asc">Sort by Oldest</option>
						</Form.Select>
						<label htmlFor="floatingSelect">Tasks</label>
					</div>
					<Form.Check
						type="switch"
						id="completed-switch"
						label="Show completed tasks"
						checked={completed === true}
						onChange={(e) => setCompleted(e.target.checked ? true : null)}
					/>
				</div>
				{tasks?.length > 0 ?
					<ListGroup>
						{
							tasks.map(task => (
								<ListGroup.Item key={task._id} variant="" className='d-md-flex justify-content-between align-items-start gap-1 '>
									<div className='d-flex flex-column align-items-start justify-content-between gap-2'>
										<div className='d-inline-flex align-items-center flex-wrap gap-1'>
											<h4 className='mb-0 lh-1'>{task.description}</h4>
											<Badge className={`fw-normal ${task.completed ? "bg-success-subtle text-success-emphasis" : "bg-warning-subtle text-warning-emphasis"}`}>{task.completed ? "Completed" : "Incomplete"}</Badge>
										</div>
										<small className='text-body-tertiary'>{new Date(task.createdAt).toLocaleString()}</small>
									</div>
									<div className='mt-3 mt-md-0 hstack gap-2'>
										<Tooltip content="View task">
											<Button variant='link' className='border text-body-tertiary' onClick={() => _viewTaskPopup.current.showModal({ task })}><i className="bi bi-eye" /></Button>
										</Tooltip>
										<Tooltip content="Update task">
											<Button variant='link' className='border text-body-tertiary' onClick={() => _updateTaskPopup.current.showModal({ task })}><i className='bi bi-pencil' /></Button>
										</Tooltip>
										<Tooltip content="Delete task">
											<Button variant='link' className='border' onClick={() => _deleteTaskPopup.current.showModal(task._id)}><i className=' text-danger bi bi-trash' /></Button>
										</Tooltip>
									</div>
								</ListGroup.Item>
							))
						}
					</ListGroup>
					:
					<ListEmptyPlaceholder message="Currently there is no tasks." />
				}

				{tasks?.length > 0 && (tasks?.length >= pageSize) &&
					<Pagination className="mt-3">
						<Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} >
							Previous
						</Pagination.Prev>
						<Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={tasks.length < pageSize} >
							Next
						</Pagination.Next>
					</Pagination>
				}
			</section >
			<PopupContainer
				ref={_updateTaskPopup}
				title="Update Task"
				subTitle="Fill the details to update the task."
				dialogClassName="custom-popup--sm modal-dialog-sm-end"
				isHeader={true}
			>
				<UpdateTaskPopup
					popupRef={_updateTaskPopup}
					callback={(status, data) => {
						_updateTaskPopup.current.closeModal();
						if (status && data) {
							//remaining code
							handleTaskUpdate(data)
						}
					}}
				/>
			</PopupContainer>
			<PopupContainer
				ref={_deleteTaskPopup}
				dialogClassName="custom-popup--sm modal-dialog-sm-end"
				isHeader={false}
			>
				<ConfirmPopup
					popupRef={_deleteTaskPopup}
					title='Delete task'
					message="Are you sure you want to delete this task?"
					submitBtnText="Delete"
					callback={(status, data) => {
						_deleteTaskPopup.current.closeModal();
						if (status && data) {
							//remaining code
							onHandleDelete(data)
						}
					}}
				/>
			</PopupContainer>
			<PopupContainer
				ref={_viewTaskPopup}
				title="Update task"
				subTitle="Fill the details to update the task. "
				dialogClassName="custom-popup--sm modal-dialog-sm-end"
				isHeader={false}
			>
				<ViewTaskPopup
					popupRef={_viewTaskPopup}
					callback={() => {
						_viewTaskPopup.current.closeModal();
					}}
				/>
			</PopupContainer>
		</>
	)
}

export default Tasks