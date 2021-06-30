
import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import BorderedContainer from '../../components/BorderedContainer'
import { useAuth } from '../../contexts/AuthContext'
import { useFlashMessage } from '../../contexts/FlashContext'

function Setting() {

	const { logout } = useAuth()
	const history = useHistory()
	const { state } = useLocation()
	const user = state?.user
	const NO_USER_IMG = '../images/no-photo.svg'
	const { setFlashMessage } = useFlashMessage()
	const uid = localStorage.getItem('chatr.-uid')

	useEffect(() => {
		if (!user)
			history.push('/login')
	}, [])

	const handleLogout = () => {
		setFlashMessage({ message: "You've been logged out", type: 'success' })
		logout()
		history.push('/login')
	}

	const buttonClasses = "mt-4 py-4 px-6 sm:py-2 sm:px-4 w-3/5 rounded-md shadow-md transition-colors duration-350 ease-in-out"

	return (
		<div className="grid place-items-center h-screen text-white">
			<BorderedContainer glass style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
				<div className="text-2xl">Settigns</div>
				<div className="divider mt-4" />
				{user &&
					<div className="mt-4">
						<div className="flex gap-2 flex-col md:flex-row items-center 
						text-center md:text-left">
							<img className="user-image rounded-full w-14 h-14"
								src={user.photos.length
									? user.photos.filter(photo => photo.isDefault)[0].url
									: NO_USER_IMG} alt="" />
							<div className="flex flex-col">
								<h4 className="text-lg">Signed in as: {user?.username}</h4>
								<p>User id: {user?._id}</p>
							</div>
						</div>
						<div className="my-2 flex flex-col gap-2 text-center">
							connected accounts :
							<div className="flex gap-4 self-center">
								<img className={`w-8 h-8 border p-1 rounded-md 
								${user.facebook ? '' : 'filter brightness-0 invert'}`}
									src="../images/facebook.svg" />
								<img className={`w-8 h-8 border p-1 rounded-md 
								${user.google ? '' : 'filter brightness-0 invert'}`}
									src="../images/google.png" />
							</div>
						</div>
						<div className="text-center">App id:
							<span className="ml-4 text-lg">
								{uid.replace(/"/g, '')}
							</span>
						</div>
					</div>
				}
				<div className="divider mt-4" />
				<a
					href="mailto:shubham.heeralal@gmail.com?subject=Bug Report"
					className={buttonClasses + " hover:bg-danger hover:opacity-100 focus:bg-danger focus:text-white hover:text-white cursor-pointer bg-danger bg-opacity-50 border-2 border-danger text-center text-white"}>
					Report a bug</a>
				<button
					onClick={handleLogout}
					className={buttonClasses + "hover:opacity-80 focus:opacity-80 bg-danger text-white"}>
					Log out
				</button>
			</BorderedContainer>
		</div>
	)
}

export default Setting
