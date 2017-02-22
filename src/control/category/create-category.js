import CategoryModel from '../../entity/category';

export default class CreateCategory {
    constructor(data, callback) {
        CategoryModel.create({
            name: data.name,
            iconGlyph: data.iconGlyph,
            iconField: data.iconField,
            rules: data.rules
        }, (err, result) => {
            if (err) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'Failed saving category'
                });
            } else {
                callback(undefined, result);
            }
        });
    }
}
