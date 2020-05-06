//THIS will be used once we connect MongoDB   console.log("UnauthorizedError req:",req.url);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//https://mongoosejs.com/docs/populate.html#populate_an_existing_mongoose_document


//TODO: notice that the goals are missing from this schema.
const schema = new Schema({
  spotifyId: { type: String, unique: true, required: true},
  title: { type: String, unique: false, required: true },
  artist: { type: String, unique: false, required: true },
  album: { type: String, unique: false, required: true },

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Song', schema);
