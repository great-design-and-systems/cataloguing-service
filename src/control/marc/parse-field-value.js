import lodash from 'lodash';
export default class ParseFieldValue {
    constructor(keys, context, processKey, callback) {
        this.processKey = processKey;
        this.parseKeys(keys, context, {}, undefined, (err, result)=> {
            if (err) {
                callback(err);
            } else {
                callback(undefined, result);
            }
        });
    }

    parseKeys(keys, context, newContext, mainKey, done) {
        try {
            const key = keys.shift();
            const contextValue = context[key];
            if (contextValue && contextValue !== null) {
                if (contextValue instanceof Object) {
                    const contextValueKeys = lodash.keys(contextValue);
                    this.parseKeys(contextValueKeys, contextValue, {}, key, (err, subNewContext)=> {
                        if (err) {
                            done(err);
                        } else {
                            newContext[key] = subNewContext;
                        }
                    })
                } else if (this.processKey) {
                    newContext[key] = this.processKey(key.toLowerCase(), contextValue, mainKey ? mainKey.toLowerCase() : undefined);
                }
            }

            if (keys && keys.length > 0) {
                this.parseKeys(keys, context, newContext, mainKey, done);
            } else {
                done(undefined, newContext);
            }
        } catch (err) {
            done(err);
        }
    }
}