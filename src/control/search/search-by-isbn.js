import SetProxy from './../set-proxy';
import SetTimeout from './../set-timeout';
import unirest from 'unirest';

const SEARCH_URL = process.env.BOOK_SEARCH_URL;

export default class SearchByIsbn {
    constructor(isbn, callback) {
        let params = `isbn:${isbn}`;
        console.log(SEARCH_URL + params);
        new SetTimeout(new SetProxy(unirest.get(SEARCH_URL + params)).getRequest()).getRequest().end(response => {
            if (!response.error || response.error === null) {
                callback(null, response.body);
            }
            else {
                callback(response.error);
            }
        });
    }
}