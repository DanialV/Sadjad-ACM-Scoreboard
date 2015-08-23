/**
 * Created by Danial Vafadar on 7/31/15.
 */
var db = require("mongo_schemas");
var async = require("async");
module.exports.post = function(req,res){
    var data = req.body;
    if(typeof req.session.username == 'undefined'){
        res.redirect(301, '/scoreboard');
    }
    else {
        if(req.xhr)
        {
            var result = [];
            db.users.find({_verify : true}, {}).lean().exec(function (err, users) {
                if (err) {
                    console.error(err);
                    console.mongo("Error " + err);
                    res.STATUS_CODES = 500;
                    res.render('update_score', {
                        data: {
                            status_code: '500',
                            status_massage: 'Internal Server error',
                            type: 'Error'
                        }
                    });
                }
                else {
                    db.codeforces_contests.find({contest_id: data.contest_id}, {
                        _id: false,
                        contest_id: false
                    })
                    .lean().exec(function (err, contest_info) {
                        if (err) {
                            console.error(err);
                            console.mongo("Error " + err);
                            res.STATUS_CODES = 500;
                            res.render('update_score', {
                                data: {
                                    status_code: '500',
                                    status_massage: 'Internal Server error',
                                    type: 'Error'
                                }
                            });
                        }
                        else {
                            async.eachSeries(contest_info[0].contest_user_info, function (user_contest_info, cb) {
                                var each_user = {};
                                each_user.codeforces = user_contest_info.codeforces_username;
                                each_user.participate_score = user_contest_info.participate_score;
                                each_user.score = 0;
                                user_contest_info.questions.forEach(function (user_question_info) {
                                    var score = 0;
                                    if (typeof user_question_info.time != 'undefiled' && typeof user_question_info.wrongs != 'undefiled')
                                        score = String.score(contest_info[0].contest_question_info[user_question_info.index],
                                            user_question_info.time, user_question_info.wrongs);
                                    each_user.score = each_user.score + score;
                                });
                                result.push(each_user);
                                cb();
                            }, function (err) {
                                if (err) {
                                    console.error(err);
                                    console.mongo("Error " + err);
                                    res.STATUS_CODES = 500;
                                    res.render('update_score', {
                                        data: {
                                            status_code: '500',
                                            status_massage: 'Internal Server error',
                                            type: 'Error'
                                        }
                                    });

                                }
                                else {
                                    var max_score = 0;
                                    for (var key in contest_info[0].contest_question_info) {
                                        max_score += String.score(contest_info[0].contest_question_info[key], 0, 0);
                                    }
                                    for (var cntr = 0; cntr < result.length; cntr++) {
                                        result[cntr].score /= max_score;
                                    }
                                    for (var i = 0; i < users.length; i++) {
                                        for (var j = 0; j < result.length; j++) {
                                            if (result[j].codeforces == users[i].codeforces_username) {
                                                users[i].score += (result[j].score + result[j].participate_score);
                                                break;
                                            }
                                        }
                                    }
                                    db.users.remove({}, function (err) {
                                        if (err) {
                                            console.error(err);
                                            console.mongo("Error " + err);
                                            res.STATUS_CODES = 500;
                                            res.render('update_score', {
                                                data: {
                                                    status_code: '500',
                                                    status_massage: 'Internal Server error',
                                                    type: 'Error'
                                                }
                                            });

                                        }
                                        else {
                                            Number.async_for(users.length, function (loop) {
                                                var i = loop.iteration();
                                                db.users(users[i]).save(function (err) {
                                                    if (err) {
                                                        console.error(err);
                                                        console.mongo("Error " + err);
                                                        res.STATUS_CODES = 500;
                                                        res.render('update_score', {
                                                            data: {
                                                                status_code: '500',
                                                                status_massage: 'Internal Server error',
                                                                type: 'Error'
                                                            }
                                                        });

                                                    }
                                                    else {
                                                        loop.next();
                                                    }
                                                });
                                            }, function () {
                                                console.info("All score is updated Now");
                                                console.mongo("Score is updated");
                                                res.render('update_score', {
                                                    data: {
                                                        message: "All score is updated Now",
                                                        type: 'OK'
                                                    }
                                                });
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
        else{
            res.render('error',{ data : {status_code : '550',status_massage : 'Permission denied'}});
        }
    }
};
module.exports.get = function(req,res){
    if(typeof req.session.username != 'undefined') {
        if (req.xhr) {
            db.codeforces_contests.find({},{_id : false,contest_id : true}).sort({contest_id : -1}).lean().exec(function(err,contests){
               if(err){
                   res.render('update_score', {
                       data: {
                           status_code: '500',
                           status_massage: 'Internal Server error',
                           type: 'Error'
                       }
                   });
               }
               else{
                   res.render('update_score',{
                       data : {
                           type : 'ok',
                           contests : contests,
                           csrfToken : req.csrfToken()
                       }
                   });
               }
            });
        }
        else{
            res.render('error',{ data : {status_code : '550',status_massage : 'Permission denied'}});
        }
    }
    else{
        res.redirect(301, '/scoreboard');
    }
};
