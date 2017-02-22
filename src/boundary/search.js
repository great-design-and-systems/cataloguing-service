import GetSubjectsByIsbn from '../control/search/get-subjects-by-isbn';
import SearchByIsbn from '../control/search/search-by-isbn';
import SearchOnline from '../control/search/search-online';

export default class SearchService {

    searchByIsbn(isbn, callback) {
        new SearchByIsbn(isbn, callback);
    }

    getSubjectsByIsbn(isbn, callback) {
        new GetSubjectsByIsbn(isbn, callback);
    }

    searchOnline(query, format, source, callback) {
        new SearchOnline(query, format, source, callback);
    }
}