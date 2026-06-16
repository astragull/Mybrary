const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All Authors Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name != '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors, 
            searchOptions: req.query 
        })
    } catch {
        res.redirect('/')
    }
})

// New Authors Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

// Create Author route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        // Use await to pause until the save finishes.
        // Mongoose returns a Promise, which 'await' unwraps
        const newAuthor = await author.save()
        // If we get here, then success!
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect('authors')
    } catch (err) {
        // The save failed, so re-render the same page.
        // Passing in author keeps the user from having to
        // refill the same data
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})

module.exports = router;