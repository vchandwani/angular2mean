var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Portfolio = require('../models/portfolio');
var Fundname = require('../models/fundname');

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

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
router.get('/mutualFundNames', function (req, res, next) {
    Portfolio.distinct('Name', { "type": "MF" })
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
    if (req.params.name) {
        $query = Portfolio.aggregate([
            { $match: { Name: name } },
            { $group: { _id: { month: { $month: "$Date" }, year: { $year: "$Date" } } } },
            { $sort: { "_id.year": 1, "_id.month": 1 } }])
    } else {
        $query = Portfolio.aggregate([
            { $group: { _id: { month: { $month: "$Date" }, year: { $year: "$Date" } } } },
            { $sort: { "_id.year": 1, "_id.month": 1 } }])
    }

    $query.exec(function (err, portfolioNames) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        i = 0;
        monthArray = [];
        portfolioNames.forEach((item, index) => {
            if (item._id.month < 10) {
                item._id.month = ("0" + item._id.month).slice(-2);
            }

            setTimeout(() => {
                monthArray[item._id.month + item._id.year] = {};
                monthArray[item._id.month + item._id.year].total = 0;
                monthArray[item._id.month + item._id.year].year = item._id.year;
                monthArray[item._id.month + item._id.year].month = item._id.month;
                $queryMonthly = Portfolio.aggregate([
                    { $match: { Date: { $gte: new Date(item._id.year + '-' + item._id.month + '-01T00:00:00.000Z'), $lte: new Date(item._id.year + '-' + item._id.month + '-31T00:00:00.000Z') } } },
                    { $sort: { Date: 1, Name: 1, Unit: 1, Price: 1, uid: 1 } },
                    { $group: { _id: "$Name", unit: { $last: "$Unit" }, price: { $last: "$Price" }, lastDate: { $last: "$Date" }, uid: { $last: "$uid" } } }
                ]).exec(function (err, monthlyDetails) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    j = 0;


                    monthlyDetails.forEach((data, index) => {
                        monthArray[item._id.month + item._id.year].total += data.unit * data.price;
                        j++;
                    });
                    if (j == monthlyDetails.length) {
                        i++;
                    }
                    if (portfolioNames.length == i) {
                        res.status(200).json({
                            message: 'Success',
                            obj: monthArray
                        });
                    }

                });
            }, 500);
        });
    });
});
router.get('/activeFunds', function (req, res, next) {
    Fundname.find({ active: true })
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
router.get('/fundLastEntry', function (req, res, next) {
    Portfolio.find({ Name: req.query.name }).sort({ Date: -1 }).limit(1)
        .exec(function (err, fundentry) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            Fundname.findOne({ active: true, uid: fundentry[0].uid })
                .exec(function (err, detail) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    if (detail && detail.latestPrice) {
                        res.status(200).json({
                            message: 'Success',
                            obj: fundentry,
                            latestPrice: detail.latestPrice,
                            datePrice: detail.datePrice,
                            active: detail.active,
                        });
                    } else {
                        res.status(200).json({
                            message: 'Success',
                            obj: fundentry
                        });
                    }
                });
        });
});
router.get('/lastEntry', function (req, res, next) {
    Portfolio.aggregate([
        { $sort: { Date: 1, Name: 1, Unit: 1, Price: 1, uid: 1 } },
        { $group: { _id: "$Name", unit: { $last: "$Unit" }, price: { $last: "$Price" }, lastDate: { $last: "$Date" }, uid: { $last: "$uid" } } }
    ]).exec(function (err, lastentry) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        let count = lastentry.length;
        let i = 0;
        lastentry.forEach((item, index) => {
            Fundname.findOne({ active: true, uid: item.uid })
                .exec(function (err, detail) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    if (detail && detail.latestPrice) {
                        item.latestPrice = detail.latestPrice;
                    } else {
                        item.latestPrice = 0;
                    }
                    i++;
                    if (count == i) {
                        res.status(200).json({
                            message: 'Success',
                            obj: lastentry
                        });
                    }
                });
        });

    });
});
router.post('/updatePrice', function (req, res, next) {
    let uid = req.body.uid;
    let price = req.body.price;
    var query = { uid: uid };
    Fundname.updateMany(query, { latestPrice: price, datePrice: new Date() },
        function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!result) {
                return res.status(500).json({
                    title: 'No Fund Found!',
                    error: { message: 'Fund not found' }
                });
            }
            res.status(200).json({
                title: 'Updated fund',
                obj: result,
                success: true
            });
        }
    );
});

module.exports = router;