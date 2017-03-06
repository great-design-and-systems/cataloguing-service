import {
    expect
} from 'chai';
import path from 'path';
import GetCategoryFromMarc from '../../src/control/catalog/get-category-from-marc';
import MarcDecoder from '../../src/control/marc/marc-decoder';
import {SampleMarcData} from './data/parse-marc.data';

describe('Get category from marc spec', ()=> {
    let rootNode;
    before(done=> {
        new MarcDecoder(SampleMarcData, (err, node)=> {
            rootNode = node;
            done();
        });
    });
    it('should get category from leader', (done)=> {
        const category = new GetCategoryFromMarc(rootNode).getCategory();
        expect(category).to.be.equal('Books');
        done();
    });
});