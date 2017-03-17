import CreateItem from '../control/item/create-item';
import CreateItemDescription from '../control/item/create-item-description';
import { GDSEventJobs } from 'gds-config';
import GetItemById from '../control/item/get-item-by-id';
import GetItemByName from '../control/item/get-item-by-name';
import GetItems from '../control/item/get-items';
import RemoveItemById from '../control/item/remove-item-by-id';
import UpdateItem from '../control/item/update-item';
import batch from 'batchflow';

export default class ItemService {

    createItem(data, callback) {
        new CreateItem(data, callback);
    }

    updateDescription(itemId, content, fieldConfigs, callback) {
        if (fieldConfigs) {
            new UpdateItem(itemId, {description: new CreateItemDescription(content, fieldConfigs).getDescription()}, (err, itemData) => {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, itemData);
                }
            });
        }
    }

    updateItemCategoryName(itemId, categoryName, callback) {
        new UpdateItem(itemId, {categoryName: categoryName}, (err, itemData) => {
            if (err) {
                callback(err);
            } else {
                callback(undefined, itemData);
            }
        });
    }

    getItems(paginate, callback) {
        new GetItems({}, paginate, callback);
    }

    getRecentlyAddedItems(queryParam, paginate, callback) {
        const query = {};
        if (queryParam.categoryId) {
            query.category = queryParam.categoryId;
        }
        paginate.sort = '-createdOn';
        new GetItems(query, paginate, callback);
    }

    getItemsByCategoryId(categoryId, paginate, callback) {
        new GetItems({category: categoryId}, paginate, (err, result) => {
            if (err) {
                callback(err);
            } else {
                const items = [];
                batch(result.docs).sequential()
                    .each((i, item, done) => {
                        const data = {};
                        data._id = item._id;
                        data.name = item.name;
                        data.imageId = item.imageId;
                        data.description = item.description;
                        data.category = item.category;
                        data.categoryName = item.categoryName;
                        data.code = item.code;
                        data.createdOn = item.createdOn;

                        if (item.description) {
                            data.fields = item.description.split(' ');
                        }
                        items.push(data);
                        done();
                    })
                    .end(() => {
                        result.docs = items;
                        callback(undefined, result);
                    });
            }
        });
    }

    getItemById(itemId, callback) {
        new GetItemById(itemId, callback);
    }

    updateItem(itemId, item, callback) {
        new UpdateItem(itemId, item, callback);
    }

    removeItemById(itemId, callback) {
        new RemoveItemById(itemId, callback);
    }

    getItemByName(itemName, callback) {
        new GetItemByName(itemName, callback);
    }
}