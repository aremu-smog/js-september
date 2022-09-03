let color = "#3aa757"

chrome.runtime.onInstalled.addListener(() => {
	document.querySelector("body").style.backgroundColor
	chrome.storage.sync.set({ color })
	console.log("Default background color set to %cgreen", `Color : ${color}`)
})
