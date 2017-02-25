import lodash from 'lodash';
import GetMarcFormat from './get-marc-format';
import ParseFieldValue from './parse-field-value';

export default class MarcDecoder {
    constructor(marcData, callback) {
        new GetMarcFormat((err, marcFormat)=> {
            if (err) {
                callback(err);
            } else {
                new ParseFieldValue(lodash.keys(marcData), marcData, (key, value)=> {
                    let contextValueFormat = marcFormat[key];
                    if (contextValueFormat && value) {
                        value = new GetFormattedValue(value, contextValueFormat).getValue();
                    }
                    return value;
                }, (err, data)=> {
                });
                callback();
            }
        });
    }
}

class GetFormattedValue {
    constructor(value, valueFormat) {
        let valueArray = value.split('');
        if (valueArray && valueArray.length) {
            lodash.forEach(valueArray, (value, index)=> {
                const fieldObject = lodash.filter(valueFormat, (format)=> {
                    if (format instanceof Array) {
                        return format[0] === index;
                    } else {
                        return format === index;
                    }
                });
                console.log('fieldObject', fieldObject);
            });
        }
    }

    parseArrayFieldObject(fieldObject, index, value) {
        if (fieldObject.length > 1) {

        }
    }

    getValue() {
        return this.formattedValue;
    }
}