chrome.alarms.onAlarm.addListener(alarm => {
	console.log(alarm)

	const { name } = alarm

	if (name === "breakTime") {
		chrome.tts.speak("Time to get back to work!")
	} else if (name === "workTime") {
		chrome.tts.speak("Time to a break!")
	}
})
