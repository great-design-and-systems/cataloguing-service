import {
  expect
} from 'chai';
import path from 'path';
import GetMarcFormat from '../../src/control/marc/get-marc-format';
import ParseFieldValue from '../../src/control/marc/parse-field-value';
const sampleMarcData = {
  "position": "2",
  "leader": "01073cam a2200277 p 4500",
  "controlField": {
    "001": "355557",
    "005": "20010103140233.0",
    "008": "770117s1976    be a     c    000 0 fre"
  },
  "dataField": {
    "245": {
      "a": "10 artistes, 200 bijoux :",
      "b": "exposition au Passage 44 à Bruxelles, du 6 mars au 5 avril 1976 = 10 artiesten, 200 juwelen : tentoonstelling in Passage 44 te Brussel, van 6 maart tot 5 april 1976.",
      "c": "sample"
    },
    "246": {},
    "260": {
      "a": "[Bruxelles] :",
      "b": "Crédit communal de Belgique,",
      "c": "[1976]"
    },
    "300": {
      "a": "[46] p. :",
      "b": "ill. ;",
      "c": "21 cm."
    },
    "500": {},
    "650": {
      "a": "Jewelry",
      "x": "Exhibitions.",
      "y": "20th century",
      "z": "Belgium"
    },
    "710": {},
    "740": {},
    "906": {
      "a": "7",
      "b": "cbc",
      "c": "orignew",
      "d": "3",
      "e": "ncip",
      "f": "19",
      "g": "y-gencatlg"
    },
    "991": {
      "b": "c-GenColl",
      "h": "NK7355.A1",
      "i": "D59",
      "t": "Copy 1",
      "w": "BOOKS"
    },
    "035": {},
    "010": {},
    "015": {},
    "040": {
      "a": "DLC",
      "c": "DLC",
      "d": "DLC"
    },
    "041": {},
    "043": {},
    "050": {
      "a": "NK7355.A1",
      "b": "D59"
    }
  }
};
//TODO: 245
describe('Generating ParseNodes', () => {

  it('should parse controlfield top level node', (done) => {
    new GetMarcFormat((err, marcFormat) => {
      const context = {
        leader: sampleMarcData.leader,
        controlField: sampleMarcData.controlField,
        dataField: sampleMarcData.dataField
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
        leader: sampleMarcData.leader,
        controlField: sampleMarcData.controlField,
        dataField: sampleMarcData.dataField
      };

      new ParseFieldValue(context, marcFormat, (err, result) => {
        let children = result.children[1].getChildren();
        let _008 = children[2];
        expect(_008.getValue()).to.be.equal(sampleMarcData.controlField['008']);
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
        leader: sampleMarcData.leader,
        controlField: sampleMarcData.controlField,
        dataField: sampleMarcData.dataField
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
                expect(formattedValue.Title).to.be.equal(sampleMarcData.dataField['245'].a);
                break;
              case 'b':
                expect(formattedValue['Remainder of title']).to.be.equal(sampleMarcData.dataField['245'].b);
                break;
              case 'c':
                expect(formattedValue['Statement of responsibility, etc']).to.be.equal(sampleMarcData.dataField['245'].c);
                break;
            }
          }
        }
        done();
      });
    });
  });
});