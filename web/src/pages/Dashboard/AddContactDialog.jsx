import React, { useState } from 'react'
import PropTypes from 'prop-types'
import BorderedContainer from '../../components/BorderedContainer'
import { useContacts } from '../../contexts/ContactsContext'
import { useAuth } from '../../contexts/AuthContext'
import Input from '../../components/Input'
import Button from '../../components/Input/Button'
import { useFlashMessage } from '../../contexts/FlashContext'

function AddContactDialog({ show }) {

	const [toAdd, setToAdd] = useState('')

	const { addContact } = useContacts()
	const { user } = useAuth()
	const {setFlashMessage} = useFlashMessage()

	function handleSubmit(e) {
		e.preventDefault()
		addContact(toAdd)
		show(false)
		setToAdd('')
	}

	async function onCopyBtnPressed() {
		try {
			await navigator.clipboard.writeText(user._id)
			setFlashMessage({message: 'copied Your user id to clipboard', type: 'success'})
			show(false)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div
			onClick={() => show(false)}
			className="absolute inset-0 h-screen w-screen 
			grid place-items-center z-20 glass text-white"
			style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}} >
			<BorderedContainer style={{borderColor: 'white'}}
				onClick={e => e.stopPropagation()}>
				<form onSubmit={handleSubmit}
					className="flex flex-col items-center gap-4">
					<div className="text-lg">Add Contact</div>
					<Input
						setValue={setToAdd}
						value={toAdd}
						placeholder="Enter username or userid	"
						required />
					<Button
						primary
						text="Add to contacts" />
				</form>
				<div className="divider my-4" />
				<Button
					text="Copy Your user id"
					onClick={onCopyBtnPressed} />
			</BorderedContainer>
		</div>
	)
}

AddContactDialog.propTypes = {
	show: PropTypes.func
}

export default AddContactDialog
