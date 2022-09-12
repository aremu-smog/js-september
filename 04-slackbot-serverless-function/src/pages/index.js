import * as React from "react"

const IndexPage = () => {
	const [contactData, setContactData] = React.useState({})
	const [formState, setFormState] = React.useState({
		status: "",
		message: "",
	})

	const IS_LOADING = formState.status === "LOADING"
	const IS_ERROR = formState.status === "ERROR"
	const IS_SUCCESS = formState.status === "SUCCESS"

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
					setFormState(currentFormState => {
						return {
							...currentFormState,
							status: "SUCCESS",
							message: "Someone on our team will get in touch with you soon!",
						}
					})
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
		}
	}
	return (
		<main style={pageStyles}>
			<h1 style={headingStyles}>Oniṣowo</h1>

			<form onSubmit={sendMessageToSlack}>
				<div>
					<label style={formLabelStyles} htmlFor='fullname'>
						Fullname {contactData?.fullname}
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

			<img
				alt='Gatsby G Logo'
				src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
			/>
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
	marginBottom: 64,
	maxWidth: 320,
}
const headingAccentStyles = {
	color: "#663399",
}
const paragraphStyles = {
	marginBottom: 48,
}
const codeStyles = {
	color: "#8A6534",
	padding: 4,
	backgroundColor: "#FFF4DB",
	fontSize: "1.25rem",
	borderRadius: 4,
}
const listStyles = {
	marginBottom: 96,
	paddingLeft: 0,
}
const listItemStyles = {
	fontWeight: 300,
	fontSize: 24,
	maxWidth: 560,
	marginBottom: 30,
}

const linkStyle = {
	color: "#8954A8",
	fontWeight: "bold",
	fontSize: 16,
	verticalAlign: "5%",
}

const docLinkStyle = {
	...linkStyle,
	listStyleType: "none",
	marginBottom: 24,
}

const descriptionStyle = {
	color: "#232129",
	fontSize: 14,
	marginTop: 10,
	marginBottom: 0,
	lineHeight: 1.25,
}

const docLink = {
	text: "Documentation",
	url: "https://www.gatsbyjs.com/docs/",
	color: "#8954A8",
}

const badgeStyle = {
	color: "#fff",
	backgroundColor: "#088413",
	border: "1px solid #088413",
	fontSize: 11,
	fontWeight: "bold",
	letterSpacing: 1,
	borderRadius: 4,
	padding: "4px 6px",
	display: "inline-block",
	position: "relative",
	top: -2,
	marginLeft: 10,
	lineHeight: 1,
}

const formLabelStyles = {
	display: "block",
	marginTop: "18px",
	marginBottom: "4px",
}

const formInputStyles = {
	width: "100%",
	maxWidth: "370px",
	padding: "8px",
	fontSize: "16px",
	fontFamily: "sans-serif",
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
