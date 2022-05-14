const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mongodb-crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((err) => {
    if (mongoose.connection.readyState == 1) {
        console.log('MongoDb connected...');
    } else {
        console.log('MongoDb error: ' + mongoose.connection.readyState);
    }
});

require('./models/post.model.js');