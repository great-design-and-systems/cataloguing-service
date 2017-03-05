import ItemModel from '../../entity/item';
export default class GetItems {
  constructor(query, paginate, callback) {
    ItemModel.paginate(query, paginate, (err, result) => {
      if (err) {
        global.gdsLogger.logError(err);
        callback({
          message: 'Failed getting items'
        });
      } else {
        callback(undefined, result);
      }
    });
  }
}