import {findInArray} from '../catalog-utils';

export default class GetTitleStatementFromMarc {
    constructor(rootNode) {
        const controlField = rootNode.getChildren()[2].getChildren();
        const titleStatement = findInArray('key', '245', controlField);
        const title = findInArray('key', 'a', titleStatement.getChildren());
        const remainderOfTitle = findInArray('key', 'b', titleStatement.getChildren());
        this.titleStatement = {
            title: title ? title.getDecodedValue()['Title'] : 'N/A',
            remainderOfTitle: remainderOfTitle ? remainderOfTitle.getDecodedValue()['Remainder of title'] : 'N/A'
        }
    }

    getTitleStatement() {
        return this.titleStatement;
    }
}