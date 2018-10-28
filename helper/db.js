const mongoose = require('mongoose');

module.exports = () => {
    // mongoose.connect('mongodb://salimcan:salim12345@ds137643.mlab.com:37643/movie-api', {useMongoClient:true});
    mongoose.connect('mongodb://salim:salim11@ds137643.mlab.com:37643/movie-api', {useMongoClient:true});


    mongoose.connection.on('open', () => {
        console.log("MongoDB'ye bağlanıldı.");
    });
    mongoose.connection.on('error', (err) => {
        console.log("MongoDB'ye bağlanırken Hata oluştu.", err);
    })
};


// RethinkDB update.
// r.table("rt_test").filter(
//     r.row["name"] = "Python&Dajgno"
// ).update({
//     "name": "Python"
// };


//RethinkDB insert Python
// def process_item(self, item, spider):
// r.table(self.table_name).insert(dict(item)).run(self.conn)
// return item