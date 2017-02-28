import lodash from 'lodash';
import GetFormattedValue from './get-formatted-value'
const CODE_VALUE_REGEX = /{.*}/g;
export default class ParseFieldValue {
    constructor(context, marcFormat, callback) {
        const rootNode = new ParseNode(null, null);
        rootNode.setFormat(marcFormat);
        try {
            const keys = lodash.keys(context);
            this.parseKeys(keys, context, rootNode);
            callback(undefined, rootNode);
        } catch (err) {
            callback(err);
        }
    }

    parseKeys(keys, context, parent) {
        const key = keys.shift();
        if (key) {
            const contextValue = context[key];
            const parseNodeValue = new ParseNode(parent, key);
            if (contextValue instanceof Object) {
                const contextKeys = lodash.keys(contextValue);
                if (contextKeys && contextKeys.length) {
                    this.parseKeys(contextKeys, contextValue, parseNodeValue);
                }
            } else {
                parseNodeValue.setValue(contextValue);
            }
        }
        if (keys && keys.length > 0) {
            this.parseKeys(keys, context, parent);
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


class ParseNode {

    constructor(parent, key) {
        this.children = [];
        if (parent) {
            this.format = parent.format;
            parent.children.push(this);
        }
        this.parent = parent;
        this.key = key;
    }

    setValue(value) {
        this.value = value;
    }

    setFormat(format) {
        this.format = format;
    }

    getChildren() {
        return this.children;
    }

    getRoot() {
        let rootKey;
        if (this.parent && this.parent.key !== null) {
            rootKey = this.parent.getRoot();
        } else {
            rootKey = this.key;
        }
        return rootKey;
    }

    getFormat() {
        const rootKey = this.getRoot();
        const mainFormat = this.format[rootKey.toLowerCase()];
        let parent = this.parent;
        let format = mainFormat;
        let fieldFormat = undefined;
        while (parent && parent.key !== rootKey) {
            lodash.filter(format, (valueF)=> {
                let found = false;
                if (valueF instanceof Array) {
                    found = valueF[0] === parent.key;
                }
                else {
                    found = valueF === parent.key || valueF.indexOf(parent.key) > -1;
                }
                if (found) {
                    format = valueF;
                    return found;
                }
            });
            parent = parent.getParent();
        }
        lodash.filter(format, (valueF, field)=> {
            let found = false;
            if (valueF instanceof Array) {
                found = valueF[0] === this.key;
            }
            else {
                found = valueF === this.key || valueF.indexOf(this.key) > -1;
            }
            if (found) {
                fieldFormat = field;
                format = valueF;
                return found;
            }
        });
        return {
            field: fieldFormat,
            config: format
        };
    }

    getFormattedValue() {
        const {config, field} = this.getFormat();
        const objF = {};
        let formattedValue;
        if (config instanceof Object) {
            console.log('config', config);
        } else if (CODE_VALUE_REGEX.test(config)) {

        } else {
            formattedValue = this.value;
        }
        objF[field] = formattedValue;
        return objF;

    }

    getParent() {
        return this.parent;
    }

}

class ParseNodeValue {

}

