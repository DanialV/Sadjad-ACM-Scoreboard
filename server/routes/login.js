/**
 * Created by Danial Vafadar on 7/19/15.
 */
var request = require('request');
module.exports.post = function(req,res){
    var data = req.body;

    request('http://codeforces.com/api/user.info?handles='+data.username, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(true);
        }
        else{
            res.send(false);
        }
    });
};