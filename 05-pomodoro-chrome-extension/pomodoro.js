const pomodoroForm = document.querySelector("#pomodoro")
const workTimeInput = document.querySelector("#workTime")
const breakTimeInput = document.querySelector("#breakTime")
const submitButton = document.querySelector("#submitButton")
const resetButton = document.querySelector("#resetButton")

chrome.storage.sync.get(
	["workTime", "breakTime"],
	({ workTime, breakTime }) => {
		if (workTime && breakTime) {
			workTimeInput.value = workTime
			breakTimeInput.value = breakTime
			workTimeInput.setAttribute("disabled", "disabled")
			breakTimeInput.setAttribute("disabled", "disabled")
			submitButton.setAttribute("disabled", "disabled")
		}
	}
)

pomodoroForm.addEventListener("submit", async e => {
	e.preventDefault()

	await chrome.storage.sync.set({ workTime: workTimeInput.valueAsNumber })
	await chrome.storage.sync.set({ breakTime: workTimeInput.valueAsNumber })

	await chrome.storage.sync.get("workTime", ({ workTime }) => {
		chrome.alarms.create("workTime", {
			periodInMinutes: workTime,
		})
	})

	workTimeInput.setAttribute("disabled", "disabled")
	breakTimeInput.setAttribute("disabled", "disabled")
	submitButton.setAttribute("disabled", "disabled")
})

resetButton.addEventListener("click", async e => {
	await chrome.storage.sync.set({ workTime: 0 })
	await chrome.storage.sync.set({ breakTime: 0 })
	breakTimeInput.value = ""
	workTimeInput.value = ""
	breakTimeInput.removeAttribute("disabled")
	workTimeInput.removeAttribute("disabled")
	submitButton.removeAttribute("disabled")
	chrome.alarms.clearAll()
})
