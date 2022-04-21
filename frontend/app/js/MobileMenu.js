export default class MobileMenu {
    els = {
        instance: '[data-js-mobile-menu]',
        innerEl: '[data-js-mobile-menu-inner]'
    }

    stateClasses = {
        isOpen: 'is-open'
    }

    constructor() {
        this.instance = document.querySelector(this.els.instance)
        this.innerEl = this.instance.querySelector(this.els.innerEl)
        this.state = {
            isOpen: false
        }
        this.bindEvents()
    }

    open() {
        this.state.isOpen = true
        this.instance.classList.add(this.stateClasses.isOpen)
    }

    close() {
        this.state.isOpen = false
        this.instance.classList.remove(this.stateClasses.isOpen)
    }

    handleClick(event) {
        const {target} = event

        if (!target.closest(this.els.innerEl)) {
            this.close()
        }
    }

    bindEvents() {
        this.instance.addEventListener('click', (event) => this.handleClick(event))
    }
}
