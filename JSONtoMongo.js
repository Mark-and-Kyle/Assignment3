'use strict';
/* 
Import modules/files you may need to correctly run the script. 
Make sure to save your DB's uri in the config file, then import it with a require statement!
*/
var fs = require('fs'),
mongoose = require('mongoose'), 
Schema = mongoose.Schema, 
Listing = require('./ListingSchema'),
config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);
console.log(config.db.uri);
mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');
});
/* 
Instantiate a mongoose model for each listing object in the JSON file, 
and then save it to your Mongo database 
*/ 

var has = function(obj, key) {
  return key.split(".").every(function(x) {
    if(typeof obj != "object" || obj === null || ! x in obj)
      return false;
    obj = obj[x];
    return true;
  });
}



fs.readFile('./listings.json', 'utf8', function(err, data){
  if(err) throw err;
  var obj = JSON.parse(data);
  var code, name, coordinates, address;

  for(var i=0;i<obj.entries.length;i++){
    code = obj.entries[i].code;
    name = obj.entries[i].name; 


    if(has(obj.entries[i], 'coordinates.latitude') && has(obj.entries[i], 'coordinates.longitude')){
      coordinates = {
        latitude: obj.entries[i].coordinates.latitude,
        longitude: obj.entries[i].coordinates.longitude
      }
    }

    if(has(obj.entries[i], 'address')){
		
      if(obj.entries[i].address !== undefined)
        address = obj.entries[i].address;
    }
    var listings = new Listing({ code:code, name: name, coordinates: coordinates, address: address});

    listings.save(function(err){
      if(err) {
        handleError(err);
      }
    });
	address = undefined;
	coordinates = undefined;
  }

	
  
});

/* 
Once you've written + run the script, check out your MongoLab database to ensure that 
it saved everything correctly. 
*/


