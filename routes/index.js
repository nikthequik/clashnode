
/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index');
};

exports.clashRoom = function(req, res) {
	res.render('clashRoom');
};