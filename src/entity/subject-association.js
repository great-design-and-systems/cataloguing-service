import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const SubjectAssociationSchema = mongoose.Schema({
    subjectParentID: String,
    subjectId: {
        type: String,
        required: true
    },
    itemId: String
});
SubjectAssociationSchema.plugin(mongoosePaginate);
const SubjectAssociationModel = mongoose.model('subject-association', SubjectAssociationSchema);

export default SubjectAssociationModel;