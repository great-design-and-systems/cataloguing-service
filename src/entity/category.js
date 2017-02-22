import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required.'],
    unique: true
  },
  iconGlyph: String,
  iconField: String,
  rules: Array,
  approver: String,
  createdOn: {
    type: Date,
    default: Date.now
  }
});
CategorySchema.plugin(mongoosePaginate);

const CategoryModel = mongoose.model('category', CategorySchema);

export default CategoryModel;