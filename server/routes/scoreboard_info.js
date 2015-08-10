/**
 * Created by Danial Vafadar on 8/2/15.
 */
var db= require("mongo_schemas");
module.exports.get = function(req,res){
    if(req.xhr){
        db.users.find({_verify : true},{codeforces_username : true , score : true , rank : true , maxRank : true , maxRating : true , rating : true} ).sort({score : -1}).lean().exec(function(err,user_info){
            if(err){
                console.error(err);
                console.mongo(err,"Error");
                res.sendStatus(500);
            }
            else{
                res.render('show_scoreboard',{data : user_info});
            }
        });
    }
    else{
        res.render('error',  {data : {status_code : '550',status_massage : 'Permission denied'}});
    }

};