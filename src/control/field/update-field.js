import FieldModel from '../../entity/field';
export default class UpdateField {
    constructor(fieldId, field, callback) {
        FieldModel.findByIdAndUpdate(fieldId, field, (err, result) => {
            if (err) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'Failed updating field'
                });
            } else {
                callback(undefined, result);
            }
        });
    }
}