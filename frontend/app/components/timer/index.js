import './style.pcss';
import Collection from "../../js/Collection";
import {getConfig} from "../../js/utils/getConfig";

export class Timer {
    constructor(instance) {
        this.instance = instance
        this.cfg = getConfig(this.instance, TimerCollections.instance)
        this.countdownData = null
        this.init()
    }
    timeBetweenDates() {
        let now = new Date().getTime();
        let distance = this.cfg.countdownData - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.instance.innerHTML = days + " д : " + hours + " ч : "
            + minutes + " м";
        if (distance < 0) {
            this.instance.innerHTML = "EXPIRED";
        }
    }

    init() {
        setInterval(() =>{this.timeBetweenDates()}, 1000);
    }
}

export default class TimerCollections extends Collection{
    static instance = '[data-js-timer]'
    constructor() {
        super();
        this.init()
    }

    init() {
        document.querySelectorAll(TimerCollections.instance).forEach( el => {
            this.collection = new Timer(el)
        })
    }

}
