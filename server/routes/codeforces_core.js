/**
 * Created by Danial Vafadar on 7/28/15.
 */
var code_req = require("request");
var db = require("mongo_schemas");
module.exports.get = function(req,res){
    var error = false;
    db.users.find({},{codeforces_username : true , _id : true}).lean().exec(function(err1,users){
        if(err1){
            console.error(err1);
            console.mongo(err1);
            error = true;
        }
        else{
            //console.log(result.length);
            db.last_id.find({},{last_id : true , _id : false}).lean().exec(function(err2,contest_id){
                if(err2){
                    console.error(err2);
                    console.mongo(err2);
                    error = true;
                }
                else{
                    var all_data = {};
                    var all_user_result = [];
                    all_data.contest_id = contest_id[0].last_id;
                    Number.async_for(users.length,function(loop) {
                        var i = loop.iteration();
                        code_req("http://codeforces.com/api/contest.standings?contestId=" + contest_id[0].last_id + "&from=1&count=100&handles=" +
                            users[i].codeforces_username, function (err3, response, body) {
                            if (response && !err3 && response.statusCode == 200) {
                                body = JSON.parse(body);
                                if (body.status == "OK") {
                                    var contest = body.result.rows;
                                    var each_contest_res = {};
                                    each_contest_res.max_question = 0;
                                    each_contest_res.participate_score = 0;
                                    each_contest_res.questions = [];
                                    each_contest_res.codeforces_username = String(users[i].codeforces_username);
                                    if (String.isObjEmpty(contest)) {
                                        all_user_result.push(each_contest_res);
                                    }
                                    else {
                                        contest = contest[0].problemResults;
                                        for (var cntr in contest) {
                                            if (contest[cntr].points != 0) {
                                                var each_pro = {};
                                                ///for every question id index title and woring and time save in array
                                                each_pro.index = body.result.problems[cntr].index;
                                                each_pro.title = body.result.problems[cntr].name;
                                                each_pro.wrongs = contest[cntr].rejectedAttemptCount;
                                                each_pro.time = contest[cntr].bestSubmissionTimeSeconds;
                                                each_contest_res.questions.push(each_pro);

                                                ///maximum question this guy solved in this contest
                                                each_contest_res.max_question++;
                                                ///the score of this contest
                                                each_contest_res.participate_score += String.score(body.result.problems.length, each_pro.time, each_pro.wrongs);
                                            }
                                        }
                                        all_user_result.push(each_contest_res);
                                    }
                                }
                            }
                            else {
                                console.mongo("Codeforces Api is Down or We have internet connection problem");
                                error = true;
                                loop.break();
                            }
                            loop.next();
                        });
                    },function(){
                        res.send(all_user_result);
                        all_data.contest_user_info = all_user_result;
                        db.codeforces_contests(all_data).save(function(err3,doc){
                            if(err3){
                                console.error(err3);
                                console.mongo(err3);
                                error = true;
                            }
                        });
                        console.info("Done");
                        console.mongo("All codeforces api successfully received form the server and stored in mongo");
                    });
                }
            });
        }

    });
    if(error)res.sendStatus(500);
};
