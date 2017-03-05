import ItemModel from '../../entity/item';
export default class GetItemByName {
  constructor(itemName, callback) {
    ItemModel.findOne({
      name: itemName
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