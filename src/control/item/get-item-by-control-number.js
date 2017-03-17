import ItemModel from '../../entity/item';
export default class GetItemByControlNumber {
    constructor(controlNumber, callback) {
        ItemModel.findOne({
            controlNumber: controlNumber
        }, (err, item) => {
            if (err || !item) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'Failed getting an item'
                });
            } else {
                callback(undefined, item);
            }
        });
    }
}