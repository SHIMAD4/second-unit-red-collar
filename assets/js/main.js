//  - Предоставить пользователю возможность приостанавливать или сбрасывать таймер.                                 pause = <i class="fa-solid fa-pause"></i>
//  - Опционально: Добавить возможность настройки количества помодоро и времени короткого и длинного перерывов.
//  - Опционально: Добавить возможность добавления, удаления и редактирования задач для каждого помодоро.
//  - Опционально: Добавить возможность отметить задачу выполненной и переключаться на следующую задачу.
//  - Все решения по дизайну остаются за разработчиком и при оценке учитываться не будут.

import changeTheme from './theme.js'

const buttons = document.querySelectorAll('.mode'),
      startButton = document.querySelector('#start'),
      resetButton = document.querySelector('#reset'),
      pomodoroButton = document.querySelector('#pomodoro'),
      shortBreakButton = document.querySelector('#short-break'),
      longBreakButton = document.querySelector('#long-break')

let workTime = 2
let shortBreakTime = 3
let longBreakTime = 4

let seconds = '00'

let intervalUpdate
let iterationCount = 0
let endWorkCount = 0

window.addEventListener('load', () => {
    document.querySelector('#minutes').innerText = workTime
    document.querySelector('#seconds').innerText = seconds
})

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let id = button.getAttribute('id')
        let targetButton = e.target
        changeTheme(id)
        clearAttr()
        targetButton.setAttribute('active', 'true')
        if(pomodoroButton.getAttribute('active') === 'true') {
            document.querySelector('#minutes').innerText = `${workTime}`
        } else if (shortBreakButton.getAttribute('active') === 'true') {
            document.querySelector('#minutes').innerText = `${shortBreakTime}`
        } else if (longBreakButton.getAttribute('active') === 'true') {
            document.querySelector('#minutes').innerText = `${longBreakTime}`
        }
        clearInterval(intervalUpdate)
        document.querySelector('#seconds').innerText = `${seconds}`
    })
})
function clearAttr() {
    buttons.forEach(button => {
        button.setAttribute('active', 'false')
    })
}


startButton.addEventListener('click', () => {
    if(pomodoroButton.getAttribute('active') === 'true') {
        startWork()
    } else if (shortBreakButton.getAttribute('active') === 'true') {
        startShortBreak()
    } else if (longBreakButton.getAttribute('active') === 'true') {
        startLongBreak()
    }
})

function startWork() {
    let minutes = workTime - 1
    let seconds = 30

    const timerUpdate = () => {
        document.querySelector('#minutes').innerText = minutes < 10 ? `0${minutes}` : minutes;
        document.querySelector('#seconds').innerText = seconds < 10 ? `0${seconds}` : seconds;

        if (seconds === 0) {
            minutes = minutes - 1
                if (minutes === -1) {
                    handleTimerEnd()
                }
                seconds = 30
        } else {
            seconds = seconds - 1
        }
    }

    const handleTimerEnd = () => {
        if (iterationCount === 0 && endWorkCount !== 4) {
            document.querySelector('#short-break').click()
            minutes = shortBreakTime
            endWorkCount = endWorkCount + 1
            iterationCount = iterationCount + 1
        } else if (iterationCount >= 1) {
            document.querySelector('#pomodoro').click()
            minutes = workTime
            iterationCount = 0
        } else if (endWorkCount === 4) {
            document.querySelector('#long-break').click()
            minutes = longBreakTime
            endWorkCount = 0
            iterationCount = 1
        }
    }

    const resetTimer = () => {
        clearInterval(intervalUpdate)
        minutes = workTime
        seconds = '00'
        document.querySelector('#minutes').innerText = `${minutes}`
        document.querySelector('#seconds').innerText = `${seconds}`
    }

    resetButton.addEventListener('click', resetTimer)
    intervalUpdate = setInterval(timerUpdate, 100)
}
function startShortBreak() {
    let minutes = shortBreakTime - 1
    let seconds = 30
    const timerUpdate = () => {
        document.querySelector('#minutes').innerText = minutes < 10 ? `0${minutes}` : minutes;
        document.querySelector('#seconds').innerText = seconds < 10 ? `0${seconds}` : seconds;

        if (seconds === 0) {
            minutes = minutes - 1
            if (minutes === -1) {
                handleTimerEnd()
            }
            seconds = 30
        } else {
            seconds = seconds - 1
        }
    }
    const handleTimerEnd = () => {
        if (iterationCount === 0 && endWorkCount !== 4) {
            document.querySelector('#short-break').click()
            minutes = shortBreakTime
            endWorkCount = endWorkCount + 1
            iterationCount = iterationCount + 1
        } else if (iterationCount >= 1) {
            document.querySelector('#pomodoro').click()
            minutes = workTime
            iterationCount = 0
        } else if (endWorkCount === 4) {
            document.querySelector('#long-break').click()
            minutes = longBreakTime
            endWorkCount = 0
            iterationCount = 1
        }
    }
    const resetTimer = () => {
        clearInterval(intervalUpdate)
        minutes = shortBreakTime
        seconds = '00'
        document.querySelector('#minutes').innerText = `${minutes}`
        document.querySelector('#seconds').innerText = `${seconds}`
    }

    resetButton.addEventListener('click', resetTimer)
    intervalUpdate = setInterval(timerUpdate, 100)
}
function startLongBreak() {
    let minutes = longBreakTime - 1
    let seconds = 30
    const timerUpdate = () => {
        document.querySelector('#minutes').innerText = minutes < 10 ? `0${minutes}` : minutes;
        document.querySelector('#seconds').innerText = seconds < 10 ? `0${seconds}` : seconds;

        if (seconds === 0) {
            minutes = minutes - 1
            if (minutes === -1) {
                handleTimerEnd()
            }
            seconds = 30
        } else {
            seconds = seconds - 1
        }
    }
    const handleTimerEnd = () => {
        if (iterationCount === 0 && endWorkCount !== 4) {
            document.querySelector('#short-break')
            minutes = shortBreakTime
            endWorkCount = endWorkCount + 1
            iterationCount = iterationCount + 1
        } else if (iterationCount >= 1) {
            document.querySelector('#pomodoro')
            minutes = workTime
            iterationCount = 0
        } else if (endWorkCount === 4) {
            document.querySelector('#long-break')
            minutes = longBreakTime
            endWorkCount = 0
            iterationCount = 1
        }
    }
    const resetTimer = () => {
        clearInterval(intervalUpdate)
        minutes = longBreakTime
        seconds = '00'
        document.querySelector('#minutes').innerText = `${minutes}`
        document.querySelector('#seconds').innerText = `${seconds}`
    }

    resetButton.addEventListener('click', resetTimer)
    intervalUpdate = setInterval(timerUpdate, 100)
}