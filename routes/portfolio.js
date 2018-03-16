var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Portfolio = require('../models/portfolio');

router.get('/', function (req, res, next) {
    Portfolio.find()
        .exec(function (err, portfolio) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: portfolio
            });
        });
});
router.get('/names', function (req, res, next) {
    Portfolio.distinct('Name')
        .populate('Name')
        .exec(function (err, portfolioNames) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: portfolioNames
            });
        });
});

module.exports = router;