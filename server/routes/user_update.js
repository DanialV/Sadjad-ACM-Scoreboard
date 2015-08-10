/**
 * Created by Danial Vafadar on 8/6/15.
 */
var db = require("mongo_schemas");
var request = require("request");
module.exports.get = function(req,res){
    if(typeof req.session.username == 'undefined'){
        res.redirect(300,'/scoreboard');
    }
    else{
        if(req.xhr){
            db.users.find({},{}).lean().exec(function(err,user){
                if(err){
                    console.error(err);
                    console.mongo("Error "+err);
                    res.STATUS_CODES = 500;
                    res.render('user_update',{ data : {status_code : '500',status_massage : 'Internal Server error'}});
                }
                else {
                    var url = "http://codeforces.com/api/user.info?handles=";
                    for (var i = 0; i < user.length; i++) {
                        url += user[i].codeforces_username + ";";
                    }
                    request(url, function (err, response, body) {
                        if (response && !err && response.statusCode == 200) {
                            body = JSON.parse(body);
                            Number.async_for(body.result.length, function (loop) {
                                var i = loop.iteration();
                                user[i].rank = (body.result[i].rank) ? body.result[i].rank : "0";
                                user[i].rating = (body.result[i].rating) ? body.result[i].rating : 0;
                                user[i].maxRank = (body.result[i].maxRank) ? body.result[i].maxRank : "0";
                                user[i].maxRating = (body.result[i].maxRating) ? body.result[i].maxRating : 0;
                                db.users.find({_id: user[i]._id , _verify : true}, {}).remove(function (err2) {
                                    if(err2){
                                        console.error(err2);
                                        console.mongo("Error " + err2);
                                        res.STATUS_CODES = 500;
                                        res.render('user_update',{ data : {status_code : '500',status_massage : 'Internal Server error' , type : 'Error'}});

                                    }
                                    else {
                                        var temp = new db.users(user[i]);
                                        temp.save(function (err3, doc) {
                                            if (err3) {
                                                console.error(err3);
                                                console.mongo("Error " + err3);
                                                res.STATUS_CODES = 500;
                                                res.render('user_update',{ data : {status_code : '500',status_massage : 'Internal Server error' , type : 'Error'}});

                                            }
                                            else {
                                                loop.next();
                                            }
                                        });
                                    }
                                });
                            }, function () {
                                console.mongo("All User successfully updated");
                                res.render('user_update',{ data : {message : 'All User successfully updated' , type : 'OK'}});
                            });
                        }
                        else {
                            console.error(response.statusCode);
                        }
                    });
                }
            });
        }
        else{
            res.render('error',{ data : {status_code : '550',status_massage : 'Permission denied'}});
        }
    }
};