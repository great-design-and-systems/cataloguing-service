import lodash from 'lodash';
import GetMarcFormat from './get-marc-format';
export default class MarcDecoder {
    constructor(marcData, callback) {
        new GetMarcFormat((err, marcFormat)=> {
            console.log('marcFormat', marcFormat);
            if (err) {
                callback(err);
            } else {
                const formedObject = {};
                lodash.forEach(marcData, (value, field)=> {
                    formedObject[field] = value;
                });
                callback();
            }
        });

    }
}