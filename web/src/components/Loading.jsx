import React from 'react'

function Loading() {
	return (
		<div className="grid place-items-center h-screen">
			<svg className="animate-pulse ease-in-out duration-350" width="75" height="76" viewBox="0 0 75 76" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect y="0.922363" width="75" height="75" rx="18" fill="#69A1D3" />
				<path d="M17.1686 45.212C12.8608 31.4856 23.3508 17.5227 37.7374 17.5227C49.28 17.5227 58.8084 26.8799 58.8084 38.4225C58.8084 49.9651 49.4512 59.3223 37.9086 59.3223H20.0866C19.9925 59.3223 19.9011 59.3175 19.8126 59.3082C16.6519 58.9746 19.9217 53.9843 18.97 50.9518V50.9518L17.1686 45.212Z" fill="white" />
				<circle cx="45.8797" cy="38.4224" r="2.56549" fill="#69A1D3" />
				<rect x="34.8934" y="32.0005" width="5.21285" height="12.9259" rx="2.60643" fill="#69A1D3" />
				<rect x="26.4725" y="35.1958" width="5.21285" height="6.53548" rx="2.60643" fill="#69A1D3" />
			</svg>

		</div>
	)
}

export default Loading
