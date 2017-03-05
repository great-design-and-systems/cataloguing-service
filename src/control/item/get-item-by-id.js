import ItemModel from '../../entity/item';

export default class GetItemById {
  constructor(itemId, callback) {
    ItemModel.findOne({
      _id: itemId
    }, (err, result) => {
      if (err) {
        global.gdsLogger.logError(err);
        callback({
          message: 'Failed getting an item'
        });
      } else {
        callback(undefined, result);
      }
    });
  }
}