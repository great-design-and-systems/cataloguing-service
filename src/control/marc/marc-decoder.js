import lodash from 'lodash';

export default class MarcDecoder {
    constructor(marcData, callback) {
        lodash.forEach(marcData, (value, field)=> {
            console.log('value', value);
            console.log('field', field);
            callback();
        });
    }
}