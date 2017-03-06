import {findInArray,sequenceItem} from '../catalog-utils';
import lodash from 'lodash';
export default class GetSubjectsFromMarc {
    constructor(rootNode) {
        const dataField = findInArray('key', 'dataField', rootNode.getChildren());
        const subjectFields = findInArray('key', '650', dataField.getChildren());
        //TODO: add support for 600, 610, 611, 630, 648, 650, 651, 653, 654, 655, 656, 657, 658 or 690 just SWITCH it!
        sequenceItem(subjectFields.getChildren(), (item, data, next)=> {
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
            if (result instanceof Array) {
                if (result.length > 1) {
                    this.subjects = result;
                } else {
                    this.subjects = lodash.values(result[0]);
                }
            } else {
                this.subjects = lodash.values(result);
            }
        });
    }

    getSubjects() {
        return this.subjects;
    }
}
