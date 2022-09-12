import fetch from "node-fetch"

export default function handler(req, res) {
	const { fullname, email, company, message } = req.body

	const textMessage = `New Enquiry by ${fullname} from ${company}. Email: ${email} Message: ${message}`
	if (req.method === "POST") {
		try {
			fetch(process.env.ONISOWO_WEBHOOK, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					text: textMessage,
					blocks: [
						{
							type: "header",
							text: {
								type: "plain_text",
								text: `New Enquiry!`,
							},
						},
						{
							type: "section",
							fields: [
								{
									type: "mrkdwn",
									text: "*Fullname:*\n" + fullname,
								},
								{
									type: "mrkdwn",
									text: "*Email:*\n" + email,
								},
								{
									type: "mrkdwn",
									text: "*Company:*\n" + company,
								},
								{
									type: "mrkdwn",
									text: "*Message:*\n" + message,
								},
							],
						},
					],
				}),
			})
				.then(res => res.json())
				.then(data => {
					return res.status(200).json({
						message: "Your message was delivered",
					})
				})
				.catch(e => {
					console.log(e)
					return res.status(500).json({
						error: "Something went wrong",
					})
				})
		} catch (e) {
			console.log(e)
			return res.status(500).json({
				error: "Something went wrong",
			})
		}
	}

	if (req.method === "GET") {
		return res.status(200).send("Life is hard, init?")
	}
}
