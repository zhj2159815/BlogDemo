var models = require('../model');

exports.login = (req, res, next) => {
    // mongoose.connect('mongodb://localhost/test');
    // var User = mongoose.model('User', { name: String, psw: String });    
    models.User.findOne({
        user: req.body.params.name,
        psw: req.body.params.psw
    }, (error, user) => {
        if (error || !user)
            return res.json({ message: 'name or psw error!', statusText: 'error' });
        res.session = user;        
        res.json({ message: 'login success !', statusText: 'ok' });
    });
};

/*
 * GET logout route.
 */

exports.register = (req, res, next) => {
    if (!(req.body.params.name && req.body.params.psw && req.body.params.surePsw)) {
        return res.json({ status: 500, message: 'Plase input name or psw!' });
    }
    if (req.body.params.psw != req.body.params.surePsw) {
        return res.json({ status: 500, message: 'Please make sure your passwords are consistent!' });
    }

    models.User.findOne({
        user: req.body.params.name
    }, (error, user) => {
        if (error)
            return res.json({ message: 'Find account error!', status: 500, statusText: 'error' });
        if (user)
            return res.json({ message: 'The account name has been registered!', status: 500, statusText: 'error' });

        models.User.create({
            name: req.body.params.name,
            psw: req.body.params.psw
        }, (error, data) => {
            if (error)
                return res.json({ message: 'add account error!', status: 500, statusText: 'error' });

            res.json({ message: 'register success', status: 200, statusText: 'ok' });
        });
    });
}

