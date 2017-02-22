import FieldModel from '../../entity/field';

export default class GetFieldById {
    constructor(fieldId, callback) {
        FieldModel.findOne({
            _id: fieldId
        }, (err, result) => {
            if (err) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'Failed getting field'
                });
            } else {
                callback(undefined, result);
            }
        });
    }
}