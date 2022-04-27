import Validation from "./validation";
import FormSend from "./send";

export default class Forms {
    static instance = "[data-js-form]";
    static els = {
        input: "[data-js-input-required]",
    };

    static stateClasses = {
        invalid: "is-invalid",
    };

    constructor() {

        this.bindEvents();
    }

    handleSubmit(e) {
        const {target} = e;
        console.log("попал в класс форм",Forms.instance,target)
        if (target.matches(Forms.instance)) {
            e.preventDefault();
            console.log("попал в класс форм",Forms.instance,target)
            if (Validation.isValid(target)) {
                FormSend.send(target)
                    .then(
                        json => FormSend.onSuccess(json),
                        err => FormSend.onError(err)
                    )
            }
        }
    }

    bindEvents() {
        document.addEventListener("submit", e => {
            console.log("Попал в событие в индекс",e)
            this.handleSubmit(e);
        });
    }
}