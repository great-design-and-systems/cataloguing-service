import lodash from 'lodash';
import GetFormattedValue from './get-formatted-value'
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
        if (this.parent) {
            rootKey = this.parent.getRoot();
        } else {
            rootKey = this.key;
        }
        return rootKey;
    }

    getFormat() {
        let newFormat = this.format;
        let parent = this.parent;
        const parentList = [];
        while (parent && parent.key) {
            parentList.push(parent.key);
            parent = parent.getParent();
        }
        for (let i = parentList.length; i > 0; i--) {
            newFormat = newFormat[parentList[i]];
        }
        return newFormat;
    }

    getParent() {
        return this.parent;
    }

}
