const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.post('/', async (req, res) => {
    try {
        const { title, rating } = req.body;
        const movie = new Movie({ title, rating });
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Error adding movie' });
    }
});


router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching movies' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { title, rating } = req.body;
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            { title, rating },
            { new: true }
        );
        res.json(updatedMovie);
    } catch (error) {
        res.status(500).json({ error: 'Error updating movie' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: 'Movie deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting movie' });
    }
});

module.exports = router;
