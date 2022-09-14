const pomodoroForm = document.querySelector("#pomodoro")
const workTimeInput = document.querySelector("#workTime")
const breakTimeInput = document.querySelector("#breakTime")
const resetButton = document.querySelector("#resetButton")

pomodoroForm.addEventListener("submit", e => {
	e.preventDefault()

	console.log("Start up!")

	chrome.alarms.create("workTime", {
		periodInMinutes: workTimeInput.valueAsNumber,
	})
	chrome.alarms.create("breakTime", {
		periodInMinutes: breakTimeInput.valueAsNumber + workTimeInput.valueAsNumber,
	})
})

resetButton.addEventListener("click", e => {
	chrome.alarms.clearAll()
})
