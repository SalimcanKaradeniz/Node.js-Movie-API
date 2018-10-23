const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://salimcan:salim12345@ds137643.mlab.com:37643/movie-api', {useMongoClient:true});


    mongoose.connection.on('open', () => {
        console.log("MongoDB'ye bağlanıldı.");
    });
    mongoose.connection.on('error', (err) => {
        console.log("MongoDB'ye bağlanırken Hata oluştu.", err);
    })
};