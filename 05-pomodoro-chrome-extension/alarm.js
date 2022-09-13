chrome.alarms.onAlarm.addListener(alarm => {
	chrome.tts.speak("Wakeup. Collect your money!")
})
