const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, 'Lütfen başlık giriniz..'],
        maxlength: [15, 'Lütfen 15 karakterin altında giriniz...'],
        minlength: [1, 'Lütfen en az 1 karakter giriniz...']
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);