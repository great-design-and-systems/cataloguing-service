import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const SubjectSchema = mongoose.Schema({
    title: {type: String, required: true},
    createdOn: {
        type: Date,
        default: Date.now
    }
});
SubjectSchema.plugin(mongoosePaginate);
const SubjectModel = mongoose.model('subject', SubjectSchema);

export default SubjectModel;