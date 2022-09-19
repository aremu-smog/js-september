const pomodoroForm = document.querySelector("#pomodoro")
const workTimeInput = document.querySelector("#workTime")
const breakTimeInput = document.querySelector("#breakTime")
const voiceInput = document.querySelector("#voice")
const submitButton = document.querySelector("#submitButton")
const resetButton = document.querySelector("#resetButton")

chrome.storage.sync.get(
	["workTime", "breakTime", "voice"],
	({ workTime, breakTime, voice }) => {
		if (workTime && breakTime) {
			workTimeInput.value = workTime
			breakTimeInput.value = breakTime
			workTimeInput.setAttribute("disabled", "disabled")
			breakTimeInput.setAttribute("disabled", "disabled")
			submitButton.setAttribute("disabled", "disabled")
		}
		if (voice) {
			voiceInput.value = voice
			voiceInput.setAttribute("disabled", "disabled")
		}
	}
)

pomodoroForm.addEventListener("submit", async e => {
	e.preventDefault()

	await chrome.storage.sync.set({ workTime: workTimeInput.valueAsNumber })
	await chrome.storage.sync.set({ breakTime: workTimeInput.valueAsNumber })
	if (voiceInput.value) {
		await chrome.storage.sync.set({ voice: voiceInput.value })
		voiceInput.setAttribute("disabled", "disabled")
	}

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
	await chrome.storage.sync.set({ voice: "" })
	breakTimeInput.value = ""
	workTimeInput.value = ""
	voiceInput.value = ""

	breakTimeInput.removeAttribute("disabled")
	voiceInput.removeAttribute("disabled")
	workTimeInput.removeAttribute("disabled")
	submitButton.removeAttribute("disabled")
	chrome.alarms.clearAll()
})
