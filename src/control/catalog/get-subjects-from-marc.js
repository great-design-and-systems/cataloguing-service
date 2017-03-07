import {findInArray,sequenceItem} from '../catalog-utils';
import lodash from 'lodash';
export default class GetSubjectsFromMarc {
    constructor(rootNode) {
        const dataField = findInArray('key', 'dataField', rootNode.getChildren());
        const dataFieldsChildren = dataField.getChildren();
        sequenceItem(dataFieldsChildren, (dataFieldItem, dataFieldData, dataFieldNext)=> {
            const dataFieldKey = dataFieldItem.key;
            switch (dataFieldKey) {
                case '600':
                case '610':
                case '611':
                case '630':
                case '647':
                case '648':
                case '650':
                case '651':
                case '653':
                case '654':
                case '655':
                case '656':
                case '657':
                case '658':
                case '662':
                    const subjectFields = dataFieldItem.getChildren();
                    sequenceItem(subjectFields, (item, data, next)=> {
                        let obj = data || {};
                        try {
                            const decodedValue = item.getDecodedValue();
                            if (item.getChildren() && item.getChildren().length > 0) {
                                sequenceItem(item.getChildren(), (subItem, subData, subNext)=> {
                                    let subObj = subData || {};
                                    const subDecodedValue = subItem.getDecodedValue();
                                    subObj[subItem.key] = subDecodedValue;
                                    subNext(undefined, subObj);
                                }, (err, subResult)=> {
                                    if (err) {
                                        next(err);
                                    } else {
                                        obj[item.key] = lodash.values(subResult);
                                    }
                                });
                            } else {
                                obj[item.key] = lodash.values(decodedValue)[0];
                            }
                            next(undefined, obj);
                        } catch (err) {
                            next(err);
                        }
                    }, (err, result)=> {
                        if (err) {
                            dataFieldNext(err);
                        } else {
                            let nextItemData;
                            if (result instanceof Array) {
                                if (result.length > 1) {
                                    nextItemData = result;
                                } else {
                                    nextItemData = lodash.values(result[0]);
                                }
                            } else {
                                nextItemData = lodash.values(result);
                            }
                            if (dataFieldData) {
                                let newDataField = dataFieldData;
                                if (!(dataFieldData instanceof Array)) {
                                    newDataField.push(lodash.clone(dataFieldData));
                                }
                                if (nextItemData instanceof Array) {
                                    newDataField = newDataField.concat(nextItemData)
                                } else {
                                    newDataField.push(nextItemData);
                                }
                                dataFieldNext(undefined, newDataField);
                            } else {
                                dataFieldNext(undefined, nextItemData);
                            }
                        }
                    });
                    break;
                default:
                    dataFieldNext(undefined, dataFieldData);
                    break;
            }
        }, (dataFieldError, dataFieldResult)=> {
            this.subjects = dataFieldResult;
        });
    }

    getSubjects() {
        return this.subjects;
    }
}
