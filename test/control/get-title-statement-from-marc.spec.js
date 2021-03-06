import {
    expect
} from 'chai';
import path from 'path';
import GetTitleStatementFromMarc from '../../src/control/catalog/get-title-statement-from-marc';
import MarcDecoder from '../../src/control/marc/marc-decoder';

const sampleMarcData = {
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

describe('Get title statement from marc spec', ()=> {
    it('should get title', (done)=> {
        new MarcDecoder(sampleMarcData, (err, rootNode)=> {
            const titleStatement = new GetTitleStatementFromMarc(rootNode).getTitleStatement();
            expect(titleStatement).to.not.be.undefined;
            expect(titleStatement.title).to.be.equal(sampleMarcData.dataField['245'].a);
            done();
        });
    });
    it('should get remainder of title', (done)=> {
        new MarcDecoder(sampleMarcData, (err, rootNode)=> {
            const titleStatement = new GetTitleStatementFromMarc(rootNode).getTitleStatement();
            expect(titleStatement).to.not.be.undefined;
            expect(titleStatement.remainderOfTitle).to.be.equal(sampleMarcData.dataField['245'].b);
            done();
        });
    });
});