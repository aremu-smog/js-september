const changeColorButton = window.document.querySelector("#changeColor")

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

const setPageBackgroundColor = () => {
	chrome.storage.sync.get("color", ({ color }) => {
		document.body.style.backgroundColor = color
	})
}
