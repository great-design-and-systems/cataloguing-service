import lodash from 'lodash';
export default class GetFormattedValue {
    constructor(value, valueFormat, key) {
        let keyFormat = lodash.find(valueFormat, (valF, fieldV)=> {
            this.field = fieldV;
            return valF === key
        });
        if (keyFormat) {
            this.formattedValue = value;
        } else {
            this.field = key;
            let valueArray = value.split('');
            if (valueArray && valueArray.length) {
                this.formattedValue = {};
                lodash.forEach(valueFormat, (formatV, formatF)=> {
                    this.formattedValue[formatF] = {};
                    if (formatV instanceof Array) {
                        this.formattedValue[formatF] = this.parseArrayFieldObject(formatV, value);
                    } else {
                        this.formattedValue[formatF] = value.charAt(formatV);
                    }
                });
            }
        }
    }

    parseArrayFieldObject(fieldObject, value) {
        let result = {};
        const start = fieldObject[0];
        let end;
        let format;
        if (fieldObject[1] instanceof Object) {
            format = fieldObject[1];
        } else {
            end = fieldObject[1];
        }
        if (fieldObject.length > 2) {
            format = fieldObject[2];
        }
        value = end ? value.substr(start, end) : value.charAt(start);
        if (format) {
            if (format instanceof Array) {
                format.forEach((label, index)=> {
                    result[label] = value.charAt(index);
                });
            } else {
                lodash.find(format, (fmtValue, field)=> {
                    let matched = fmtValue === value;
                    if (matched) {
                        result = field;
                    }
                    return matched;
                });
            }
        } else {
            result = value;
        }
        return lodash.isEmpty(result) ? undefined : result;
    }

    getValue() {
        return this.formattedValue;
    }

    getField() {
        return this.field;
    }

}