import SubjectAssociationModel from '../../entity/subject-association';

export default class CreateSubjectAssociation {

    constructor(data, callback) {
        SubjectAssociationModel.create({
            parentSubjectId: data.parentSubjectId,
            subjectId: data.subjectId,
            itemId: data.itemId
        }, (err, result) => {
            if (err) {
                callback({
                    message: 'Failed saving subject-association'
                });
            } else {
                callback(undefined, result);
            }
        });
    }
}