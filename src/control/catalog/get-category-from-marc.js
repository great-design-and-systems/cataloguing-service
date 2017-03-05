import lodash  from 'lodash';
export default class GetCategoryFromMarc {
    constructor(rootNode) {
        const controlField = rootNode.getChildren()[1].getChildren();
        if (controlField && controlField.length) {
            let categoryField;
            lodash.forEach(controlField, field=> {
                if (!categoryField) {
                    switch (field.key) {
                        case '006':
                            categoryField = field;
                            break;
                        case '008':
                            categoryField = field;
                            break;
                    }
                }
            });
            if (categoryField) {
                const formatted = categoryField.getDecodedValue();
                this.category = formatted['ADDITIONAL MATERIAL CHARACTERISTICS'] ? formatted['ADDITIONAL MATERIAL CHARACTERISTICS'].instance : formatted['DATA ELEMENTS'].instance;
            }
        }
    }

    getCategory() {
        return this.category;
    }
}