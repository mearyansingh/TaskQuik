import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Image } from 'react-bootstrap'
import { deleteUserProfile, getUserProfile, reset } from '../features/auth/authSlice'
import { ConfirmPopup, ListEmptyPlaceholder, Loader, PopupContainer } from '../Components/GlobalComponents'
import UserAvatar from '../assets/images/avatar.png';

function Profile() {

	const { user, isLoading, isError, message } = useSelector(state => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const _deleteAccountPopup = useRef(null)

	useEffect(() => {
		dispatch(getUserProfile())
		dispatch(reset())
	}, [dispatch])

	// Update onDeleteUserProfile function
	const onDeleteUserProfile = async (accId) => {
		try {
			await dispatch(deleteUserProfile(accId));
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
											src={UserAvatar}
											alt="User avatar"
											width={80}
											height={80}
											className='rounded-circle'
										/>
									</div>
									<div className="flex-grow-1">
										<Card.Title className='fw-semibold text-capitalize text-center text-sm-start '>{user.user.name}</Card.Title>
										<Card.Subtitle className='text-center text-sm-start '>{user.user.email}</Card.Subtitle>
										{/* onClick={onDeleteUserProfile} */}
										<Button variant="danger" className='mt-2' onClick={() => _deleteAccountPopup.current.showModal(user?.user?._id)}>
											<i className='bi bi-trash me-1' />
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
			<PopupContainer
				ref={_deleteAccountPopup}
				dialogClassName="custom-popup--sm modal-dialog-sm-end"
				isHeader={false}
			>
				<ConfirmPopup
					popupRef={_deleteAccountPopup}
					title="Delete Account"
					message="Are you sure you want to delete this account?"
					submitBtnText='Delete'
					callback={(status, data) => {
						_deleteAccountPopup.current.closeModal();
						if (status && data) {
							// remaining code
							console.log(data, "kk")
							onDeleteUserProfile(data)
						}
					}}
				/>
			</PopupContainer>
		</section >
	)
}

export default Profile