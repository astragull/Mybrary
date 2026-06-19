const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre('deleteOne', { document: true }, async function() {
    const books = await Book.find({ author: this.id })

    if (books.length > 0) {
        throw new Error('This author has books still')
    }
})

module.exports = mongoose.model('Author', authorSchema)