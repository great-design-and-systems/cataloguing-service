import MarcDecoder from '../control/marc/marc-decoder';
import CreateItem from '../control/item/create-item';
import GetCategoryFromMarc from '../control/catalog/get-category-from-marc';
import GetControlNumberFromMarc from '../control/catalog/get-control-number-from-marc';
import GetTitleStatementFromMarc from '../control/catalog/get-title-statement-from-marc';
import GetCategoryByName from '../control/category/get-category-by-name';
import CreateCategory from '../control/category/create-category';

import batch from 'batchflow';
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
                const batchActions = [
                    {
                        action: (data, callback)=> {
                            new GetCategoryByName(category, (err, categoryData)=> {
                                if (err) {
                                    callback();
                                } else {
                                    callback(categoryData);
                                }
                            });
                        }
                    },
                    {
                        action: (data, callback)=> {
                            console.log('data', data);
                            if (data) {
                                callback(data);
                            } else {
                                new CreateCategory({name: category}, (err, categoryData)=> {
                                    if (err) {
                                        throw err;
                                    } else {
                                        callback(categoryData);
                                    }
                                });
                            }

                        }
                    }
                ];

                batch(batchActions).sequential()
                    .each(function (i, item, next) {
                        console.log('item', item);
                        console.log('seq', this);
                        next('sample');
                    });

                const controlnumber = new GetControlNumberFromMarc(decodedMarc).getControlNumber();
                const titleStatement = new GetTitleStatementFromMarc(decodedMarc).getTitleStatement();
                callback();
            }
        });
    }
}