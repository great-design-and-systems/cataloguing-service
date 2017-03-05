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

export function sequence(array, callback, data) {
    const item = array.shift();
    try {
        if (array.length > 0) {
            item(data, (err, returnData)=> {
                if (err) {
                    callback(err);
                } else {
                    sequence(array, callback, returnData);
                }
            });
        } else {
            item(data, callback, (err, returnData)=> {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, returnData);
                }
            });
        }
    } catch (err) {
        callback(err);
    }
}