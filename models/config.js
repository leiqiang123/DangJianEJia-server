
var mongoose = require('mongoose');


//连接mongo数据库

mongoose.connect('mongodb://localhost/dangjianEjia',{useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected!')
});

module.exports = db