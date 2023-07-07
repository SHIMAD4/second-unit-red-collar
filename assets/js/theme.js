const root = document.documentElement

const colors = {
    'pomodoro': 'rgb(186, 73, 73)',
    'short-break': 'rgb(56, 133, 138)',
    'long-break': 'rgb(47, 94, 128)',
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

export default changeTheme