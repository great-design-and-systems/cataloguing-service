import MarcDecoder from '../control/marc/marc-decoder';
import SaveMarcData from '../control/catalog/save-marc-data';

export default class CatalogService {
    constructor(dynamicTable) {
        this.dynamicTable = dynamicTable;
    }

    importMarcData(marcData, callback) {
        new MarcDecoder(marcData, (err, decodedMarc) => {
            if (err) {
                console.log('err', err);
                callback(err);
            } else {
                callback(undefined, decodedMarc);
            }
        });
    }
}