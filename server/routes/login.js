/**
 * Created by Danial Vafadar on 7/19/15.
 */
var request = require('request');
var bcrypt = require("encrypt");
var db = require("mongo_schemas");
module.exports.post = function(req,res){
    if(req.xhr){
        var data = req.body;
        if(typeof data == 'undefiled' && typeof data.username == 'undefiled' && data.password ==  'undefiled' ){
            res.send(false);
        }
        else{
            db.admin.find({},{_id:false}).lean().exec(function(err,info){
                if(err){
                    console.error("Error");
                    console.mongo("Error"+"500");
                    res.STATUS_CODES = 500;
                    res.sendStatus(500);
                }
                else{
                    if(info[0].username == data.username){
                        bcrypt.compare_(data.password,info[0].password,function(com){
                            if(com){
                                console.mongo("Successfully to login : "  + "Username : " + data.username + " Password : " + data.password);
                                req.session.username = info[0].username;
                                res.send(true);
                            }
                            else{
                                console.mongo("Failed to login : " + "Username : " +data.username + "  Password : " + data.password);
                                res.send(false);
                            }
                        });
                    }
                    else{
                        console.mongo("Failed to login : " + "Username : " + data.username + "  Password : " + data.password);
                        res.send(false);
                    }
                }
            });
        }
    }
    else{
        res.render('error',{data : {status_code : '550',status_massage : 'Permission denied'}});
    }

};