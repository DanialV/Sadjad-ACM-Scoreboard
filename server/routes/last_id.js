/**
 * Created by Danial Vafadar on 8/4/15.
 */
var db = require("mongo_schemas");
module.exports.get = function(req,res){
    var url = req.originalUrl;
    var _contest_id = Number(url.split('/')[3]);
    var contest_id = {
        'last_id' : _contest_id
    };
    db.last_id.remove(function(err){
        if(err){
            console.error(err);
            console.mongo(err,"Error");
            res.STATUS_CODES = 500;
            res.render('error',{ data : {status_code : '500',status_massage : 'Internal Server error'}});
        }
        else{
            db.last_id(contest_id).save(function(err){
                if(err){
                    console.error(err);
                    console.mongo("Error"+err);
                    res.STATUS_CODES = 500;
                    res.render('error',{ data : {status_code : '500',status_massage : 'Internal Server error'}});
                }
                else{
                    res.send(contest_id);
                }
            });
        }
    });
};