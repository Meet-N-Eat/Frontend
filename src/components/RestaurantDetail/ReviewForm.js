import {useContext, useReducer} from 'react'
import {Dropdown} from 'react-bootstrap'
import {Context} from '../../App'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'

const ReviewForm = ({restaurantId, handleShow}) => {
	const {loggedInUser} = useContext(Context)

	const initialState = {
		reviewer: loggedInUser.response._id,
		stars: '',
		body: '',
	}

	const [review, dispatchReview] = useReducer(axiosReducer, initialState)
	const [validate, dispatchValidate] = useReducer(axiosReducer, {valid: false})
	const starMenu = ['None', '1', '2', '3', '4', '5']

	function starClick(e) {
		e.target.text !== 'None'
			? dispatchReview({
					key: 'stars',
					value: e.target.text,
			  })
			: dispatchReview({
					key: 'stars',
					value: '',
			  })
	}

	function reviewChange(e) {
		dispatchReview({
			key: 'body',
			value: e.target.value,
		})
	}

	async function reviewSubmit(e) {
		e.preventDefault()

		review.stars == ''
			? dispatchValidate({key: 'missingStars', value: true})
			: dispatchValidate({key: 'missingStars', value: false})
		review.body == ''
			? dispatchValidate({key: 'missingBody', value: true})
			: dispatchValidate({key: 'missingBody', value: false})

		review.stars != '' &&
			review.body != '' &&
			(await axiosAll(
				'POST',
				`/restaurants/${restaurantId}/reviews`,
				loggedInUser.token,
				null,
				review
			)) &&
			handleShow()
	}

	return (
		<div className='modal-bg modals-content standard-width'>
			<form onSubmit={reviewSubmit}>
				<div controlId='reviewBody' className='vertical'>
					<Dropdown>
						<label className='mr-2'>
							{validate.missingStars
								? 'Please add a star rating to this review'
								: 'Give it some stars'}
						</label>
						<Dropdown.Toggle className='border border-white hover:bg-white hover:text-black'>
							{review.stars || 'Stars'}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{starMenu.map((menuItem, index) => (
								<Dropdown.Item className='stars' onClick={starClick} key={index}>
									{menuItem}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<label>
						{validate.missingBody
							? 'Please enter something about your experience'
							: 'Tell us your thoughts'}
					</label>
					<textarea
						className='input rounded-[5px]'
						rows={3}
						onChange={reviewChange}
						value={review.body}
					/>
					<button className='account-button mt-2' type='submit'>
						Submit
					</button>
				</div>
			</form>
		</div>
	)
}

export default ReviewForm
