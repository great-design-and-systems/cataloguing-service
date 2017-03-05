import {
    expect
} from 'chai';
import path from 'path';
import GetCategoryFromMarc from '../../src/control/catalog/get-category-from-marc';
import MarcDecoder from '../../src/control/marc/marc-decoder';
const sampleMarcData_008 = {
    "controlField": {
        "001": "395910",
        "005": "19860122000000.0",
        "008": "791218s1979    sp       b    000 0 spa"
    }
};
const sampleMarcData_006 = {
    "controlField": {
        "001": "395910",
        "005": "19860122000000.0",
        "006": "791218s1979    sp       b    000 0 spa"
    }
};
describe('Get category from marc spec', ()=> {
    it('should get category from 006 if 008 does not exists', (done)=> {
        done();
    });
    it('should get category from 008 if 006 does not exists', (done)=> {
        new MarcDecoder(sampleMarcData_008, (err, rootNode)=> {
            const category = new GetCategoryFromMarc(rootNode).getCategory();
            expect(category).to.be.equal('MIXED MATERIALS');
            done();
        });
    });
});