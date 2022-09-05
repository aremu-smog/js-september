const nukeButton = document.querySelector("#nuke")

nukeButton.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: nukeTheWebsite,
	})
})

const nukeTheWebsite = () => {
	document.body.remove()
}
