import SearchResponse from './search-response';
import SetProxy from '../set-proxy';
import SetTimeout from '../set-timeout';
import {searchRetrieve} from './query/search-retreive';
import unirest from 'unirest';
import X2JS from 'x2js';
const QUERY_URL_LOC = process.env.QUERY_URL_LOC || 'http://www.loc.gov/z39voy';
const QUERY_URL_BIBSYS = process.env.QUERY_URL_BIBSYS || 'http://sru.bibsys.no/search/biblio';
const QUERY_URL_GAPINES = process.env.QUERY_URL_GAPINES || 'http://gapines.org/opac/extras/sru';
export default class SearchOnline {
    constructor(query, format, source = 'LIBRARY_OF_CONGRESS', callback) {
        let searchUrl;
        switch (source) {
            case 'LIBRARY_OF_CONGRESS':
            {
                searchUrl = searchRetrieve(QUERY_URL_LOC, query, format);
                break;
            }
            case 'BIBSYS':
            {
                searchUrl = searchRetrieve(QUERY_URL_BIBSYS, query, format);
                break;
            }
            case 'GAPINES':
            {
                searchUrl = searchRetrieve(QUERY_URL_GAPINES, query, format);
                break;
            }
        }
        console.log('searching in ', searchUrl);
        new SetTimeout(new SetProxy(unirest.get(searchUrl)).getRequest()).getRequest().end((response) => {
            if (!response.error || response.error == null) {
                const records = new X2JS().xml2js(response.body);
                callback(undefined, new SearchResponse(records));
            } else {
                console.error(response.error);
                callback(response.error);
            }
        });
    }
}