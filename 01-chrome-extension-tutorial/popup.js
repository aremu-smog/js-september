const changeColorButton = window.document.querySelector("#changeColor")

chrome.storage.sync.get("color", ({ color }) => {
	changeColorButton.style.backgroundColor = color
})
