import ItemModel from '../../entity/item';
export default class UpdateItem {
  constructor(itemId, item, callback) {
    ItemModel.findByIdAndUpdate(itemId, item, (err, result) => {
      if (err) {
        global.gdsLogger.logError(err);
        callback({
          message: 'Failed updating item'
        });
      } else {
        callback(undefined, result);
      }
    });
  }
}