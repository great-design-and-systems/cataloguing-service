import ItemModel from '../../entity/item';

export default class RemoveItemById {
    constructor(id, callback) {
        ItemModel.remove({
            _id: id
        }, (err) => {
            if (err) {
                global.gdsLogger.error(err);
                callback({
                    message: 'Failed saving item'
                });
            } else {
                callback();
            }
        });
    }
}