import FieldModel from '../../entity/field';

export default class CreateField {
    constructor(categoryId, field, callback) {
        FieldModel.create({
            name: field.name,
            fieldType: field.fieldType,
            categoryId: categoryId,
            isFilter: field.isFilter,
            isRequired: field.isRequired,
            gridView: field.gridView
        }, (err, result) => {
            if (err) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'Failed saving field'
                });
            } else {
                callback(undefined, result);
            }
        });
    }
}
