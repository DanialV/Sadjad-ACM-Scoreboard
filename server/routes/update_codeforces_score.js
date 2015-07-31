/**
 * Created by Danial Vafadar on 7/31/15.
 */
var db = require("mongo_schemas");
var async = require("async");
module.exports.get = function(req,res){
    var result = [];
    db.users.find({},{}).lean().exec(function(err1,users){
        if(err1){
            String.error(err1,res);
        }
        else{
            db.last_id.find({},{_id : false , last_id : true}).lean().exec(function(err2,contest_id){
                if(err2){
                    String.error(err2,res);
                }
                else{
                    db.codeforces_contests.find({contest_id : contest_id[0].last_id},{_id : false , contest_id : false})
                    .lean().exec(function(err3,contest_info){
                        if(err3){
                            console.error(err3);
                            console.mongo(err3);
                            error = true;
                        }
                        else{
                            async.eachSeries(contest_info[0].contest_user_info,function(user_contest_info,cb) {
                                var each_user = {};
                                each_user.codeforces = user_contest_info.codeforces_username;
                                user_contest_info.questions.forEach(function (user_question_info) {
                                    var score = String.score(contest_info[0].contest_question_info[user_question_info.index],
                                        user_question_info.time, user_question_info.wrongs);
                                    each_user.score = ('score' in each_user) ? each_user.score + score:score;
                                });
                                result.push(each_user);
                                cb();
                            },function(err4){
                                if(err4){
                                    String.error(err4,res);
                                }
                                else{
                                    var max_score = 0;
                                    for(var key in contest_info[0].contest_question_info){
                                        max_score += String.score(contest_info[0].contest_question_info[key],0,0);
                                    }
                                    for(var cntr = 0 ; cntr < result.length ; cntr++){
                                        result[cntr].score = result[cntr].score / max_score;
                                    }
                                    for(var i = 0 ; i< users.length ; i++){
                                        for(var j = 0 ; j<result.length ; j++){
                                            if(result[j].codeforces == users[i].codeforces_username){

                                                users[i].score = (isNaN(result[j].score) ) ? users[i].score  :
                                                users[i].score + result[j].score ;
                                                break;
                                            }
                                        }
                                    }
                                    db.users(users).save(function(err6,doc){
                                        if(err6){
                                            String.error(err6,res);
                                        }
                                        else{
                                            console.info("All score is update Now");
                                            console.mongo("Score is updated");
                                            //res.send(users);
                                        }
                                    });
                                    //db.users.remove({},function(err5){
                                    //   if(err5){
                                    //       String.error(err5,res);
                                    //   }
                                    //   else{
                                    //
                                    //   }
                                    //});
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};
