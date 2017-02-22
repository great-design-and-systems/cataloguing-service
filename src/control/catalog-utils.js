export function objectToQuery(obj) {
    let query = '?';
    for (let obk in obj) {
        query += (obk + '=' + obj[obk] + '&');
    }
    return query.substring(0, query.length-1);
}