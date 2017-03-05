import {
    expect
} from 'chai';
import path from 'path';
import {
    GDSDatabaseTest
} from 'gds-config';
const sampleMarcData = {
    "position": "13",
    "leader": "00779cam a2200241 i 4500",
    "controlField": {
        "001": "395910",
        "005": "19860122000000.0",
        "008": "791218s1979    sp       b    000 0 spa"
    },
    "dataField": {
        "100": {},
        "245": {
            "a": "La poesía de Gabriel Celaya :",
            "b": "la metamorfosis del hombre /",
            "c": "[por] Zelda Irene Brooks."
        },
        "260": {
            "a": "Madrid :",
            "b": "Playor,",
            "c": "D.L. 1979."
        },
        "300": {
            "a": "146 p. ;",
            "c": "19 cm."
        },
        "490": {},
        "504": {},
        "600": {
            "a": "Múgica, Rafael",
            "x": "Criticism and interpretation."
        },
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
            "h": "PQ6623.U34",
            "i": "Z59",
            "t": "Copy 1",
            "w": "BOOKS"
        },
        "035": {},
        "010": {},
        "015": {},
        "020": {},
        "040": {
            "a": "DLC",
            "c": "DLC",
            "d": "DLC"
        },
        "050": {
            "a": "PQ6623.U34",
            "b": "Z59"
        }
    }
};
describe('Catalog Spec', () => {
});