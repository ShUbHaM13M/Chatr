import React from 'react'

function Typing() {
	return (
		<div className="rounded-xl m-1 bg-primary
		flex justify-center items-center gap-1 relative"
			style={{
				minHeight: '2.5em',
				width: '3em',
			}}>
			<div className="dot mr-6" style={{ '--stagger-delay': '1' }} />
			<div className="dot" style={{ '--stagger-delay': '2' }} />
			<div className="dot ml-6" style={{ '--stagger-delay': '3' }} />
		</div>
	)
}

export default Typing
