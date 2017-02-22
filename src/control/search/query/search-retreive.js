const VERSION = '1.1';
const OPERATION = 'searchRetrieve';
const SCHEMA = 'marcxml';

import { objectToQuery } from '../../catalog-utils';

export function searchRetrieve(url, query, format) {
    if (query.maximumRecords) {
        query.maximumRecords = parseInt(query.maximumRecords);
    } else {
        query.maximumRecords = 25;
    }
    query.recordSchema = SCHEMA;
    query.operation = OPERATION;
    query.version = VERSION;
    const queryParam = objectToQuery(query);
    return url + queryParam;
}