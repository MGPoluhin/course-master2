import './style.pcss';

import Collection from "../../js/Collection";
import {getJS} from "../../js/utils/getJS";
import {getConfig} from "../../js/utils/getConfig";


export class GRecaptcha {
    constructor(instance) {
        this.instance = instance
        this.cfg = getConfig(this.instance, GRecaptchaCollections.instance)
        console.log(this)
    }

    init() {
    }
}

export default class GRecaptchaCollections extends Collection{
    static instance = '[data-js-recaptcha]'
    constructor() {
        super();
        this.load()

    }
    static urlAPI = "https://www.google.com/recaptcha/api.js"
    init() {
        document.querySelectorAll(GRecaptchaCollections.instance).forEach( el => {
            this.collection = new GRecaptcha(el)
        })
    }
    load() {
        if (typeof window.ymaps === 'function') {
            this.init()
        } else {
            getJS({src: GRecaptchaCollections.urlAPI}).then(res => this.init(), err => console.debug(err))
        }
    }
}
