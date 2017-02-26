import lodash from 'lodash';
import GetFormattedValue from './get-formatted-value'
export default class ParseFieldValue {
    constructor(keys, context, marcFormat, callback) {
        this.parseKeys(keys, context, {}, marcFormat, (err, result)=> {
            if (err) {
                callback(err);
            } else {
                callback(undefined, result);
            }
        });
    }

    parseKeys(keys, context, newContext, marcFormat, done) {
        try {
            const key = keys.shift();
            console.log('key', key);
            const contextValue = context[key];
            console.log('contextValue', contextValue);
            if (contextValue instanceof Object) {
                const contextKeys = lodash.keys(contextValue);
                this.parseKeys(contextKeys, contextValue, {}, marcFormat, (err, subContextResult)=> {
                    if (err) {
                        done(err);
                    } else {
                        console.log('parse result', subContextResult);
                    }
                });
            } else {
                const process = this.processKey(contextValue, marcFormat, key);
                if (process.key && process.value) {
                    newContext[process.key] = process.value;
                }
            }
            /*      if (key) {
             const contextValue = context[key];
             const format = marcFormat[key.toLowerCase()] || marcFormat;
             if (contextValue && contextValue !== null) {
             if (contextValue instanceof Object) {
             const contextValueKeys = lodash.keys(contextValue);
             this.parseKeys(contextValueKeys, contextValue, {}, format, (err, subNewContext)=> {
             if (err) {
             done(err);
             } else {
             newContext[key] = subNewContext;
             }
             });
             } else {
             const process = this.processKey(contextValue, format, key);
             newContext[process.key] = process.value;
             }
             }
             }*/

            if (keys && keys.length > 0) {
                this.parseKeys(keys, context, newContext, marcFormat, done);
            } else {
                done(undefined, newContext);
            }

        } catch (err) {
            done(err);
        }
    }

    processKey(value, format, key) {
        const getFormattedValue = new GetFormattedValue(value, format, key);
        return {
            key: getFormattedValue.getField(),
            value: getFormattedValue.getValue()
        };
    }
}
