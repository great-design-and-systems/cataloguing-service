import {
    GDSDomainDTO,
    GDSDomainPaginateHelper,
} from 'gds-config';

import CategoryService from './categories';
import DynamicService from './dynamic';
import FieldService from './fields';
import SearchService from './search';

const API = process.env.API_NAME || '/api/cataloguing/';

export default class CataloguingResource {
    constructor(app) {
        const fieldService = new FieldService();
        const dynamicService = new DynamicService();
        const categoryService = new CategoryService(dynamicService);
        const searchService = new SearchService();

        app.get('/', (req, res) => {
            const domain = new GDSDomainDTO();
            domain.addPost('createCategory', 'http://' + req.headers.host + API + 'create-category');
            domain.addGet('getCategoryList', 'http://' + req.headers.host + API + 'get-category-list');
            domain.addGet('getCategoryById', 'http://' + req.headers.host + API + 'get-category-by-id/:categoryId');
            domain.addGet('getCategoryItemData', 'http://' + req.headers.host + API + 'get-category-item-data/:categoryId/:itemId');
            domain.addPut('updateCategory', 'http://' + req.headers.host + API + 'update-category/:categoryId');
            domain.addDelete('removeCategory', 'http://' + req.headers.host + API + 'remove-category/:categoryId');
            domain.addGet('getCategoryByName', 'http://' + req.headers.host + API + 'get-category-by-name/:categoryName');
            domain.addPost('createField', 'http://' + req.headers.host + API + 'create-field');
            domain.addGet('getFieldById', 'http://' + req.headers.host + API + 'get-field-by-id/:fieldId');
            domain.addPut('updateField', 'http://' + req.headers.host + API + 'update-field/:fieldId');
            domain.addDelete('removeField', 'http://' + req.headers.host + API + 'remove-field/:fieldId');
            domain.addGet('getFieldsByCategoryId', 'http://' + req.headers.host + API + 'get-fields-by-category-id/:categoryId');
            domain.addPost('createItemCategory', 'http://' + req.headers.host + API + 'create-item-category');
            domain.addPost('getItemCategory', 'http://' + req.headers.host + API + 'get-item-category');
            domain.addPost('updateItemCategory', 'http://' + req.headers.host + API + 'update-item-category');
            domain.addPost('removeItemCategory', 'http://' + req.headers.host + API + 'remove-item-category');
            domain.addGet('searchByIsbn', 'http://' + req.headers.host + API + 'search-by-isbn/:isbn');
            domain.addGet('getSubjectsByIsbn', 'http://' + req.headers.host + API + 'get-subjects-by-isbn/:isbn');
            domain.addGet('searchOnline', 'http://' + req.headers.host + API + 'search-online/:source');
            res.status(200).send(domain);
        });

        app.post(API + 'create-category', (req, res) => {
            categoryService.createCategory(req.body, (err, result) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    const createDomain = new GDSDomainDTO('CREATE-CATEGORY', 'Category has been created');
                    createDomain.addGet('getCategoryById', 'http://' + req.headers.host + API + 'get-category-by-id/' + result._id);
                    createDomain.addPut('updateCategory', 'http://' + req.headers.host + API + 'update-category/' + result._id);
                    createDomain.addDelete('removeCategory', 'http://' + req.headers.host + API + 'remove-category/' + result._id);
                    createDomain.addGet('getCategoryByName', 'http://' + req.headers.host + API + 'get-category-by-name/' + result.name);
                    createDomain.addGet('getFieldsByCategoryId', 'http://' + req.headers.host + API + 'get-fields-by-category-id/' + result._id);
                    res.status(200).send(createDomain);
                }
            });
        });

        app.get(API + 'get-category-list', (req, res) => {
            categoryService.getCategoryList(new GDSDomainPaginateHelper(req),
                (err, result) => {
                    if (err) {
                        res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                            err.message
                        ))
                    } else {
                        res.status(200).send(new GDSDomainDTO('GET-CATEGORY-LIST', result));
                    }
                });
        });

        app.get(API + 'get-category-by-id/:categoryId', (req, res) => {
            categoryService.getCategoryById(req.params.categoryId, (err, result) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    const domain = new GDSDomainDTO('GET-CATEGORY-BY-ID', result);
                    domain.addPut('updateCategory', 'http://' + req.headers.host + API + 'update-category/' + result._id);
                    domain.addDelete('removeCategory', 'http://' + req.headers.host + API + 'remove-category/' + result._id);
                    res.status(200).send(domain);
                }
            });
        });

        app.get(API + 'get-category-item-data/:categoryId/:itemId', (req, res) => {
            categoryService.getCategoryItemData(req.params.categoryId, req.params.itemId, (err, result) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    const domain = new GDSDomainDTO('GET-CATEGORY-ITEM-DATA', result);
                    res.status(200).send(domain);
                }
            });
        });

        app.put(API + 'update-category/:categoryId', (req, res) => {
            categoryService.updateCategory(req.params.categoryId, req.body, (err, result) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    const domain = new GDSDomainDTO('UPDATE-CATEGORY', 'Category has been updated');
                    domain.addGet('getCategoryById', 'http://' + req.headers.host + API + 'get-category-by-id/' + result._id);
                    domain.addDelete('removeCategory', 'http://' + req.headers.host + API + 'remove-category/' + result._id);
                    res.status(200).send(domain);
                }
            });
        });

        app.delete(API + 'remove-category/:categoryId', (req, res) => {
            categoryService.removeCategoryById(req.params.categoryId, (err) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    res.status(200).send(new GDSDomainDTO('REMOVE-CATEGORY', 'Category has been removed'));
                }
            });
        });

        app.get(API + 'get-category-by-name/:categoryName', (req, res) => {
            categoryService.getCategoryByName(req.params.categoryName, (err, result) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    const domain = new GDSDomainDTO('GET-CATEGORY-BY-NAME', result);
                    domain.addPut('updateCategory', 'http://' + req.headers.host + API + 'update-category/' + result._id);
                    domain.addDelete('removeCategory', 'http://' + req.headers.host + API + 'remove-category/' + result._id);
                    res.status(200).send(domain);
                }
            });
        });

        app.post(API + 'create-field', (req, res) => {
            fieldService.createField(req.body, (err, result) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    const domain = new GDSDomainDTO('CREATE-FIELD', 'FIELD has been created');
                    domain.addGet('getFieldById', 'http://' + req.headers.host + API + 'get-field-by-id/' + result._id);
                    domain.addPut('updateField', 'http://' + req.headers.host + API + 'update-field/' + result._id);
                    domain.addDelete('removeField', 'http://' + req.headers.host + API + 'remove-field/' + result._id);
                    res.status(200).send(domain);
                }
            });
        });

        app.get(API + 'get-field-by-id/:fieldId', (req, res) => {
            fieldService.getFieldById(req.params.fieldId, (err, result) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    const domain = new GDSDomainDTO('GET-FIELD-BY-ID', result);
                    domain.addPut('updateField', 'http://' + req.headers.host + API + 'update-field/' + result._id);
                    domain.addDelete('removeField', 'http://' + req.headers.host + API + 'remove-field/' + result._id);
                    res.status(200).send(domain);
                }
            });
        });

        app.put(API + 'update-field/:fieldId', (req, res) => {
            fieldService.updateField(req.params.fieldId, req.body, (err, result) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    const domain = new GDSDomainDTO('UPDATE-FIELD', 'Field has been updated');
                    domain.addGet('getFieldById', 'http://' + req.headers.host + API + 'get-field-by-id/' + result._id);
                    domain.addDelete('removeField', 'http://' + req.headers.host + API + 'remove-field/' + result._id);
                    res.status(200).send(domain);
                }
            });
        });

        app.delete(API + 'remove-field/:fieldId', (req, res) => {
            fieldService.removeFieldById(req.params.fieldId, (err) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    res.status(200).send(new GDSDomainDTO('REMOVE-FIELD', 'Field has been removed'));
                }
            });
        });

        app.get(API + 'get-fields-by-category-id/:categoryId', (req, res) => {
            fieldService.getFieldsByCategoryId(req.params.categoryId, (err, result) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    const domain = new GDSDomainDTO('GET-FIELD-BY-CATEGORY-ID', result);
                    domain.addGet('getCategoryById', 'http://' + req.headers.host + API + 'get-category-by-id/' + result._id);
                    domain.addPut('updateCategory', 'http://' + req.headers.host + API + 'update-category/' + result._id);
                    domain.addDelete('removeCategory', 'http://' + req.headers.host + API + 'remove-category/' + result._id);
                    res.status(200).send(domain);
                }
            });
        });

        app.post(API + 'create-item-category', (req, res) => {
            dynamicService.createItemCategory(req.body, (err, result) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    const createDomain = new GDSDomainDTO('CREATE-ITEM-CATEGORY', 'Item category has been created');
                    res.status(200).send(createDomain);
                }
            });
        });

        app.post(API + 'get-item-category', (req, res) => {
            dynamicService.getItemCategory(req.body, new GDSDomainPaginateHelper(req), (err, result) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    const domain = new GDSDomainDTO('GET-ITEM-CATEGORY', result);
                    res.status(200).send(domain);
                }
            });
        });

        app.post(API + 'update-item-category', (req, res) => {
            dynamicService.updateItemCategory(req.body, (err, result) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    const domain = new GDSDomainDTO('UPDATE-ITEM-CATEGORY', 'Item category has been updated');
                    res.status(200).send(domain);
                }
            });
        });

        app.post(API + 'remove-item-category', (req, res) => {
            dynamicService.removeItemCategory(req.body, (err) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    const domain = new GDSDomainDTO('DELETE-ITEM-CATEGORY', 'Item category has been deleted');
                    res.status(200).send(domain);
                }
            });
        });


        app.get(API + 'search-online/:source', (req, res) => {
            searchService.searchOnline(req.query, req.query.format, req.params.source, (err, result) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    const domain = new GDSDomainDTO('SEARCH-ONLINE', result);
                    res.status(200).send(domain);
                }
            });
        });

        app.get(API + 'search-by-isbn/:isbn', (req, res) => {
            searchService.searchByIsbn(req.params.isbn, (err, result) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    const domain = new GDSDomainDTO('SEARCH-BY-ISBN', result);
                    res.status(200).send(domain);
                }
            });
        });

        app.get(API + 'get-subjects-by-isbn/:isbn', (req, res) => {
            searchService.getSubjectsByIsbn(req.params.isbn, (err, result) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
                        err.message
                    ))
                } else {
                    const domain = new GDSDomainDTO('SEARCH-BY-ISBN', result);
                    res.status(200).send(domain);
                }
            });
        });
    }
}