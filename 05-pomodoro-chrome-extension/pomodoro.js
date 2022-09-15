const pomodoroForm = document.querySelector("#pomodoro")
const workTimeInput = document.querySelector("#workTime")
const breakTimeInput = document.querySelector("#breakTime")
const submitButton = document.querySelector("#submitButton")
const resetButton = document.querySelector("#resetButton")

pomodoroForm.addEventListener("submit", async e => {
	e.preventDefault()

	await chrome.alarms.create("workTime", {
		periodInMinutes: workTimeInput.valueAsNumber,
	})
	await chrome.alarms.create("breakTime", {
		periodInMinutes: breakTimeInput.valueAsNumber + workTimeInput.valueAsNumber,
	})

	submitButton.setAttribute("disabled", "disabled")
})

resetButton.addEventListener("click", e => {
	submitButton.removeAttribute("disabled")
	chrome.alarms.clearAll()
})
