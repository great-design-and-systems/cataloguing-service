import {findInArray} from '../catalog-utils';

export default class GetControlNumberFromMarc {
    constructor(rootNode) {
        const controlField = rootNode.getChildren()[1].getChildren();
        if (controlField && controlField.length) {
            let categoryField = findInArray('key', '001', controlField);
            if (categoryField) {
                const formatted = categoryField.getDecodedValue();
                this.controlNumber = formatted['CONTROL NUMBER'];
            }
        }
    }

    getControlNumber() {
        return this.controlNumber;
    }
}