//  - Опционально: Добавить возможность добавления, удаления и редактирования задач для каждого помодоро.
//  - Опционально: Добавить возможность отметить задачу выполненной и переключаться на следующую задачу.

import { changeTheme } from './theme.js';
import { changeAttr, clearAttr } from './utils.js';

const buttons = document.querySelectorAll('.mode'),
      settingsButton = document.querySelector('#settings'),
      closeButton = document.querySelector('#close'),
      startButton = document.querySelector('#start'),
      stopButton = document.querySelector('#stop'),
      resetButton = document.querySelector('#reset'),
      pomodoroButton = document.querySelector('#pomodoro'),
      shortBreakButton = document.querySelector('#short-break'),
      longBreakButton = document.querySelector('#long-break'),
      minutesDisplay = document.querySelector('#minutes'),
      secondsDisplay = document.querySelector('#seconds')

let workTime = 25
let shortBreakTime = +localStorage.getItem('shortBreakTime') || 5
let longBreakTime = +localStorage.getItem('longBreakTime') || 15

window.addEventListener('load', () => {
    minutesDisplay.innerText = workTime
    secondsDisplay.innerText = '00'
})


const modalForm = document.querySelector('.popup__form')
modalForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(modalForm)
    let enteredPomodoro = +formData.get('pomodoro')
    let enteredShortBreakTime = +formData.get('short-break-time')
    let enteredLongBreakTime = +formData.get('long-break-time')

    let pomodoro = enteredPomodoro >= 0 ? enteredPomodoro : 4
    shortBreakTime = enteredShortBreakTime >= 0 ? enteredShortBreakTime : 3
    longBreakTime = enteredLongBreakTime >= 0 ? enteredLongBreakTime : 4
    localStorage.setItem('pomodoro', pomodoro)
    localStorage.setItem('shortBreakTime', shortBreakTime);
    localStorage.setItem('longBreakTime', longBreakTime);

    timer.resetTimer()
})


class Timer {
    constructor(initialMinutes) {
        this.initialMinutes = initialMinutes
        this.minutes = this.initialMinutes - 1
        this.seconds = 59
        this.intervalUpdate = null
        this.iterationCount = 0
        this.endWorkCount = 1

        this.minutesDisplay = minutesDisplay
        this.secondsDisplay = secondsDisplay
        this.startButton = startButton
        this.stopButton = stopButton
        this.resetButton = resetButton
        this.pomodoroButton = pomodoroButton
        this.shortBreakButton = shortBreakButton
        this.longBreakButton = longBreakButton

        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)

        this.stopButton.addEventListener('click', this.stopTimer)
        this.resetButton.addEventListener('click', this.resetTimer)
    }

    start() {
        this.intervalUpdate = setInterval(this.timerUpdate.bind(this), 1000)
    }

    timerUpdate() {
        this.render()

        if (this.seconds === 0) {
            this.minutes = this.minutes - 1
            if (this.minutes === -1) {
                this.handleTimerEnd()
            }
            this.seconds = 59
        } else {
            this.seconds = this.seconds - 1
        }
    }

    handleTimerEnd() {
        const pomodoroCount = +localStorage.getItem('pomodoro') || 4
    
        if (this.iterationCount === 0 && this.endWorkCount !== pomodoroCount) {
            changeTheme(shortBreakButton.getAttribute('id'))
            changeAttr(shortBreakButton)
            this.minutes = shortBreakTime - 1
            this.iterationCount = this.iterationCount + 1
        } else if (this.iterationCount === 1) {
            changeTheme(pomodoroButton.getAttribute('id'))
            changeAttr(pomodoroButton)
            this.minutes = workTime
            this.iterationCount = 0
            this.endWorkCount = this.endWorkCount + 1
        } else if (this.endWorkCount === pomodoroCount) {
            changeTheme(longBreakButton.getAttribute('id'))
            changeAttr(longBreakButton)
            this.minutes = longBreakTime - 1
            this.endWorkCount = 0
            this.iterationCount = 1
        }
    }    

    resetTimer() {
        startButton.style.display = 'inline-block'
        stopButton.style.display = 'none'
        clearInterval(this.intervalUpdate)
        this.minutes = this.pomodoroButton.getAttribute('active') === 'true' ? workTime :
                       this.shortBreakButton.getAttribute('active') === 'true' ? shortBreakTime :
                       this.longBreakButton.getAttribute('active') === 'true' ? longBreakTime : 0
        this.seconds = 0
        this.render()
    }    

    stopTimer() {
        startButton.style.display = 'inline-block'
        stopButton.style.display = 'none'
        clearInterval(this.intervalUpdate)
        this.render()
    }

    render() {
        this.minutesDisplay.innerText = this.minutes < 10 ? `0${this.minutes}` : this.minutes
        this.secondsDisplay.innerText = this.seconds < 10 ? `0${this.seconds}` : this.seconds
    }
}


const timer = new Timer(workTime)
stopButton.style.display = 'none'

startButton.addEventListener('click', () => {
    startButton.style.display = 'none'
    stopButton.style.display = 'inline-block'
    switch (true) {
        case (pomodoroButton.getAttribute('active') === 'true'):
            timer.start()
            break
        case (shortBreakButton.getAttribute('active') === 'true'):
            timer.start()
            break
        case (longBreakButton.getAttribute('active') === 'true'):
            timer.start()
            break
    }
})


const times = {
    'pomodoro': workTime,
    'short-break': shortBreakTime,
    'long-break': longBreakTime
}
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const id = button.getAttribute('id')
        changeTheme(id)
        clearAttr()
        changeAttr(e.target)
        minutesDisplay.innerText = `${times[id]}`
        secondsDisplay.innerText = `${timer.seconds}`
        timer.minutes = e.target.getAttribute('active') === 'true' ? times[id] : 0
        timer.resetTimer()
        timer.render()
    })
})


const modal = document.querySelector('#popup')
settingsButton.addEventListener('click', () => {
    modal.classList.toggle('popup-show')
})

closeButton.addEventListener('click', () => {
    modal.classList.remove('popup-show')
})