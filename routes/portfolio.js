var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Portfolio = require('../models/portfolio');
var Fundname = require('../models/fundname');

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
    name = '';
    if(req.params.name){
        name = req.params.name;    
        $query  = Portfolio.aggregate([
            { $match: { Name: name } },
            {$group:{_id: {month: { $month: "$Date"}, year: { $year: "$Date" } }, totalAmount: { $sum: { $multiply: [ "$Price", "$Unit" ] } }, count: { $sum: 1 }}},
            {$sort:{"_id.year":1,"_id.month":1}}])
    } else {
        $query  = Portfolio.aggregate([
            {$group:{_id: {month: { $month: "$Date"}, year: { $year: "$Date" } }, totalAmount: { $sum: { $multiply: [ "$Price", "$Unit" ] } }, count: { $sum: 1 }}},
            {$sort:{"_id.year":1,"_id.month":1}}])
    }
    
    $query.exec(function (err, portfolioNames) {
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
router.get('/activeFunds', function (req, res, next) {
    Fundname.find({active:true})
        .exec(function (err, fundname) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: fundname
            });
        });
});
router.get('/lastEntry', function (req, res, next) {
    Portfolio.find({Name:req.query.name}).sort({Date: -1}).limit(1)
        .exec(function (err, fundentry) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: fundentry
            });
        });
});

module.exports = router;