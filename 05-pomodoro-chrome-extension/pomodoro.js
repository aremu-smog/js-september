const pomodoroForm = document.querySelector("#pomodoro")

pomodoroForm.addEventListener("submit", e => {
	e.preventDefault()

	chrome.alarms.clear("workTime")
	// chrome.alarms.create("workTime", {
	// 	delayInMinutes: 1,
	// 	periodInMinutes: 1,
	// })
})
