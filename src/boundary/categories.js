import CreateCategory from '../control/category/create-category';
import CreateField from '../control/field/create-field';
import GetCategoryById from '../control/category/get-category-by-id';
import GetCategoryByName from '../control/category/get-category-by-name';
import GetCategoryList from '../control/category/get-category-list';
import GetFieldsByCategoryId from '../control/field/get-fields-by-category-id';
import RemoveCategoryById from '../control/category/remove-category-by-id';
import RemoveFieldsByCategoryId from '../control/field/remove-fields-by-category-id';
import UpdateCategory from '../control/category/update-category';
import UpdateField from '../control/field/update-field';
import batch from 'batchflow';
import lodash from 'lodash';

export default class CategoryService {
    constructor(dynamicService) {
        this.dynamicService = dynamicService;
    }

    createCategory(data, callback) {
        if (data.fields) {
            new CreateCategory(data, (err, category) => {
                if (err) {
                    callback(err);
                } else {
                    batch(data.fields).parallel()
                        .each((i, field, done) => {
                            new CreateField(category._id, field, (err) => {
                                if (err) {
                                    global.gdsLogger.logError(err);
                                }
                                done();
                            });
                        })
                        .end(() => {
                            callback(undefined, category);
                        });
                }
            });
        } else {
            callback(new Error('At least one field is required when creating category.'));
        }
    }

    getCategoryList(paginate, callback) {
        new GetCategoryList(paginate, callback);
    }

    getCategoryById(categoryId, callback) {
        new GetCategoryById(categoryId, (err, category) => {
            if (err || category == null) {
                if (category == null) {
                    err = {
                        message: 'Category not found.'
                    }
                }
                callback(err);
            } else {
                new GetFieldsByCategoryId(categoryId, (errfields, fields) => {
                    if (errfields) {
                        callback(err);
                    } else {
                        const result = {};
                        result._id = category._id;
                        result.name = category.name;
                        result.rules = category.rules;
                        result.createdOn = category.createOn;
                        result.approver = category.approver;
                        result.iconGlyph = category.iconGlyph;
                        result.fields = fields;
                        callback(null, result);
                    }
                });
            }
        });
    }

    updateCategory(categoryId, data, callback) {
        var categoryData = lodash.clone(data);
        lodash.unset(categoryData, 'fields');
        new UpdateCategory(categoryId, categoryData, (err, category) => {
            if (err) {
                callback(err);
            } else {
                batch(data.fields).parallel()
                    .each((i, field, done) => {
                        new UpdateField(field._id, field, (err) => {
                            if (err) {
                                global.gdsLogger.logError(err);
                            }
                            done();
                        });
                    })
                    .end(() => {
                        callback(undefined, category);
                    });
            }
        });
    }

    removeCategoryById(categoryId, callback) {
        new RemoveCategoryById(categoryId, (err) => {
            if (err) {
                callback(err);
            } else {
                new RemoveFieldsByCategoryId(categoryId, callback);
            }
        });
    }

    getCategoryByName(categoryName, callback) {
        new GetCategoryByName(categoryName, (err, category) => {
            if (err || !category) {
                callback(err);
            } else {
                new GetFieldsByCategoryId(category._id, (err, fields) => {
                    if (err) {
                        callback(err);
                    } else {
                        const result = {};
                        result._id = category._id;
                        result.name = category.name;
                        result.rules = category.rules;
                        result.createdOn = category.createOn;
                        result.approver = category.approver;
                        result.iconGlyph = category.iconGlyph;
                        result.fields = fields;
                        callback(null, result);
                    }
                });
            }
        });
    }

    getCategoryItemData(categoryId, itemId, callback) {
        new GetCategoryById(categoryId, (e, category) => {
            if (e) {
                callback(e);
            } else {
                this.dynamicService.getItemCategory({
                    category: category.name, query: {
                        itemId: itemId
                    }
                }, undefined, (err, itemData) => {
                    if (err) {
                        callback(err);
                    } else {
                        new GetFieldsByCategoryId(categoryId, (err, fields) => {
                            if (err) {
                                callback(err);
                            } else {
                                let items = [];
                                items[0] = {
                                    item: itemData.docs[0],
                                    fields: fields
                                }
                                callback(null, items);
                            }
                        });
                    }
                });
            }
        });
    }
}