const PROXY = process.env.PROXY;

export default class SetProxy {
    constructor(request) {
        this.request = request;
        if (PROXY) {
            this.request.proxy(PROXY);
        }
    }

    getRequest() {
        return this.request;
    }
}