import GetOrCreateSubject from '../subject/get-or-create-subject';
import CreateSubjectAssociation from'../subject-association/create-subject-association';
import { sequenceItem} from '../catalog-utils';
import lodash from 'lodash';
export default class CreateItemSubjectAssociation {
    constructor(subjects, itemId, callback) {
        sequenceItem(subjects, (item, data, next)=> {
            if (item instanceof Array) {
                sequenceItem(item, (sItem, sData, sNext)=> {
                    new GetOrCreateSubject(lodash.values(sItem)[0], (sErr, sSubjectData)=> {
                        if (sErr) {
                            sNext(sErr);
                        } else {
                            new CreateSubjectAssociation({
                                parentSubjectId: sData,
                                subjectId: sSubjectData._id,
                                itemId: itemId
                            }, (errSubAssoc)=> {
                                if (errSubAssoc) {
                                    sNext(errSubAssoc);
                                } else {
                                    sNext(undefined, sSubjectData._id);
                                }
                            });
                        }
                    });
                }, (sErr)=> {
                    if (sErr) {
                        next(sErr);
                    } else {
                        next();
                    }
                })
            } else {
                new GetOrCreateSubject(lodash.values(item)[0], (err, subjectData)=> {
                    if (err) {
                        next(err);
                    } else {
                        new CreateSubjectAssociation({
                            parentSubjectId: data,
                            subjectId: subjectData._id,
                            itemId: itemId
                        }, (errSubAssoc)=> {
                            if (errSubAssoc) {
                                next(errSubAssoc);
                            } else {
                                next(undefined, subjectData._id);
                            }
                        });
                    }
                });
            }
        }, (err)=> {
            callback(err);
        });
    }
}

