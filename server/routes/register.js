/**
 * Created by Danial Vafadar on 8/10/15.
 */
var db = require("mongo_schemas");
var request = require("request");
var recaptcha = require("recaptcha");
module.exports.post = function(req,res){
    if(req.xhr){
        var data = req.body;
        recaptcha(data["g-recaptcha-response"],"6LcPIQsTAAAAAIdrx_N0yibYn872h75fJWSg6Vl5" , function(result) {
            if(result){
                db.users.count({codeforces_lower: data.code_username.toLowerCase()}, function (err, count) {
                    if (err) {
                        console.error(err3);
                        console.mongo("Error " + err3);
                        res.STATUS_CODES = 500;
                        res.sendStatus(500);
                    }
                    else if (count > 0) {
                        res.send("duplicate");
                    }
                    else {
                        var _data = {
                            first_name: data.name,
                            last_name: data.last_name,
                            email: data.email,
                            student_number: data.stu_num,
                            codeforces_username: data.code_username,
                            codeforces_lower: data.code_username.toLowerCase(),
                            score: 0,
                            mobile: (typeof data.mobile == 'undefined') ? 0 : data.mobile,
                            rank: 0,
                            rating: 0,
                            maxRank: 0,
                            maxRating: 0,
                            meetings: 0,
                            _verify: false
                        };
                        url = "http://codeforces.com/api/user.info?handles=" + data.code_username;
                        request(url, function (err, response, body) {
                            if (response && !err && response.statusCode == 200) {
                                body = JSON.parse(body);
                                _data.rank = (body.result[0].rank) ? body.result[0].rank : "0";
                                _data.rating = (body.result[0].rating) ? body.result[0].rating : 0;
                                _data.maxRank = (body.result[0].maxRank) ? body.result[0].maxRank : "0";
                                _data.maxRating = (body.result[0].maxRating) ? body.result[0].maxRating : 0;
                                var temp = new db.users(_data);
                                temp.save(function (err3, doc) {
                                    if (err3) {
                                        console.error(err3);
                                        console.mongo("Error " + err3);
                                        res.STATUS_CODES = 500;
                                        res.sendStatus(500);
                                    }
                                    else {
                                        res.send(true);
                                    }
                                });
                            }
                            else {
                                console.error("codeforces api is down or we have internet connection problem");
                                console.mongo("Error " + "codeforces api is down or we have internet connection problem");
                                res.STATUS_CODES = 500;
                                res.sendStatus(false);
                            }
                        });
                    }
                });
            }
            else{
                res.send("recaptcha");
            }
        });
    }
    else{
        res.render('error',{ data : {status_code : '550',status_massage : 'Permission denied'}});
    }
};