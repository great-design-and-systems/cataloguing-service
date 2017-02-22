import SetProxy from './../set-proxy';
import SetTimeout from './../set-timeout';
import lodash from 'lodash';
import unirest from 'unirest';

const SEARCH_URL = process.env.BOOK_SUBJECT_URL;

export default class GetSubjectsByIsbn {
    constructor(isbn, callback) {
        let params = `ISBN:${isbn}`;
        new SetTimeout(new SetProxy(unirest.get(SEARCH_URL + params)).getRequest()).getRequest().end((response) => {
            console.log('response.body', response.body);
            if ((!response.error || response.error === null) && !lodash.isEmpty(response.body)) {
                for (let isbn in response.body) {
                    callback(null, response.body[isbn].subjects);
                }
            }
            else {
                callback(response.error || { message: 'No subjects found.' });
            }
        });
    }
}