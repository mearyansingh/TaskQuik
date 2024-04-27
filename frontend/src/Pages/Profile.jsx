import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Container, Image } from 'react-bootstrap'
import { deleteUserProfile, getUserProfile, reset } from '../features/auth/authSlice'
import { ListEmptyPlaceholder, Loader } from '../Components/GlobalComponents'

function Profile() {

	const { user, isLoading, isError, message } = useSelector(state => state.auth)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(getUserProfile())
		dispatch(reset())
	}, [dispatch])

	// Update onDeleteUserProfile function
	const onDeleteUserProfile = async () => {
		try {
			await dispatch(deleteUserProfile(user?.user?._id));
			navigate('/register');
		} catch (error) {
			// Handle any errors here, if necessary
			// Display an error toaster message, if required
			toast.error('Failed to delete account. Please try again later.');
		}
	};

	return (
		<section className="p-3 p-md-4 p-xl-5">
			{/* <Container> */}
			{isLoading ?
				<Loader />
				:
				<>
					{user ?
						<Card className="mb-4 custom-animate-fadeup border-light-subtle shadow-sm">
							<Card.Body className='p-3 p-md-4 p-xl-5'>
								<div className="d-flex gap-3 gap-sm-4 justify-content-center align-items-center flex-column flex-sm-row">
									<div className="flex-shrink-0">
										<Image
											fluid
											src="https://github.com/mdo.png"
											alt="profile_img"
											width={80}
											height={80}
											className='rounded-circle'
										/>
									</div>
									<div className="flex-grow-1">
										<Card.Title className='fw-semibold text-capitalize text-center text-sm-start '>{user.user.name}</Card.Title>
										<Card.Subtitle className='text-center text-sm-start '>{user.user.email}</Card.Subtitle>
										{/* <Card.Text className='text-center text-sm-start mt-1'>{user.user.age}</Card.Text> */}
										<Button onClick={onDeleteUserProfile} variant="danger" className='mt-2'><i className='bi bi-trash' />
											{isLoading ? <>Account Deleting...</> : <>Delete Account</>}
										</Button>
									</div>
								</div>
							</Card.Body>
						</Card>
						:
						<ListEmptyPlaceholder message={isError ? message : "Something went wrong!"} description="Please try again after some time." />
					}
				</>
			}
			{/* </Container > */}
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

export default Profile