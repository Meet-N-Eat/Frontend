import React, { useState } from 'react'

const Pagination = ({cardsPerPage, totalCards, paginate}) => {
	const pageNumbers = []
	const [current, setCurrent] = useState(0)

	// To access the amount of page numbers, we use Math.ceil to round up the total total amount of cards divided by cards per page
	for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
		pageNumbers.push(i)
	}

	return (
		<ul className='text-white flex gap-x-2 h-11 w-[350px] overflow-auto mx-auto mb-2 scroll'>
			{pageNumbers.map(number => (
				<li
					key={number}
					className={number == current ? 'h-[25px] min-w-[25px] cursor-pointer bg-white text-red-900 flex-centered p-1 rounded-full mx-auto' : 'h-[25px] min-w-[25px] cursor-pointer bg-red-900/80 focus:bg-white/90 flex-centered p-1 rounded-full mx-auto'}
					onClick={(e) => {
						paginate(number)
						setCurrent(number)
					}}
				>
					{number}
				</li>
			))}
		</ul>
	)
}

export default Pagination
