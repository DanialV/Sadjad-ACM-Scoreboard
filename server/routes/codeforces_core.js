/**
 * Created by Danial Vafadar on 7/28/15.
 */
var code_req = require("request");
var db = require("mongo_schemas");
module.exports.get = function(req,res){
    var error = false;
    db.users.find({},{codeforces_username : true , _id : true}).lean().exec(function(err1,users){
        if(err1){
            String.error(err1,res);
        }
        else{
            db.last_id.find({},{last_id : true , _id : false}).lean().exec(function(err2,contest_id){
                if(err2){
                    String.error(err2,res);
                }
                else{
                    var all_data = {};
                    var all_user_result = [];
                    var ques_info_obj= {};
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
                                                ques_info_obj[body.result.problems[cntr].index] = (ques_info_obj.hasOwnProperty(body.result.problems[cntr].index))?ques_info_obj[body.result.problems[cntr].index]+1 : 1;
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
                                console.mongo("Codeforces Api is Down or We have internet connection problem","Error");
                                error = true;
                                loop.break();
                            }
                            loop.next();
                        });
                    },function(){
                        all_data.contest_user_info = all_user_result;
                        all_data.contest_question_info = ques_info_obj;
                        res.send(all_data);
                        db.codeforces_contests(all_data).save(function(err3,doc){
                            if(err3){
                                String.error(err3,res);
                            }
                        });
                        console.info("Codeforces information gotten form codeforces server successfully");
                        console.mongo("All codeforces api successfully received form the server and stored in mongo");
                    });
                }
            });
        }
    });
};
