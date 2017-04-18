const OPERATION = 'searchRetrieve';
const SCHEMA = 'marcxml';

import { objectToQuery } from '../../catalog-utils';

export function searchRetrieve(url, query, format, version = '1.1') {
    if (query.maximumRecords) {
        query.maximumRecords = parseInt(query.maximumRecords);
    } else {
        query.maximumRecords = 25;
    }
    query.recordSchema = SCHEMA;
    query.operation = OPERATION;
    query.version = version;
    const queryParam = objectToQuery(query);
    return url + queryParam;
}