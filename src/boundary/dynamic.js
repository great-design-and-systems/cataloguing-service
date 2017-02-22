import DynamicCategoryTable from '../control/dynamic/dynamic-category-table';

export default class DynamicService {
    constructor() {
        this.dynamicCategoryTable = new DynamicCategoryTable();
    }

    createItemCategory(data, callback) {
        this.dynamicCategoryTable.createCategoryData(data.category, data.content, callback);
    }

    getItemCategory(data, paginate, callback) {
        this.dynamicCategoryTable.getCategoryData(data.category, data.query, paginate, callback);
    }

    updateItemCategory(data, callback) {
        this.dynamicCategoryTable.updateCategoryData(data.category, data.content, callback);
    }

    removeItemCategory(data, callback) {
        this.dynamicCategoryTable.deleteCategoryData(data.category, data.query, callback);
    }
}