import SubjectModel from '../../entity/subject';

export default class CreateSubject {

    constructor(data, callback) {
        SubjectModel.create({
            title: data
        }, (err, result) => {
            if (err) {
                callback({
                    message: 'Failed saving subject'
                });
            } else {
                callback(undefined, result);
            }
        });
    }
}