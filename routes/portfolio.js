var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Portfolio = require('../models/portfolio');

router.get('/', function (req, res, next) {
    Portfolio.find()
        .sort('Date')
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
router.get('/monthly', function (req, res, next) {
    Portfolio.aggregate([
        {$group:{_id: {month: { $month: "$Date"}, year: { $year: "$Date" } }, totalAmount: { $sum: { $multiply: [ "$Price", "$Unit" ] } }, count: { $sum: 1 }}},
        {$sort:{"_id.year":1,"_id.month":1}}])        
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