import fs from 'fs';
const MARC_FORMAT_JSON = 'marc-format.json';

export default class GetMarcFormat {
    constructor(callback) {
        fs.readFile(MARC_FORMAT_JSON, (err, data)=> {
            if (err) {
                callback(err);
            } else {
                callback(undefined, JSON.parse(data));
            }
        });
    }
}