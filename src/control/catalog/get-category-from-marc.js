import {findInArray} from '../catalog-utils';
export default class GetCategoryFromMarc {
    constructor(rootNode) {
        const leader = rootNode.getChildren()[0];
        const decodedValue = leader.getDecodedValue();
        this.category = decodedValue['Type of Record'];
    }

    getCategory() {
        return this.category;
    }
}