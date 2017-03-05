import ItemModel from '../../entity/item';

export default class CreateItem {
    constructor(data, callback) {
        ItemModel.create({
            name: data.name,
            description: data.description,
            category: data.category,
            categoryName: data.categoryName,
            code: data.code,
            imageId: data.imageId
        }, (err, result) => {
            if (err) {
                callback({
                    message: 'Failed saving item'
                });
            } else {
                callback(undefined, result);
            }
        });
    }
}