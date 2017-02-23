import jsonfile from 'jsonfile';
const MARC_FORMAT_JSON = 'marc-format.json';
export default class GetMarcFormat {
    constructor(callback) {
        jsonfile.read(MARC_FORMAT_JSON, (err, obj)=> {
            if (err) {
                callback(err);
            } else {
                callback(undefined, obj);
            }
        })
    }
}