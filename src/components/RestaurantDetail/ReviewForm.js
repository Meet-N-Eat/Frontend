import useAuth from '../../hooks/useAuth'
import useGlobalReducer from '../../hooks/useGlobalReducer'
import {axiosAll} from '../../data-and-functions/axiosAll'

const ReviewForm = ({restaurantId, setToggle}) => {
	// State Hooks and Variables
	// ===========================================================================
	const {loggedInUser} = useAuth()

	const initialState = {
		reviewer: loggedInUser.response._id,
		stars: '',
		body: '',
	}

	const [review, dispatchReview] = useGlobalReducer(initialState)
	const [validate, dispatchValidate] = useGlobalReducer({valid: false})
	const starMenu = ['1', '2', '3', '4', '5']

	// Event Handlers and Functions
	// ===========================================================================
	function reviewChange(e, key) {
		dispatchReview({
			key: key,
			value: e.target.value,
		})
	}

	async function reviewSubmit(e) {
		e.preventDefault()

		dispatchValidate({
			key: 'missingStars', 
			value: review.stars ? false : true
		})
		dispatchValidate({
			key: 'missingBody', 
			value: review.body ? false: true
		})

		review.stars &&
			review.body &&
			(await axiosAll(
				'POST',
				`/restaurants/${restaurantId}/reviews`,
				loggedInUser.token,
				null,
				review
			)) &&
			setToggle(false)
	}

	// Return
	// ===========================================================================
	return (
		<div className='modals-content standard-width flex-centered p-8'>
			<form className='w-full flex-centered flex-col' onSubmit={reviewSubmit}>
				<p className='mr-2'>
					{validate.missingStars
						? 'Please add a star rating to this review'
						: 'Give it some stars'}
				</p>
				<select
					className='dropdowns w-40'
					defaultValue={review.stars || 'stars'}
					onChange={e => reviewChange(e, 'stars')}
				>
					<option value='stars' disabled hidden>
						stars
					</option>
					{starMenu.map(stars => (
						<option key={stars} value={stars}>
							{stars}
						</option>
					))}
				</select>
				<label>
					{validate.missingBody
						? 'Please enter something about your experience'
						: 'Tell us your thoughts'}
				</label>
				<textarea
					className='input text-area scroll w-full rounded-[5px]'
					rows={3}
					onChange={e => reviewChange(e, 'body')}
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
