# cataloguing-service
Cataloguing Service Module


### createCategory
##### request json format
```json
{  
    "name" : "Category Name",  
    "fields" : [  
        { "name" : "fieldName1", "fieldType" : "Number", "isFilter" : true },
        { "name" : "fieldName2", "fieldType" : "Text", "isFilter" : false }, 
        { "name" : "fieldName3", "fieldType" : "Date", "isFilter" : true }
    ] 
} 
```
### updateCategory
##### request json format
```json
{  
    "category" : { 
        "name" : "Category Name",
        "iconGlyph" : "value",
        "iconField" : "value",
        "rules" : ["needsCredentials","GridLayout","listLayout","tableLayout","needsID","needsApproval"],
        "approver" : "value"
    },  
    "fields" : [  
        { "_id" : "fieldId1", "name" : "fieldName1", "fieldType" : "Number", "isFilter" : true, "isRequired" : false },
        { "_id" : "fieldId2", "name" : "fieldName2", "fieldType" : "Text", "isFilter" : false, "isRequired" : true }, 
        { "_id" : "fieldId3", "name" : "fieldName3", "fieldType" : "Date", "isFilter" : true, "isRequired" : false }
    ] 
} 
```
### getCategoryById
##### response json format
```json
{ 
    "category": { 
      "_id": "583470664afee0063eb60c6f", 
      "name": "Category Name 2", 
      "__v": 0, 
      "createdOn": "2016-11-22T16:20:54.808Z" 
    },  
    "fields": [ 
      { 
        "_id": "583470674afee0063eb60c70", 
        "name": "fieldName1", 
        "fieldType": "Number", 
        "categoryId": "583470664afee0063eb60c6f", 
        "__v": 0, 
        "createdOn": "2016-11-22T16:20:55.041Z", 
        "isFilter": true 
      },
      {
        "_id": "583470674afee0063eb60c71", 
        "name": "fieldName2", 
        "fieldType": "Text", 
        "categoryId": "583470664afee0063eb60c6f", 
        "__v": 0, 
        "createdOn": "2016-11-22T16:20:55.042Z", 
        "isFilter": false 
      }, 
      { 
        "_id": "583470674afee0063eb60c72", 
        "name": "fieldName3", 
        "fieldType": "Date", 
        "categoryId": "583470664afee0063eb60c6f", 
        "__v": 0, 
        "createdOn": "2016-11-22T16:20:55.043Z", 
        "isFilter": true 
      } 
    ] 
  } 
```
### createItemCategory
##### request json format
```json
{  
    "category" : "dvd",  
    "content" : {  
        "itemId" : 123456,  
        "serial" : "akjdfalsfj",  
        "title" : "Video title",  
        "director" : "Director Name"  
    }  
}  
```
### getItemCategory
##### request json format
```json
{  
    "category" : "dvd",  
    "query" : {  
        "itemId" : 123456
    }  
}  
```
### updateItemCategory
##### request json format
```json
{  
    "category" : "dvd",  
    "content" : {  
        "query" : { "itemId" : 123456 },
        "update" : { "director" : "Analyn Flores" }
    }  
}  
```
### removeItemCategory
##### request json format
```json
{  
    "category" : "dvd",
    "query" : {
        "itemId":123456
    }
}  
```