import CreateField from '../control/field/create-field';
import GetFieldById from '../control/field/get-field-by-id';
import GetFieldsByCategoryId from '../control/field/get-fields-by-category-id';
import UpdateField from '../control/field/update-field';
import RemoveFieldById from '../control/field/remove-field-by-id';
export default class FieldService {

    createField(data, callback) {
        new CreateField(data.categoryId, data, callback);
    }

    getFieldById(fieldId, callback) {
        new GetFieldById(fieldId, callback);
    }

    updateField(fieldId, field, callback) {
        new UpdateField(fieldId, field, callback);
    }

    removeFieldById(fieldId, callback) {
        new RemoveFieldById(fieldId, callback);
    }

    getFieldsByCategoryId(categoryId, callback) {
        new GetFieldsByCategoryId(categoryId, callback);
    }
}