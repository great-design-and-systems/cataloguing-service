export function objectToQuery(obj) {
    let query = '?';
    for (let obk in obj) {
        query += (obk + '=' + obj[obk] + '&');
    }
    return query.substring(0, query.length - 1);
}

export function findInArray(field, key, list, index) {
    if (!index) {
        index = 0;
    }
    const obj = list[index];
    const found = obj[field] === key;
    if (!found && index < list.length) {
        return findInArray(field, key, list, ++index);
    }
    return obj;
}