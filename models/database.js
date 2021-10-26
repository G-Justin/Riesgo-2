const mongoose = require('mongoose');
const url = "mongodb+srv://admin:admin@cluster0.l5ypp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

exports.connectToDb = () => {
    
    mongoose.connect(url, options, function(error) {
        if(error) throw error;
        console.log('Connected to: ' + url);
    });
}