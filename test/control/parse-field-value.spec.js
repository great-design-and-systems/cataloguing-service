import {
    expect
} from 'chai';
import path from 'path';
import GetMarcFormat from '../../src/control/marc/get-marc-format';
import ParseFieldValue from '../../src/control/marc/parse-field-value';
import {findInArray} from '../../src/control/catalog-utils';
import {SampleMarcData,MarcDataWithMultipleDataFields} from './data/parse-marc.data';
//TODO: 245
describe('Generating ParseNodes', () => {

    it('should parse controlfield top level node', (done) => {
        new GetMarcFormat((err, marcFormat) => {
            const context = {
                leader: SampleMarcData.leader,
                controlField: SampleMarcData.controlField,
                dataField: SampleMarcData.dataField
            };
            new ParseFieldValue(context, marcFormat, (err, result) => {
                let controlField = result.getChildren()[1];
                let children = controlField.getChildren();
                let child = children[0];
                expect(child.getDecodedValue()['CONTROL NUMBER']).to.be.equal('355557');
                child = children[1];
                expect(child.getDecodedValue()['DATE AND TIME OF LATEST TRANSACTION']).to.be.equal('20010103140233.0');
                done();
            });
        });
    });
    it('should parse controlfield multi-level node', (done) => {
        //008
        new GetMarcFormat((err, marcFormat) => {

            const context = {
                leader: SampleMarcData.leader,
                controlField: SampleMarcData.controlField,
                dataField: SampleMarcData.dataField
            };

            new ParseFieldValue(context, marcFormat, (err, result) => {
                let children = result.children[1].getChildren();
                let _008 = children[2];
                expect(_008.getValue()).to.be.equal(SampleMarcData.controlField['008']);
                const decodedValue = _008.getDecodedValue()['DATA ELEMENTS'];
                expect(decodedValue).to.not.be.undefined;
                expect(decodedValue.instance).to.not.be.undefined;
                expect(decodedValue.content).to.not.be.undefined;
                expect(decodedValue.instance).to.be.equal('MIXED MATERIALS');
                expect(decodedValue.content['Date entered on file']).to.be.equal('77011');
                expect(decodedValue.content['Type of date/Publication status']).to.be.equal('Single known date/probable date');
                expect(decodedValue.content['Place of publication, production, or execution']).to.be.equal('be a     c    000');
                expect(decodedValue.content.Language).to.be.equal('fre');
                expect(decodedValue.content['Frequency [OBSOLETE]']).to.be.equal('Annual');
                expect(decodedValue.content['Publisher code [OBSOLETE]']).to.be.equal('   000 0 fre');
                expect(decodedValue.content['Citation indicator [OBSOLETE]']).to.be.equal('7');
                expect(decodedValue.content.Frequency).to.be.equal('Annual');
                expect(decodedValue.content['Nature of entire work']).to.be.equal('Catalogs');
                done();
            });
        });
    });
    it('should parse datafield', (done) => {
        new GetMarcFormat((err, marcFormat) => {
            const context = {
                leader: SampleMarcData.leader,
                controlField: SampleMarcData.controlField,
                dataField: SampleMarcData.dataField
            };
            new ParseFieldValue(context, marcFormat, (err, result) => {
                let children = result.children[2].getChildren();
                let child = children[0];
                let children2 = child.children;
                if (children2) {
                    for (let i = 0; i < children2.length; i++) {
                        const chd = children2[i];
                        const formattedValue = chd.getDecodedValue()
                        const key = chd.getKey();
                        switch (key) {
                            case 'a':
                                expect(formattedValue.Title).to.be.equal(SampleMarcData.dataField['245'].a);
                                break;
                            case 'b':
                                expect(formattedValue['Remainder of title']).to.be.equal(SampleMarcData.dataField['245'].b);
                                break;
                            case 'c':
                                expect(formattedValue['Statement of responsibility, etc']).to.be.equal(SampleMarcData.dataField['245'].c);
                                break;
                        }
                    }
                }
                done();
            });
        });
    });
    it('should parse subject', (done)=> {
        new GetMarcFormat((err, marcFormat) => {
            const context = {
                leader: SampleMarcData.leader,
                controlField: SampleMarcData.controlField,
                dataField: SampleMarcData.dataField
            };
            new ParseFieldValue(context, marcFormat, (err, result) => {
                let children = result.children[2].getChildren();
                const _650 = findInArray('key', '650', children);
                const _650Children = _650.getChildren();
                const a = findInArray('key', 'a', _650Children);
                expect(a.getDecodedValue()['Topical term or geographic name as entry element']).to.not.be.undefined;
                expect(a.getDecodedValue()['Topical term or geographic name as entry element']).to.be.equal(SampleMarcData.dataField['650'].a);
                done();
            });
        });
    });
    it('should parse multiple data fields', (done)=> {
        new GetMarcFormat((err, marcFormat) => {
            const context = {
                leader: MarcDataWithMultipleDataFields.leader,
                controlField: MarcDataWithMultipleDataFields.controlField,
                dataField: MarcDataWithMultipleDataFields.dataField
            };
            new ParseFieldValue(context, marcFormat, (err, result) => {
                let children = result.children[2].getChildren();
                const _650 = findInArray('key', '650', children);
                expect(_650.getChildren().length).to.be.equal(3);
                const _1st = _650.getChildren()[0];
                expect(_1st.getChildren()[0].getDecodedValue()['Topical term or geographic name as entry element']).to.be.equal('Illustrated periodicals');
                expect(_1st.getChildren()[1].getDecodedValue()['Geographic subdivision']).to.be.equal('Belgium');
                expect(_1st.getChildren()[2].getDecodedValue()['General subdivision']).to.be.equal('Exhibitions.');
                done();
            });
        });
    })
});