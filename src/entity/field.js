import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const FieldSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Field name is required.']
    },
    fieldType: {
        type: String,
        enum: ['number', 'text', 'date', 'boolean', 'document'],
        required: [true, 'Field type is required']
    },
    categoryId: String,
    isFilter: {
        type: Boolean,
        default: false
    },
    isRequired: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    gridView: {
        type: String,
        default: 'none'
    }
});
FieldSchema.plugin(mongoosePaginate);

const FieldModel = mongoose.model('field', FieldSchema);

export default FieldModel;
