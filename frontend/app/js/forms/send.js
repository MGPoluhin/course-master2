export default class FormSend {
    constructor() {
    }

    static async send(form){
        const {action = window.location.href, method = 'GET'} = form
        const body = new FormData(form)
        return await fetch(action, {
            method,
            body: method === 'POST' ? body : null
        })
        .then(
            response => Promise.resolve(response.json()),
            err => Promise.reject(err)
        );
    }

    static onSuccess(json) {
        console.debug(json)
    }
    static onError() {}

}