import lodash from 'lodash';
import ParseNode from './domain/parse-node';

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
}