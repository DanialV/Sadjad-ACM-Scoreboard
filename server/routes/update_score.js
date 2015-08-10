/**
 * Created by Danial Vafadar on 7/31/15.
 */
var db = require("mongo_schemas");
var async = require("async");
module.exports.get = function(req,res){
    if(typeof req.session.username == 'undefined'){
        res.redirect(301, '/scoreboard');
    }
    else {
        if(req.xhr)
        {
            var result = [];
            db.users.find({_verify : true}, {}).lean().exec(function (err1, users) {
                if (err1) {
                    console.error(err1);
                    console.mongo("Error " + err1);
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
                    db.last_id.find({}, {_id: false, last_id: true}).lean().exec(function (err2, contest_id) {
                        if (err2) {
                            console.error(err2);
                            console.mongo("Error " + err2);
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
                            db.codeforces_contests.find({contest_id: contest_id[0].last_id}, {
                                _id: false,
                                contest_id: false
                            })
                            .lean().exec(function (err3, contest_info) {
                                if (err3) {
                                    console.error(err3);
                                    console.mongo("Error " + err3);
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
                                    }, function (err4) {
                                        if (err4) {
                                            console.error(err4);
                                            console.mongo("Error " + err4);
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
                                            db.users.remove({}, function (err5) {
                                                if (err5) {
                                                    console.error(err5);
                                                    console.mongo("Error " + err5);
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
                                                        db.users(users[i]).save(function (err6, doc) {
                                                            if (err6) {
                                                                console.error(err6);
                                                                console.mongo("Error " + err6);
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
            });
        }
        else{
            res.render('error',{ data : {status_code : '550',status_massage : 'Permission denied'}});
        }
    }
};
