import SubjectModel from '../../entity/subject';

export default class GetSubjectByTitle {

    constructor(title, callback) {
        SubjectModel.findOne({
            title: title
        }, (err, result) => {
            if (err || !result) {
                callback({
                    message: 'Failed finding subject'
                });
            } else {
                callback(undefined, result);
            }
        });
    }
}