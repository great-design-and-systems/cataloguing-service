import lodash from 'lodash';
import GetFormattedValue from './get-formatted-value'
const CODE_VALUE_REGEX = /{.*}/g;
const DOLLAR = '$';
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
        let fieldFormat;
        while (parent && parent.key !== rootKey) {
            lodash.filter(format, (valueF) => {
                let found = false;
                if (valueF instanceof Array) {
                    found = valueF[0] === parent.key;
                } else {
                    found = valueF === parent.key || valueF.indexOf(parent.key) > -1;
                }
                if (found) {
                    format = valueF;
                    return found;
                }
            });
            parent = parent.getParent();
        }
        lodash.filter(format, (valueF, field) => {
            let found = false;
            if (valueF instanceof Array) {
                found = valueF[0] === this.key;
            } else {
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
        const {
            config,
            field
            } = this.getFormat();
        const objF = {};
        let formattedValue = {};
        if (config instanceof Object) {
            if (config instanceof Array) {
                let newFormat = config[1];
                console.log('config', config);
                console.log('field', field);
                if (this.value) {
                    let group;
                    let label;
                    lodash.forIn(newFormat, (formatV, formatF) => {
                        if (formatF.indexOf(DOLLAR) > -1) {
                            const splittedField = formatF.split(DOLLAR);
                            group = splittedField[1];
                            if (splittedField[0].length > 1) {
                                label = splittedField[0];
                            }
                        }
                        if (label) {
                            formattedValue[label] = {};
                        }
                        if (formatV instanceof Array) {
                            formattedValue = parseArrayFieldObject(formatV, this.value);
                        } else if (formatV instanceof Object) {
                            lodash.forIn(formatV, (_formatV, _formatF) => {
                                const value = parseArrayFieldObject(_formatV, this.value);
                                if (value) {
                                    if (label) {
                                        formattedValue[label][_formatF] = value;
                                    } else {
                                        formattedValue[_formatF] = value;
                                    }
                                }
                            });
                        } else if (CODE_VALUE_REGEX.test(formatV)) {
                            if (label) {
                                formattedValue[label] = this.value;
                            } else {
                                formattedValue[formatF] = this.value;
                            }
                        }
                    });
                    if (group) {
                        formattedValue = {
                            instance: group,
                            content: formattedValue
                        }
                    }
                }
            } else {
            }
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

function parseArrayFieldObject(fieldObject, value) {
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
            format.forEach((label, index) => {
                result[label] = value.charAt(index);
            });
        } else {
            lodash.find(format, (fmtValue, field) => {
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
    return lodash.isEmpty(result) ? undefined : lodash.isEmpty(result) ? undefined : result;
}
class ParseNodeValue {
    constructor(value, format) {

    }
}