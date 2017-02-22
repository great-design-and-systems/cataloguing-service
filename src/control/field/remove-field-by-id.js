import FieldModel from '../../entity/field';

export default class RemoveFieldById {
    constructor(id, callback) {
        FieldModel.remove({
            _id: id
        }, (err) => {
            if (err) {
                global.gdsLogger.error(err);
                callback({
                    message: 'Failed deleting field'
                });
            } else {
                callback();
            }
        });
    }
}