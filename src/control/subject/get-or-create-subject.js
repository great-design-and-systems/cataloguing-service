import GetSubjectByTitle from './get-subject-by-title';
import CreateSubject from './create-subject';

export default class GetOrCreateSubject {
    constructor(title, callback) {
        new GetSubjectByTitle(title, (errGetTitle, subjectData)=> {
            if (errGetTitle || !subjectData) {
                new CreateSubject(title, (errCreatingSubject, createdSubjectData)=> {
                    if (errCreatingSubject) {
                        callback(errCreatingSubject);
                    } else {
                        callback(undefined, createdSubjectData);
                    }
                });
            } else {
                callback(undefined, subjectData);
            }
        });
    }
}