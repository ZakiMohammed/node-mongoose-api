const express = require('express')
const mongoose = require('mongoose')
const Kitten = require('../models/kittens')

const router = express.Router();

const url = process.env.MONGODB_URL;

router.get('/', async (req, res) => {
    try {
        await mongoose.connect(url);

        const kittens = await Kitten.find();

        res.json(kittens);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get('/:id', async (req, res) => {
    try {
        const _id = req.params.id;

        await mongoose.connect(url);

        const kitten = await Kitten.findById(_id);

        if (kitten) {
            res.json(kitten);
        } else {
            res.status(404).json();
        }
    } catch (error) {
        res.status(500).json(error);
    }
});
router.post('/', async (req, res) => {
    try {
        await mongoose.connect(url);

        const kitten = new Kitten(req.body);
        const result = await kitten.save();

        if (result) {
            res.json(kitten);
        } else {
            res.status(500).json({
                message: 'Record not inserted, received false'
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});
router.put('/:id', async (req, res) => {
    try {

        const _id = req.params.id;

        await mongoose.connect(url);

        const result = await Kitten.findByIdAndUpdate(_id, req.body);

        if (result) {
            res.json(req.body);
        } else {
            res.status(500).json({
                message: 'Record not inserted, received false'
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});
router.delete('/:id', async (req, res) => {
    try {

        const _id = req.params.id;

        await mongoose.connect(url);

        const result = await Kitten.findByIdAndRemove(_id);

        if (result) {
            res.json(result);
        } else {
            res.status(500).json({
                message: 'Record not inserted, received false'
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;