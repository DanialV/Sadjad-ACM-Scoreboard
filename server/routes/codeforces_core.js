/**
 * Created by Danial Vafadar on 7/28/15.
 */
var code_req = require("request");
var db = require("mongo_schemas");
module.exports.get = function(req,res){
    db.users.find({},{codeforces_username : true , _id : true}).lean().exec(function(err1,users){
        if(err1){
            console.error(err1);
            console.mongo("Error"+err1);
            res.STATUS_CODES = 500;
            res.render('error',{ data : {status_code : '500',status_massage : 'Internal Server error'}});
        }
        else{
            db.last_id.find({},{last_id : true , _id : false}).lean().exec(function(err2,contest_id){
                if(err2){
                    console.error(err2);
                    console.mongo("Error"+err2);
                    res.STATUS_CODES = 500;
                    res.render('error',{ data : {status_code : '500',status_massage : 'Internal Server error'}});
                }
                else{
                    var all_data = {};
                    var all_user_result = [];
                    var ques_info_obj= {};
                    all_data.contest_id = contest_id[0].last_id;
                    var url = "http://codeforces.com/api/contest.standings?contestId=" + contest_id[0].last_id + "&from=1&count=100&handles=";

                    for(var i = 0 ; i<users.length ; i++){
                        url+= users[i].codeforces_username+";";
                    }
                    code_req(url, function (err3, response, body) {
                        if (response && !err3 && response.statusCode == 200) {
                            body = JSON.parse(body);
                            if (body.status == "OK") {
                                //todo:IM
                                var contest = body.result.rows;
                                for(var j = 0 ; j<users.length ; j++){
                                    var flag = false;
                                    var each_contest_res = {};
                                    each_contest_res.max_question = 0;
                                    each_contest_res.participate_score = 0;
                                    each_contest_res.questions = [];
                                    each_contest_res.codeforces_username = String(users[j].codeforces_username);
                                    for(var m = 0  ; m<contest.length ; m++){
                                        if(contest[m].party.members[0].handle == users[j].codeforces_username){
                                            flag = true;
                                            for(var k = 0 ; k<contest[m].problemResults.length ; k++){
                                                if (contest[m].problemResults[k].points != 0) {
                                                    var each_pro = {};
                                                    ///for every question id index title and woring and time save in array
                                                    each_pro.index = body.result.problems[k].index;
                                                    //console.log( body.result.problems[k].index);
                                                    ques_info_obj[body.result.problems[k].index] = (ques_info_obj.hasOwnProperty(body.result.problems[k].index)) ? ques_info_obj[body.result.problems[k].index] + 1 : 1;
                                                    each_pro.title = body.result.problems[k].name;
                                                    each_pro.wrongs = contest[m].problemResults[k].rejectedAttemptCount;
                                                    each_pro.time = contest[m].problemResults[k].bestSubmissionTimeSeconds;
                                                    each_contest_res.questions.push(each_pro);
                                                    ///maximum question this guy solved in this contest
                                                    each_contest_res.max_question++;
                                                }
                                            }
                                            break;
                                        }
                                    }
                                    if(!flag){
                                        //user not found so it doesn't participate in this contest
                                        all_user_result.push(each_contest_res);
                                    }
                                    else{
                                        each_contest_res.participate_score = 5;
                                        all_user_result.push(each_contest_res);
                                    }
                                }
                                all_data.contest_user_info = all_user_result;
                                all_data.contest_question_info = ques_info_obj;
                                //todo : this should change is admin page
                                res.send(all_data);
                                db.codeforces_contests(all_data).save(function(err3,doc){
                                    if(err3){
                                        console.error(err3);
                                        console.mongo("Error"+err3);
                                        res.STATUS_CODES = 500;
                                        res.render('error',{ data : {status_code : '500',status_massage : 'Internal Server error'}});
                                    }
                                });
                                console.info("Codeforces information gotten form codeforces server successfully");
                                console.mongo("All codeforces api successfully received form the server and stored in mongo");
                            }
                        }
                        else {
                            console.error("Codeforces Api is Down or We have internet connection problem");
                            console.mongo("Error Codeforces Api is Down or We have internet connection problem");
                            res.render('error',{ data : {status_code : '500',status_massage : 'codeforces API is Down or there is problem with internet Connection'}});
                        }
                    });
                }
            });
        }
    });
};
