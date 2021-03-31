var models = require('../model');
var crypto = require('../util/cryptolib.js');
var CFG = require('../config');


exports.login = (req, res, next) => {
    models.User.count({
        name: req.body.params.name,
        psw: crypto.genSign(req.body.params.psw, CFG.key, CFG.iv)
    }, (error, count) => {
        if (error || !count)
            return res.status().json({ status: 500, message: 'name or psw error!', statusText: 'error' });

        res.json({ status: 200, message: 'login success !', statusText: 'ok' });
    });
};

exports.register = (req, res, next) => {
    if (!(req.body.params.name && req.body.params.psw && req.body.params.surePsw))
        return res.json({ status: 500, message: 'Plase input name or psw!' });

    if (req.body.params.psw != req.body.params.surePsw)
        return res.json({ status: 500, message: 'Please make sure your passwords are consistent!' });

    models.User.count({
        name: req.body.params.name
    }, (error, count) => {
        if (error)
            return res.json({ status: 500, message: 'Find account error!', status: 500, statusText: 'error' });

        if (count > 0)
            return res.json({ status: 500, message: 'The account name has been registered!' });

        models.User.create({
            name: req.body.params.name,
            psw: crypto.genSign(req.body.params.psw, CFG.key, CFG.iv)
        }, (error, user) => {
            if (error) {
                return res.json({ status: 500, message: 'add account error!', status: 500, statusText: 'error' });
            }
            res.json({ status: 200, message: 'register success', data: user, statusText: 'ok' });
        });
    });
};


