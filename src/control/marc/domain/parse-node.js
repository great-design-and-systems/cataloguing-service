import lodash from 'lodash';
import GetDecodedValue from '../get-decoded-value';
export default class ParseNode {
  constructor(parent, key) {
    this.children = [];
    if (parent) {
      this.format = parent.format;
      parent.getChildren().push(this);
    }
    this.parent = parent;
    this.key = key ? key.trim() : key;
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
    if (this.parent && this.parent.getKey() !== null) {
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
    while (parent && parent.getKey() !== rootKey) {
      lodash.filter(format, (valueF) => {
        let found = false;
        if (valueF instanceof Array) {
          found = valueF[0] === parent.getKey();
        } else if (valueF instanceof Object) {} else {
          found = valueF === parent.getKey() || valueF.indexOf(parent.getKey()) > -1;
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
      if (valueF) {
        if (valueF instanceof Array) {
          found = valueF[0] === this.key;
        } else if (valueF instanceof Object) {} else {
          found = valueF === this.key || valueF.indexOf(this.key) > -1;
        }
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
  getDecodedValue() {
    return new GetDecodedValue(this).getDecodedValue();
  }
  getParent() {
    return this.parent;
  }
  getKey() {
    return this.key;
  }
  getValue() {
    return this.value;
  }
}