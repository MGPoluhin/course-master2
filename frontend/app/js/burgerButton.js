export default class BurgerButton {
    els = {
        instance: '[data-js-burger-button]'
    }

    stateClasses = {
        isAcitve: 'is-active'
    }

    constructor() {
        this.instance = document.querySelector(this.els.instance)
        this.state = {
            isActive: false
        }
        this.bindEvents()
    }

    setIsActive() {
        this.state.isActive = true
        this.instance.classList.add(this.stateClasses.isAcitve)
    }

    removeIsActive() {
        this.state.isActive = false
        this.instance.classList.remove(this.stateClasses.isAcitve)
    }

    toggle() {
        if (this.state.isActive) {
            this.removeIsActive()
            App.MobileMenu.close()
        } else {
            this.setIsActive()
            App.MobileMenu.open()
        }
    }

    handleClick(event) {
        event.preventDefault()
        this.toggle()
    }

    bindEvents() {
        this.instance.addEventListener('click', (event) => this.handleClick(event))
    }
}
