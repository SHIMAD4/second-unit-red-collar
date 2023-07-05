//  Создать таймер, который будет отсчитывать
//  25 минут работы и 5 минут отдыха (после 4 подходов 15 минут для длинных перерывов).
//  - Предоставить пользователю возможность приостанавливать или сбрасывать таймер.
//  - Опционально: Добавить возможность настройки количества помодоро и времени короткого и длинного перерывов.
//  - Опционально: Добавить возможность добавления, удаления и редактирования задач для каждого помодоро.
//  - Опционально: Добавить возможность отметить задачу выполненной и переключаться на следующую задачу.
//  - Все решения по дизайну остаются за разработчиком и при оценке учитываться не будут.

const buttons = document.querySelectorAll('.btn'),
      root = document.documentElement

const colors = {
        'pomodoro': 'rgb(186, 73, 73)',
        'short-break': 'rgb(56, 133, 138)',
        'long-break': 'rgb(47, 94, 128)',
    }

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let id = button.getAttribute('id')
        let targetButton = e.target
        changeTheme(id)
        clearAttr()
        targetButton.setAttribute('active', 'true')
    })
})

function clearAttr() {
    buttons.forEach(button => {
        button.setAttribute('active', 'false')
    })
}

function changeTheme(id) {
    const color = colors[id]
    switch(id) {
        case 'pomodoro':
            root.style.setProperty('--main-clr', color)
            break
        case 'short-break':
            root.style.setProperty('--main-clr', color)
            break
        case 'long-break':
            root.style.setProperty('--main-clr', color)
            break
        default:
            root.style.setProperty('--main-clr', 'rgb(186, 73, 73)')
            break
    }
}