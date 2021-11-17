const { Schema, model } = require('mongoose')

const kittenSchema = new Schema({
    name: String
});

const Kitten = model('Kitten', kittenSchema);

module.exports = Kitten;