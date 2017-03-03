import lodash from 'lodash';
const CODE_VALUE_REGEX = /{.*}/i;
const DOLLAR = '$';
export default class GetDecodedValue {
  constructor(parseNode) {
    this.parseNode = parseNode;
  }
  getDecodedValue() {
    const {
      config,
      field
    } = this.parseNode.getFormat();
    let objF = {};
    const key = this.parseNode.getKey();
    let formattedValue = {};
    if (config instanceof Object) {
      if (config instanceof Array) {
        let newFormat = config[1];
        if (this.parseNode.getValue()) {
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
              formattedValue = parseArrayFieldObject(formatV, this.parseNode.getValue());
            } else if (CODE_VALUE_REGEX.test(formatV) && formatV.indexOf(key) > -1) {
              if (label) {
                formattedValue[label][formatF] = this.parseNode.getValue();
              } else {
                formattedValue[formatF] = this.parseNode.getValue();
              }
            } else if (formatV instanceof Object) {
              lodash.forIn(formatV, (_formatV, _formatF) => {
                const value = parseArrayFieldObject(_formatV, this.parseNode.getValue());
                if (value) {
                  if (label) {
                    formattedValue[label][_formatF] = value;
                  } else {
                    formattedValue[_formatF] = value;
                  }
                }
              });
            }
          });
          if (group) {
            formattedValue = {
              instance: group,
              content: formattedValue
            }
          }
        }
      }
    } else if (CODE_VALUE_REGEX.test(config)) {

    } else {
      formattedValue = this.parseNode.getValue();
    }
    if (field) {
      objF[field] = formattedValue;
    } else {
      objF = formattedValue;
    }

    return objF;

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