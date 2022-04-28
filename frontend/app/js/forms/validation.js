import Forms from "./";
import {getAttr} from "../utils/getAttr";

export default class Validation {
    static getInputs(form) {
        return [...form.querySelectorAll(Forms.els.input)];
    }

    static expression = {
        email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    };

    static patterns = new Map([
        ["", (input) => Validation.isValidateEmpty(input)],
        ["email", (input) => Validation.isValidateEmail(input)],
        ["checkbox", (input) => Validation.isValidateCheckbox(input)],
    ]);

    static isValid(form, isHighlight = true) {
        const inputs = Validation.getInputs(form);

        let result = true

        inputs.forEach(input => {

            const validateType = input.getAttribute(getAttr(Forms.els.input));
            const validationFn = Validation.patterns.has(validateType)
                ? Validation.patterns.get(validateType)
                : Validation.patterns.get("");

            const isValid = validationFn(input)

            if (isHighlight) {
                Validation.setInputState(input, isValid)
            }

            if (!isValid) result = false
        })
        return result
    }

    static setInputState(input, isValid = true) {
        isValid
            ? input.classList.remove(Forms.stateClasses.invalid)
            : input.classList.add(Forms.stateClasses.invalid)
    }

    static isValidateEmpty(input) {
        return !!input.value.trim().length;

    }

    static isValidateCheckbox(input) {
        return !!input.checked;
    }

    static isValidateEmail(input) {
        return Validation.expression.email.test(input.value);
    }
}