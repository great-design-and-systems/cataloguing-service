import FieldModel from '../../entity/field';

export default class RemoveFieldsByCategoryId {
    constructor(categoryId, callback) {
        FieldModel.remove({
            categoryId: categoryId
        }, (err) => {
            if (err) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'Failed deleting fields'
                });
            } else {
                callback();
            }
        });
    }
}