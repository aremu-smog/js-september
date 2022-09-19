chrome.alarms.onAlarm.addListener(alarm => {
	const { name } = alarm

	if (name === "breakTime") {
		chrome.alarms.clear("breakTime", () => {
			chrome.storage.sync.get(
				["workTime", "voice"],
				async ({ workTime, voice }) => {
					await chrome.tts.speak("Time to get back to work!", {
						voiceName: voice,
					})
					chrome.alarms.create("workTime", {
						periodInMinutes: workTime,
					})
				}
			)
		})
	} else if (name === "workTime") {
		chrome.alarms.clear("workTime", () => {
			chrome.storage.sync.get(
				["breakTime", "voice"],
				async ({ breakTime, voice }) => {
					await chrome.tts.speak("Time to take a break!", {
						voiceName: voice,
					})
					chrome.alarms.create("breakTime", {
						periodInMinutes: breakTime,
					})
				}
			)
		})
	}
})
