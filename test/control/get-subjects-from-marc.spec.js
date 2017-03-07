import {expect} from'chai';
import GetSubjectsFromMarc from '../../src/control/catalog/get-subjects-from-marc';
import {MarcDataWithMultipleDataFields,SampleMarcData} from './data/parse-marc.data';
import MarcDecoder from '../../src/control/marc/marc-decoder';
describe('Get Subjects from MARC', ()=> {

    describe('GIVEN: subjects from simple data field', (done)=> {
        let simpleDataNode;
        beforeEach(done=> {
            new MarcDecoder(SampleMarcData, (err, nodeResult)=> {
                simpleDataNode = nodeResult;
                done();
            });
        });
        describe('WHEN: getting subjects', ()=> {
            it('THEN: it should return length of 4', (done)=> {
                const subjects = new GetSubjectsFromMarc(simpleDataNode).getSubjects();
                expect(subjects.length).to.be.equal(4);
                done();
            });
        });
    });

    describe('GIVEN: subjects from multile data fields', ()=> {
        let multipleDataNode;
        beforeEach(done=> {
            new MarcDecoder(MarcDataWithMultipleDataFields, (err, nodeResult)=> {
                multipleDataNode = nodeResult;
                done();
            });
        });
        describe('WHEN: getting subjects', ()=> {
            it('THEN: it should return length of 7', (done)=> {
                const subjects = new GetSubjectsFromMarc(multipleDataNode).getSubjects();
                expect(subjects.length).to.be.equal(7);
                done();
            });
        });
    });
});