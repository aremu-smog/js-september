const changeColorButton = window.document.querySelector("#changeColor")
const resetColorButton = window.document.querySelector("#resetColor")

chrome.storage.sync.get("color", ({ color }) => {
	changeColorButton.style.backgroundColor = color
})

changeColorButton.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: setPageBackgroundColor,
	})
})

resetColorButton.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: resetBackgroundColor,
	})
})

const resetBackgroundColor = () => {
	document.body.style.removeProperty("background-color")
}

const setPageBackgroundColor = () => {
	chrome.storage.sync.get("color", ({ color }) => {
		document.body.style.backgroundColor = color
	})
}

const colorOptions = [
	{ label: "Green", value: "#3aa757" },
	{ label: "Red", value: "#e8453c" },
	{ label: "Yellow", value: "#f9bb2d" },
	{ label: "Blue", value: "#4688f1" },
]

const colorOptionsSelect = document.querySelector("#colorOptions")

colorOptions.forEach(colorOption => {
	const { label, value } = colorOption
	const selectOption = document.createElement("option")
	selectOption.value = value
	selectOption.innerText = label

	colorOptionsSelect.append(selectOption)

	chrome.storage.sync.get("color", ({ color }) => {
		if (color === value) {
			selectOption.setAttribute("selected", true)
		} else {
			selectOption.removeAttribute("selected")
		}
	})
})

colorOptionsSelect.addEventListener("change", e => {
	const selectedColor = e.target.value
	chrome.storage.sync.set({ color: selectedColor })

	changeColorButton.style.backgroundColor = selectedColor
})
