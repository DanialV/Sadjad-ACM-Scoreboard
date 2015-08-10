/**
 * Created by Danial Vafadar on 8/10/15.
 */
var db = require("mongo_schemas");
module.exports.get = function(req,res){
    if(typeof req.session.username == 'undefined'){
        res.redirect(301, '/scoreboard');
    }
    else{
        if(req.xhr){
            db.users.find({_verify : false},{codeforces_username : true , _id : false}).lean().exec(function(err,user){
                if(err){
                    console.error(err);
                    console.mongo("Error "+err);
                    res.STATUS_CODES = 500;
                    res.sendStatus(500);
                }
                else{
                    console.log(user);
                    res.render('new_user',{data : user});
                }
            });
        }
        else{
            res.render('error',{ data : {status_code : '550',status_massage : 'Permission denied'}});
        }
    }
};
module.exports.post = function(req,res){
    var data = req.body;
    if(data.result == "delete"){
        db.users.remove({codeforces_lower : data.codeforces_username.toLowerCase()}, function(err){
           if(err){
               console.error(err);
               console.mongo("Error "+err);
               res.STATUS_CODES = 500;
               res.sendStatus(500);
           }
            else{
               res.send(true);
           }
        });
    }
    else if(data.result == "ok"){
        db.users.find({codeforces_lower : data.codeforces_username.toLowerCase()},{}).lean().exec(function(err,user){
            if(err){
                console.error(err);
                console.mongo("Error "+err);
                res.STATUS_CODES = 500;
                res.sendStatus(500);
            }
            else {
                user._verify = true;
                db.users(user).save(function (err2) {
                    if (err2) {
                        console.error(err2);
                        console.mongo("Error " + err2);
                        res.STATUS_CODES = 500;
                        res.sendStatus(500);
                    }
                    else {
                        res.send(true);
                    }
                });
            }
        });
    }
};