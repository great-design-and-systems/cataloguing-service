export default class SearchResponse {
    constructor(response) {
        this.totalRecords = 0;
        this.resultCount = 0;
        this.nextPosition = 0;
        this.data = [];
        if (response.searchRetrieveResponse) {
            const searchRetrieveResponse = response.searchRetrieveResponse;
            this.totalRecords = searchRetrieveResponse.numberOfRecords ? searchRetrieveResponse.numberOfRecords['__text'] : 0;
            this.resultCount = searchRetrieveResponse.echoedSearchRetrieveRequest ? searchRetrieveResponse.echoedSearchRetrieveRequest.maximumRecords['__text'] : 0;
            this.nextPosition = searchRetrieveResponse.nextRecordPosition ? searchRetrieveResponse.nextRecordPosition['__text'] : 0;
            if (searchRetrieveResponse.records && searchRetrieveResponse.records.record) {
                if (searchRetrieveResponse.records.record.length) {
                    for (let index = 0; index < searchRetrieveResponse.records.record.length; index++) {
                        let recordData = searchRetrieveResponse.records.record[index];
                        this.data.push(new CatalogResponseItem(recordData));
                    }
                } else {
                    this.resultCount = 1;
                    this.data.push(new CatalogResponseItem(searchRetrieveResponse.records.record));
                }
            }
        }
    }
}

class CatalogResponseItem {
    constructor(recordData) {
        const record = recordData.recordData.record;
        this.position = recordData.recordPosition['__text'];
        this.leader = record.leader;
        this.controlField = parseFields(record.controlfield, '_tag', '__text');
        this.setDataField(record);
    }

    setDataField(record) {
        this.dataField = {};
        if (record.datafield) {
            for (let i = 0; i < record.datafield.length; i++) {
                let field = record.datafield[i];
                this.dataField[field['_tag']] = parseFields(field.subfield, '_code', '__text');
            }
        }
    }
}

function parseFields(fields, keyField, valueField) {
    const fieldObject = {};
    for (let index = 0; index < fields.length; index++) {
        let field = fields[index];
        fieldObject[field[keyField]] = field[valueField];
    }
    return fieldObject;
}
