import MarcDecoder from '../control/marc/marc-decoder';
import CreateItem from '../control/item/create-item';
import GetCategoryFromMarc from '../control/catalog/get-category-from-marc';
import GetControlNumberFromMarc from '../control/catalog/get-control-number-from-marc';
import GetTitleStatementFromMarc from '../control/catalog/get-title-statement-from-marc';
import GetCategoryByName from '../control/category/get-category-by-name';
import CreateCategory from '../control/category/create-category';
import {sequence} from '../control/catalog-utils';
export default class CatalogService {
    constructor(dynamicTable) {
        this.dynamicTable = dynamicTable;
    }

    importMarcData(marcData, callback) {
        new MarcDecoder(marcData, (err, decodedMarc) => {
            if (err) {
                callback(err);
            } else {
                const category = new GetCategoryFromMarc(decodedMarc).getCategory();
                const controlNumber = new GetControlNumberFromMarc(decodedMarc).getControlNumber();
                const titleStatement = new GetTitleStatementFromMarc(decodedMarc).getTitleStatement();
                const actions = [
                    (data, next)=> {
                        new GetCategoryByName(category, (err, categoryData)=> {
                            if (err) {
                                next();
                            } else {
                                next(undefined, categoryData);
                            }
                        })
                    }, (data, next)=> {
                        if (data) {
                            next(undefined, data);
                        } else {
                            new CreateCategory({
                                name: category
                            }, (err, categoryData)=> {
                                if (err) {
                                    next(err);
                                } else {
                                    next(undefined, categoryData);
                                }
                            })
                        }
                    }, (data, next)=> {
                        new CreateItem({
                            category: data._id,
                            categoryName: data.name,
                            title: titleStatement.title,
                            remainderOfTitle: titleStatement.remainderOfTitle,
                            controlNumber: controlNumber
                        }, (err, item)=> {
                            if (err) {
                                next(err);
                            } else {
                                next(undefined, item);
                            }
                        });
                    }, (data, next)=> {
                        this.dynamicTable.createItemCategory({
                            category: category,
                            content: {
                                itemId: data._id,
                                raw: marcData
                            }
                        }, (err)=> {
                            if (err) {
                                next(err);
                            } else {
                                next(undefined, data);
                            }
                        })
                    }
                ];

                sequence(actions, (err, result)=> {
                    callback(err, result);
                });
            }
        });
    }
}