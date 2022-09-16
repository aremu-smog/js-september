chrome.alarms.onAlarm.addListener(alarm => {
	console.log(alarm)

	const { name } = alarm

	if (name === "breakTime") {
		chrome.alarms.clear("breakTime", () => {
			chrome.tts.speak("Time to get back to work!")

			chrome.storage.sync.get("workTime", ({ workTime }) => {
				chrome.alarms.create("workTime", {
					periodInMinutes: workTime,
				})
			})
		})
	} else if (name === "workTime") {
		chrome.alarms.clear("workTime", () => {
			chrome.tts.speak("Time to take a break!")

			chrome.storage.sync.get("breakTime", ({ breakTime }) => {
				chrome.alarms.create("breakTime", {
					periodInMinutes: breakTime,
				})
			})
		})
	}
})
