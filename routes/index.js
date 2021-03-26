// exports.article = require('./article')
exports.user = require('./user')

/*
 * GET home page.
 */

exports.index = (req, res, next) => {
    res.render('index', { title: 'My Blog OOOOOO!', content: 'Welcome to my blog!!!!', articles: [{ title: 'Test title' }] });
};
