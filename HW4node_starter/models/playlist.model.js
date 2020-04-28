//THIS will be used once we connect MongoDB   console.log("UnauthorizedError req:",req.url);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//https://mongoosejs.com/docs/populate.html#populate_an_existing_mongoose_document


//TODO: notice that the goals are missing from this schema.
const schema = new Schema({
  title: { type: String, unique: false, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
  length: {type: Number, unique: false, required: true},
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdDate: { type: Date, default: Date.now }
});

schema.index({createdDate:1, createdBy:1}, { unique: true });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Playlist', schema);
