//  - Предоставить пользователю возможность приостанавливать или сбрасывать таймер.                                 pause = <i class="fa-solid fa-pause"></i>
//  - Опционально: Добавить возможность настройки количества помодоро и времени короткого и длинного перерывов.
//  - Опционально: Добавить возможность добавления, удаления и редактирования задач для каждого помодоро.
//  - Опционально: Добавить возможность отметить задачу выполненной и переключаться на следующую задачу.
//  - Все решения по дизайну остаются за разработчиком и при оценке учитываться не будут.

const buttons = document.querySelectorAll('.mode'),
      startButton = document.querySelector('#start'),
      resetButton = document.querySelector('#reset')

let workTime = 25,
    shortBreakTime = 5,
    longBreakTime = 15,
    seconds = '00',
    iterationCount = 0,
    endWorkCount = 0

window.addEventListener('load', () => {
    document.querySelector('#minutes').innerText = workTime
    document.querySelector('#seconds').innerText = seconds
})

startButton.addEventListener('click', () => {
    startTimer()
})

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let id = button.getAttribute('id')
        let targetButton = e.target
        changeTheme(id)
        clearAttr()
        targetButton.setAttribute('active', 'true')
    })
})

function startTimer() {
    let minutes = workTime - 1
    seconds = 60
    
    let timerUpdate = () => {
        document.querySelector('#minutes').innerText = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds - 1;    
        document.querySelector('#seconds').innerText = seconds < 10 ? `0${seconds}` : seconds;
        
        if(seconds === 0) {
            minutes = minutes - 1
            if(minutes === -1) {
                if(iterationCount === 0 && endWorkCount !== 4) {
                    document.querySelector('#short-break').click()
                    minutes = shortBreakTime
                    endWorkCount = endWorkCount + 1
                    iterationCount = iterationCount + 1
                } else if(iterationCount >= 1) {
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
            seconds = 60
        }
    }

    setInterval(timerUpdate, 100)
}

function clearAttr() {
    buttons.forEach(button => {
        button.setAttribute('active', 'false')
    })
}