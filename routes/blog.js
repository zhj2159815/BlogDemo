var models = require('../model');
var moment = require('moment');
var $ = require('underscore');

exports.list = (req, res, next) => {
    models.Blog.list((error, data) => {
        if (error)
            return res.json({
                status: 500,
                message: 'list Blog error!',
                statusText: 'error'
            });

        var result = $.reduce(data, (memo, r) => {
            r.createdOn = moment(r.createdOn).format('YYYY-MM-DD');
            console.log(r);
            memo.push({
                _id: r._id,
                title: r.title,
                text: r.text,
                author: r.author,
                createdOn: moment(r.createdOn).format('YYYY-MM-DD')
            });
            return memo;
        }, []);

        res.json({
            status: 200,
            data: result,
            message: 'login success !',
            statusText: 'ok'
        });
    });
};

exports.search = (req, res, next) => {
    models.Blog.find(req.body.query, (err, data) => {
        if (error)
            return res.json({
                status: 500,
                message: 'find Blog error!',
                statusText: 'error'
            });

        res.json({
            status: 200,
            data: data,
            message: 'login success !',
            statusText: 'ok'
        });
    });
};

exports.add = (req, res, next) => {
    models.Blog.create({
        title: req.body.params.title,
        text: req.body.params.text,
        author: req.body.params.author
    }, (error, data) => {
        if (error)
            return res.json({
                status: 500,
                message: 'add Blog error!',
                statusText: 'error'
            });

        res.json({
            status: 200,
            data: data,
            message: 'add Blog success !',
            statusText: 'ok'
        });
    });
};

exports.save = (req, res, next) => {
    models.Blog.findById(req.body.params._id, (error, blog) => {
        if (error || !blog)
            return res.json({
                status: 500,
                message: 'save Blog error!',
                statusText: 'error'
            });

        blog.title = req.body.params.title;
        blog.text = req.body.params.text;
        blog.createdOn = moment().unix(),
            blog.author = req.body.params.author;

        blog.save((error, data) => {
            if (error)
                return res.json({
                    status: 500,
                    message: 'save Blog error!',
                    statusText: 'error'
                });

            res.json({
                status: 200,
                data: data,
                message: 'save Blog success !',
                statusText: 'ok'
            });
        });
    });
};

exports.remove = (req, res, next) => {
    models.Blog.findById(req.body.params.id, (error, blog) => {
        if (error)
            return res.json({
                status: 500,
                message: 'remove Blog error!',
                statusText: 'error'
            });

        blog.remove((error, data) => {
            if (error)
                return res.json({
                    status: 500,
                    message: 'remove Blog error!',
                    statusText: 'error'
                });

            res.json({
                status: 200,
                data: data,
                message: 'remove Blog success !',
                statusText: 'ok'
            });
        });
    });
};