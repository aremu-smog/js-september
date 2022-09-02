const page = document.querySelector("#buttonDiv")
const selectedClassName = "current"

const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"]

const handleButtonClick = e => {
	const current = e.target.parentElement.querySelector(`.${selectedClassName}`)

	if (current && current !== e.target) {
		current.classList.remove(selectedClassName)
	}

	let color = e.target.dataset.color
	e.target.classList.add(selectedClassName)
	chrome.storage.sync.set({ color })
}

const constructOptions = buttonColors => {
	chrome.storage.sync.get("color", data => {
		let currentColor = data.color

		for (let buttonColor of buttonColors) {
			let button = document.createElement("button")
			button.dataset.color = buttonColor

			button.style.backgroundColor = buttonColor

			if (buttonColor === currentColor) {
				button.classList.add(selectedClassName)
			}

			button.addEventListener("click", handleButtonClick)

			page.appendChild(button)
		}
	})
}

constructOptions(presetButtonColors)
