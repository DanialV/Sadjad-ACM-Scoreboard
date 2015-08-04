/**
 * Created by Danial Vafadar on 8/2/15.
 */
var db= require("mongo_schemas");
module.exports.get = function(req,res){
    db.users.find({},{codeforces_username : true , score : true , rank : true , maxRank : true , maxRating : true , rating : true}).sort({score : -1}).lean().exec(function(err,user_info){
        if(err){
            console.error(err);
            console.mongo(err,"Error");
            res.render('error',{ data : {status_code : '500',status_massage : 'Internal Server error'}});
        }
        else{
            if(req.xhr){
                res.send(user_info);
            }
            else{
                res.render('error',  {data : {status_code : '550',status_massage : 'Permission denied'}});
            }
        }
    });
};