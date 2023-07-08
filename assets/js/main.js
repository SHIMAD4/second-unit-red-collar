//  - Опционально: Добавить возможность настройки количества помодоро и времени короткого и длинного перерывов.
//  - Опционально: Добавить возможность добавления, удаления и редактирования задач для каждого помодоро.
//  - Опционально: Добавить возможность отметить задачу выполненной и переключаться на следующую задачу.

import changeTheme from './theme.js'

const buttons = document.querySelectorAll('.mode'),
      startButton = document.querySelector('#start'),
      stopButton = document.querySelector('#stop'),
      resetButton = document.querySelector('#reset'),
      pomodoroButton = document.querySelector('#pomodoro'),
      shortBreakButton = document.querySelector('#short-break'),
      longBreakButton = document.querySelector('#long-break'),
      minutesDisplay = document.querySelector('#minutes'),
      secondsDisplay = document.querySelector('#seconds')

let workTime = 2
let shortBreakTime = 3
let longBreakTime = 4
let seconds = '00'

window.addEventListener('load', () => {
    minutesDisplay.innerText = workTime
    secondsDisplay.innerText = seconds
})

function clearAttr() {
    buttons.forEach(button => {
        button.setAttribute('active', 'false')
    })
}
function changeAttr(button) {
    buttons.forEach((btn) => {
        const id = btn.getAttribute('id');
        const isActive = id === button.getAttribute('id');
        btn.setAttribute('active', isActive ? 'true' : 'false');
    });
}

class Timer {
    constructor(initialMinutes) {
        this.initialMinutes = initialMinutes
        this.minutes = this.initialMinutes - 1
        this.seconds = 59
        this.intervalUpdate = null
        this.iterationCount = 0
        this.endWorkCount = 0

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
        this.intervalUpdate = setInterval(this.timerUpdate.bind(this), 100)
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
        if (this.iterationCount === 0 && this.endWorkCount !== 4) {
            changeTheme(shortBreakButton.getAttribute('id'))
            changeAttr(shortBreakButton)
            this.minutes = shortBreakTime
            this.endWorkCount = this.endWorkCount + 1
            this.iterationCount = this.iterationCount + 1
        } else if (this.iterationCount >= 1) {
            changeTheme(pomodoroButton.getAttribute('id'))
            changeAttr(pomodoroButton)
            this.minutes = workTime
            this.iterationCount = 0
        } else if (this.endWorkCount === 4) {
            changeTheme(longBreakButton.getAttribute('id'))
            changeAttr(longBreakButton)
            this.minutes = longBreakTime
            this.endWorkCount = 0
            this.iterationCount = 1
        }
    }

    resetTimer() {
        clearInterval(this.intervalUpdate);
        this.minutes = this.pomodoroButton.getAttribute('active') === 'true' ? workTime :
                       this.shortBreakButton.getAttribute('active') === 'true' ? shortBreakTime :
                       this.longBreakButton.getAttribute('active') === 'true' ? longBreakTime : 0;
        this.seconds = 0;
        this.render();
    }    

    stopTimer() {
        clearInterval(this.intervalUpdate)
        this.render()
        console.log(this.minutes)
        console.log(this.seconds)
    }

    render() {
        this.minutesDisplay.innerText = this.minutes < 10 ? `0${this.minutes}` : this.minutes
        this.secondsDisplay.innerText = this.seconds < 10 ? `0${this.seconds}` : this.seconds
    }
}

const timer = new Timer(workTime)
startButton.addEventListener('click', () => {
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
        timer.resetTimer()
        minutesDisplay.innerText = `${times[id]}`
        secondsDisplay.innerText = `${seconds}`
        timer.minutes = e.target.getAttribute('active') === 'true' ? times[id] : 0
        timer.render()
    })
})