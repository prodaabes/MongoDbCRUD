const Post = require('../models/post.model.js');

const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {

    const name = req.body.name;
    const profilePic = req.body.profilePic;
    const image = req.body.image;

    if (name == undefined || profilePic == undefined || image == undefined) {
        res.end('missing_data');
        return;
    }

    const post = new Post({
        name: name,
        profilePic: profilePic,
        image: image,
        time: new Date()
    });

    post.save(function(err, data) {
        if (err) {
            console.log(err);
            res.end('error');
        } else {
            res.send(data);
        }
    });
});

router.get('/', (req, res) => {

    const id = req.query.id;

    if (id == undefined) {
        Post.find().sort({ time: -1 }).then(function(data, err) {
            if (err) {
                console.log(err);
                res.end('error');
            } else {
                res.send(data);
            }
        });
    } else {
        Post.findById(id, function(err, data) {
            if (err) {
                console.log(err);
                res.end('error');
            } else {
                res.send(data);
            }
        });
    }
});

router.get('/getBeforeTime', (req, res) => {

    const time = req.query.time;

    if (time == undefined) {
        res.end('missing_data');
        return;
    }

    Post.find({ time: { $lt: time } }).limit(10).sort({ time: -1 }).then(function(data, err) {
        if (err) {
            console.log(err);
            res.end('error');
        } else {
            res.send(data);
        }
    });
});

router.post('/update', (req, res) => {

    const id = req.body.id;

    if (id == undefined) {
        res.end('missing_data');
        return;
    }

    delete req.body.id;

    Post.findByIdAndUpdate(id, req.body, function(err, data) {
        if (err) {
            console.log(err);
            res.end('error');
        } else {
            res.send(data);
        }
    });
});

router.post('/delete', (req, res) => {

    const id = req.body.id;

    if (id == undefined) {
        res.end('missing_data');
        return;
    }

    Post.findByIdAndRemove(id, function(err, data) {
        if (err) {
            console.log(err);
            res.end('error');
        } else {
            res.send(data);
        }
    });
});

module.exports = router;