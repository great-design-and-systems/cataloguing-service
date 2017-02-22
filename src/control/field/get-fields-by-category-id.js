import FieldModel from '../../entity/field';

export default class GetFieldsByCategoryId {
    constructor(categoryId, callback) {
        FieldModel.find({
            categoryId: categoryId
        }, (err, result) => {
            if (err) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'Failed getting fields'
                });
            } else {
                callback(undefined, result);
            }
        });
    }
}