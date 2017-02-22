import CategoryModel from '../../entity/category';
export default class GetCategoryByName {
    constructor(categoryName, callback) {
        CategoryModel.findOne({
            name: categoryName
        }, (err, category) => {
            if (err || !category) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'Failed getting category'
                });
            } else {
                callback(undefined, category);
            }
        });
    }
}