var ODataServer = require('simple-odata-server')
var Adapter = require('simple-odata-server-nedb')
var http = require('http')
var Datastore = require('nedb')
const getEmptyDb = () => new Datastore({ inMemoryOnly: true })

const PORT = 8088
var mockDB = require('./db.json');

var model = {
  namespace: 'DDUI',
  entityTypes: {
    'SoftwareTitles': {
      '_id': {'type': 'Edm.String', key: true},
      'Id': {'type': 'Edm.String' },
      'Title': {'type': 'Edm.String'},
      'SoftwareVendorId': {'type': 'Edm.String'},
      'SoftwareVendorName': {'type': 'Edm.String'},
      'SoftwareProductId': {'type': 'Edm.String'},
      'SoftwareProductName': {'type': 'Edm.String'},
      'Edition': {'type': 'Edm.String'},
      'Version': {'type': 'Edm.String'},
      'Licensable': {'type': 'Edm.String'},
      'ReleaseDate': {'type': 'Edm.String'},
      'EndOfLifeDate': {'type': 'Edm.String'},
      // 'addresses': { 'type': 'Collection(jsreport.AddressType)' }
    },
    'RecognitionPrograms': {
      '_id': {'type': 'Edm.String', key: true},
      'Id': {'type': 'Edm.String' },
      'Title': {'type': 'Edm.String'},
      'Version': {'type': 'Edm.String'},
      'SoftwareReleaseId': {'type': 'Edm.String'},
      'CreatedDate': {'type': 'Edm.String'},
    }
  },
  // complexTypes: {
  //   'AddressType': {
  //     'street': {'type': 'Edm.String'}
  //   }
  // },
  entitySets: {
    'softwaretitles': {
      entityType: 'DDUI.SoftwareTitles'
    },
    'recognitionprograms': {
      entityType: 'DDUI.RecognitionPrograms'
    }
  }
}

const dbCollections = {
  softwaretitles: getEmptyDb(),
  recognitionprograms: getEmptyDb(),
}

mockDB.SoftwareTitles.slice(0, 500).forEach(e => {
  e._id = e.Id;
  dbCollections.softwaretitles.insert(e);
})

mockDB.RecognitionPrograms.slice(0, 500).forEach(e => {
  e._id = e.Id;
  dbCollections.recognitionprograms.insert(e);
})

var odataServer = ODataServer(`http://localhost:${PORT}`)
  .model(model)
  .adapter(Adapter(function (collectionName, cb) {
    cb(null, dbCollections[collectionName])
  }))
  .cors('*')

http.createServer(odataServer.handle.bind(odataServer)).listen(PORT)



console.log(`mock odata server running on http://localhost:${PORT}`)
