import {useContext, useReducer} from 'react'
import {Context} from '../../App'
import {axiosAll, axiosReducer} from '../../data-and-functions/axiosAll'

const ReviewForm = ({restaurantId, handleShow}) => {
	// State Hooks and Variables
	// ===========================================================================	
	const {loggedInUser} = useContext(Context)

	const initialState = {
		reviewer: loggedInUser.response._id,
		stars: '',
		body: '',
	}

	const [review, dispatchReview] = useReducer(axiosReducer, initialState)
	const [validate, dispatchValidate] = useReducer(axiosReducer, {valid: false})
	const starMenu = ['1', '2', '3', '4', '5']

	// Event Handlers and Functions
	// ===========================================================================	
	function dropdownChoice(e, key) {
		dispatchReview({
			key: key,
			value: e.target.text,
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

		review.stars !== '' &&
			review.body !== '' &&
			(await axiosAll(
				'POST',
				`/restaurants/${restaurantId}/reviews`,
				loggedInUser.token,
				null,
				review
			)) &&
			handleShow()
	}

	// Return
	// ===========================================================================	
	return (
		<div className='modals-content standard-width flex-centered p-8'>
			<form 
				className='w-full flex-centered flex-col'
				onSubmit={reviewSubmit}
			>

					<p className='mr-2'>
						{validate.missingStars
							? 'Please add a star rating to this review'
							: 'Give it some stars'}
					</p>
					<select
						className='dropdowns w-40'
						defaultValue={review.stars || 'stars'}
						onChange={e => dropdownChoice(e, 'stars')}
					>
						<option value='stars' disabled hidden>
							stars
						</option>
						{starMenu.map(stars => (
							<option key={stars} value={stars}>
								{stars}
							</option>
						)
						)}
					</select>
					<label>
						{validate.missingBody
							? 'Please enter something about your experience'
							: 'Tell us your thoughts'}
					</label>
					<textarea
						className='input text-area scroll w-full rounded-[5px]'
						rows={3}
						onChange={reviewChange}
						value={review.body}
					/>
					<button className='account-button mt-2' type='submit'>
						Submit
					</button>

			</form>
		</div>
	)
}

export default ReviewForm
