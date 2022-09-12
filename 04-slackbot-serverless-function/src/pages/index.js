import * as React from "react"

const IndexPage = () => {
	const [contactData, setContactData] = React.useState({})
	const [formState, setFormState] = React.useState({
		status: "",
		message: "",
	})

	const { message } = formState
	const IS_LOADING = formState.status === "LOADING"
	const IS_ERROR = formState.status === "ERROR"
	const IS_SUCCESS = formState.status === "SUCCESS"

	const hideMessage = () => {
		setTimeout(() => {
			setFormState(currentFormState => {
				return { ...currentFormState, message: "" }
			})
		}, 5000)
	}

	const handleChange = e => {
		const { name, value } = e.target

		setContactData(prevContactData => {
			return { ...prevContactData, [name]: value }
		})
	}
	const sendMessageToSlack = async e => {
		e.preventDefault()
		setFormState(currentFormState => {
			return { ...currentFormState, status: "LOADING" }
		})
		try {
			await fetch("/api/slackbot", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(contactData),
			})
				.then(res => res.json())
				.then(data => {
					// if (data.error) {
					// 	setFormState(currentFormState => {
					// 		return {
					// 			...currentFormState,
					// 			status: "ERROR",
					// 			message: data.error,
					// 		}
					// 	})
					// }
					// if (data.message) {
					setContactData(prevData => {
						return {
							...prevData,
							fullname: "",
							email: "",
							company: "",
							message: "",
						}
					})
					setFormState(currentFormState => {
						return {
							...currentFormState,
							status: "SUCCESS",
							message: "Someone on our team will get in touch with you soon!",
						}
					})
					// }
				})
				.catch(e => {
					setFormState(currentFormState => {
						return {
							...currentFormState,
							status: "ERROR",
							message: "Something went terribly wrong",
						}
					})
				})
		} catch {
			alert("Another gbege")
		} finally {
			setFormState(currentFormState => {
				return { ...currentFormState, status: "" }
			})

			hideMessage()
		}
	}
	return (
		<main style={pageStyles}>
			<h1 style={headingStyles}>Oniṣowo</h1>

			{message && <p style={messageStyles}>{message}</p>}
			<form onSubmit={sendMessageToSlack}>
				<div>
					<label style={formLabelStyles} htmlFor='fullname'>
						Fullname
					</label>
					<input
						type='text'
						placeholder='Your full name'
						name='fullname'
						id='fullname'
						style={formInputStyles}
						value={contactData?.fullname}
						onChange={handleChange}
						required='required'
					/>
				</div>
				<div>
					<label style={formLabelStyles} htmlFor='company'>
						Company
					</label>
					<input
						type='text'
						placeholder='Your Company'
						name='company'
						id='company'
						style={formInputStyles}
						onChange={handleChange}
						value={contactData?.company}
						required='required'
					/>
				</div>
				<div>
					<label style={formLabelStyles} htmlFor='email'>
						Email Address
					</label>
					<input
						type='email'
						placeholder='Your Email Address'
						name='email'
						id='email'
						style={formInputStyles}
						onChange={handleChange}
						value={contactData?.email}
						required='required'
					/>
				</div>
				<div>
					<label style={formLabelStyles} htmlFor='message'>
						Your message
					</label>
					<textarea
						placeholder="Don't hold anything back..."
						name='message'
						id='message'
						style={formInputStyles}
						onChange={handleChange}
						value={contactData?.message}
						required='required'
					/>
				</div>
				<button style={formButtonStyles} disabled={IS_LOADING}>
					{IS_LOADING ? "Loading..." : "Submit"}
				</button>
			</form>
		</main>
	)
}

export default IndexPage

const pageStyles = {
	color: "#232129",
	padding: 96,
	fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
	marginTop: 0,
	marginBottom: 48,
	maxWidth: 320,
}

const messageStyles = {
	margin: "24px 0",
	padding: "12px",
	border: "1px solid #663399",
	borderRadius: "8px",
	fontSize: "12px",
	maxWidth: "370px",
	color: " #663399",
}

const formLabelStyles = {
	display: "block",
	marginTop: "18px",
	marginBottom: "8px",
}

const formInputStyles = {
	width: "100%",
	maxWidth: "370px",
	padding: "12px 8px",
	fontSize: "16px",
	fontFamily: "sans-serif",
	borderRadius: "4px",
	border: "1px solid #232129 ",
}

const formButtonStyles = {
	backgroundColor: "#663399",
	fontSize: "16px",
	borderRadius: "8px",
	padding: "12px",
	marginTop: "16px",
	cursor: "pointer",
	color: "#ffffff",
	outline: "none",
	border: "none",
	width: "200px",
}
