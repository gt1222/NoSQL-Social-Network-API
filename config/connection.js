const { connect, connection } = require('mongoose');

//check the connection to see if its correct
connect('mongodb://localhost/socialNetworkAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;