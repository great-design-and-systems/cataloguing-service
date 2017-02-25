import lodash from 'lodash';
import GetMarcFormat from './get-marc-format';
import ParseFieldValue from './parse-field-value';

export default class MarcDecoder {
    constructor(marcData, callback) {
        new GetMarcFormat((err, marcFormat)=> {
            if (err) {
                callback(err);
            } else {
                const context = {
                    leader: marcData.leader,
                    controlField: marcData.controlField
                };
                new ParseFieldValue(lodash.keys(context), context, marcFormat, (err, data)=> {
                    if (err) {
                        callback(err);
                    } else {
                        callback(undefined, data);
                    }
                });
            }
        });
    }
}
