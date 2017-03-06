import {SearchResponseDataFull, SearchResponseDataWithDuplicateDatafield} from './data/search-response.data';
import {expect} from 'chai';
import SearchResponse from '../../src/control/search/search-response';

describe('Search response spec', ()=> {
    it('should get the number of records', ()=> {
        const response = new SearchResponse(SearchResponseDataFull);
        expect(response.totalRecords).to.be.equal('7019');
    });
    it('should get array of data fields', ()=> {
        const response = new SearchResponse(SearchResponseDataWithDuplicateDatafield);
        expect(response.data[0].dataField['650'] instanceof Array).to.be.true;
        expect(response.data[0].dataField['650'].length).to.be.equal(3);
    })
});