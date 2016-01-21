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

fs.readFile('./listings.json', 'utf8', function(err, data){
 if(err) throw err;
 var obj = JSON.parse(data);
 Listing //.Schema.paths.tree
 var code;
 var name;
 console.log(obj.entries.length);
 for(var i=0;i<obj.entries.length;i++){
	code = obj.entries[i].code;
	name = obj.entries[i].name;	
	var listings = new Listing({ code:code, name: name});
	listings.save(function(err){
});

	}



 });

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */
 