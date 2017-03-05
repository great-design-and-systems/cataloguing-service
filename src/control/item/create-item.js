import ItemModel from '../../entity/item';

export default class CreateItem {

    constructor(data, callback) {
        ItemModel.create({
            description: data.description,
            category: data.category,
            categoryName: data.categoryName,
            barcode: data.barcode,
            imageId: data.imageId,
            controlNumber: data.controlNumber,
            remainderOfTitle: data.remainderOfTitle,
            title: data.title
        }, (err, result) => {
            if (err) {
                console.log('err', err);
                callback({
                    message: 'Failed saving item'
                });
            } else {
                callback(undefined, result);
            }
        });
    }
}