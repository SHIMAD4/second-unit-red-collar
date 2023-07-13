const buttons = document.querySelectorAll('.mode')

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

export { changeAttr, clearAttr };

