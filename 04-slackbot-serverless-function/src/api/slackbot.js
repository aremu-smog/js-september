import fetch from "node-fetch"

export default function handler(req, res) {
	const { text } = req.body
	console.log(text)
	if (req.method === "POST") {
		try {
			fetch(process.env.ONISOWO_WEBHOOK, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ text: text }),
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
