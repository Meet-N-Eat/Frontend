import React from 'react'

const Pagination = ({cardsPerPage, totalCards, paginate}) => {
	const pageNumbers = []

	// To access the amount of page numbers, we use Math.ceil to round up the total total amount of cards divided by cards per page
	for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
		pageNumbers.push(i)
	}

	return (
		<ul className='text-white flex justify-center gap-x-2'>
			{pageNumbers.map(number => (
				<li key={number} className='cursor-pointer' onClick={() => paginate(number)}>
					{number}
				</li>
			))}
		</ul>
	)
}

export default Pagination
