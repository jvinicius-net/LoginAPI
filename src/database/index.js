const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;