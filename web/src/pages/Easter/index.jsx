import React from 'react'

function Easter() {
	return (
		<div className="grid place-items-center h-screen bg-black">
			<img onMouseDown={e => {
				if (e.button == 2) return false
			}}
				className="h-96 select-none pointer-events-none"
				src="../images/ConcertDance-x600.png"
				alt="ConcertDance-x600"
				title="PixelArt -by Shubham Maurya" />
		</div>
	)
}

export default Easter
