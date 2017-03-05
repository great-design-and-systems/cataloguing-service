import lodash from 'lodash';

export default class CreateItemDescription {
    constructor(content, fieldConfigs) {
        this.description = '';
        lodash.forEach(fieldConfigs, fieldConfig => {
            if (fieldConfig.isFilter && fieldConfig.fieldType === 'text') {
                this.description += ' ' + lodash.get(content, fieldConfig.name);
            }
        });
    }
    getDescription() {
        return this.description;
    }
}