import {expect} from'chai';
import GetSubjectsFromMarc from '../../src/control/catalog/get-subjects-from-marc';
import {MarcDataWithMultipleDataFields,SampleMarcData} from './data/parse-marc.data';
import MarcDecoder from '../../src/control/marc/marc-decoder';
describe('Get Subjects from MARC', ()=> {
    it('should get subjects from simple data field', (done)=> {
        new MarcDecoder(SampleMarcData, (err, nodeResult)=> {
            const subject = new GetSubjectsFromMarc(nodeResult).getSubjects();
            expect(subject.length).to.be.equal(4);
            done();
        });
    });
    it('should get subjects from multile data fields', (done)=> {
        new MarcDecoder(MarcDataWithMultipleDataFields, (err, nodeResult)=> {
            const subject = new GetSubjectsFromMarc(nodeResult).getSubjects();
            console.log('subject', subject);
            done();
        });
    });
});