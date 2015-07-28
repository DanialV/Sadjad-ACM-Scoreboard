/**
 * Created by Danial Vafadar on 7/28/15.
 */
var code_req = require("request");
var formula = require("formula");
var db = require("mongo_schemas");
db.last_id.find({},{_id : false}).lean().exec(function(err,last_id){
    if(err){
     throw err;
    }
    else {
        console.log(last_id);
    }
});
module.exports.codeforces = function(contest_id,callback){
    code_req("http://codeforces.com/api/contest.status?contestId="+ contest_id +"&from=1&count=10" , function(err,res,body){
        if (!error && response.statusCode == 200) {

        }
        else{

        }
    });

};
