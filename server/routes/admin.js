/**
 * Created by Danial Vafadar on 8/4/15.
 */
var db = require("mongo_schemas");
module.exports.get =function(req,res){
    if(typeof req.session.username == 'undefined'){
        res.redirect(301, '/scoreboard');
    }
    else{
        db.logs.find({},{_id : false , __v : false} ).sort({date: -1}).lean().exec(function(err,doc){
            if(err){
                console.error(err);
                console.mongo("Error "+err);
                res.STATUS_CODES = 500;
                res.render('error',{ data : {status_code : '500',status_massage : 'Internal Server error'}});
            }
            else{
                res.render('admin',{data : doc});
            }
        });
    }
};