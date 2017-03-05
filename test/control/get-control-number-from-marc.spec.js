import {
    expect
} from 'chai';
import path from 'path';
import GetControlNumberFromMarc from '../../src/control/catalog/get-control-number-from-marc';
import MarcDecoder from '../../src/control/marc/marc-decoder';
const sampleMarcData_001 = {
    "controlField": {
        "001": "395910",
        "005": "19860122000000.0",
        "008": "791218s1979    sp       b    000 0 spa"
    }
};

describe('Get control number from marc spec', ()=> {
    it('should get control number from marc', (done)=> {
        new MarcDecoder(sampleMarcData_001, (err, rootNode)=> {
            const controlNumber = new GetControlNumberFromMarc(rootNode).getControlNumber();
            expect(controlNumber).to.be.equal('395910');
            done();
        });
    });
});