import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const ItemSchema = mongoose.Schema({
    imageId: {
        type: String,
        required: [true, 'Item imageId is required.']
    },
    description: String,
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    categoryName: String,
    createdOn: {
        type: Date,
        default: Date.now
    },
    title: String,
    remainderOfTitle: String,
    controlNumber: String,
    barcode: String
});
ItemSchema.plugin(mongoosePaginate);

const ItemModel = mongoose.model('item', ItemSchema);

export default ItemModel;