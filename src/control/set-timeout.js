const SEARCH_TIMEOUT = process.env.SEARCH_TIMEOUT || 30000;

export default class SetTimeout {
    constructor(request) {
        this.request = request;
        request.timeout(parseInt(SEARCH_TIMEOUT));
    }
    getRequest() {
        return this.request;
    }
}