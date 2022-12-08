const { connect, connection } = require('mongoose');

//check the connection to see if its correct
const connectionString = 
  process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkAPI';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;