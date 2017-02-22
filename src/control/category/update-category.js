import CategoryModel from '../../entity/category';
export default class UpdateCategory {
    constructor(categoryId, category, callback) {
        CategoryModel.findByIdAndUpdate(categoryId, category, (err, result) => {
            if (err) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'Failed updating category'
                });
            } else {
                callback(undefined, result);
            }
        });
    }
}