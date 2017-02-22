import CategoryModel from '../../entity/category';

export default class RemoveCategoryById {
    constructor(id, callback) {
        CategoryModel.remove({
            _id: id
        }, (err) => {
            if (err) {
                global.gdsLogger.error(err);
                callback({
                    message: 'Failed deleting category'
                });
            } else {
                callback();
            }
        });
    }
}