/**
 * Created by Danial Vafadar on 7/28/15.
 */
var request = require("request");
var async = require("async");
var bcrypt = require("encrypt");
var db = require("mongo_schemas");
function ObjectId(s){
    return s;
}
module.exports.get = function(req,res){
    if(typeof req.session.username == 'undefined'){
        res.redirect(301, '/scoreboard');
    }
    else{
        db.users.count(function(err,num){
            if(num > 0){
                res.render('error', {data: {status_code: '404', status_massage: 'Not Found'}});
            }
            else{
                var user = [
                    /* 0 */
                    {

                        "first_name": "الیاس",
                        "last_name": "قاسمی",
                        "student_number": 92412122,
                        "mobile": "09366877798",
                        "email": "egh1374@gmail.com",
                        "codeforces_username": "Elyas74",
                        "_verify": true,
                        "contests": 2,
                        "questions": 2,
                        "score": 18.818,
                        "meetings": 2
                    },

                    /* 1 */
                    {
                        "first_name": "حسین",
                        "last_name": "جدی",
                        "student_number": 93412147,
                        "mobile": "09372759548",
                        "email": "seriousmvs@gmail.com",
                        "codeforces_username": "seriousX",
                        "_verify": true,
                        "contests": 2,
                        "questions": 4,
                        "score": 19.685,
                        "meetings": 2
                    },

                    /* 2 */
                    {
                        "first_name": "Ashkan",
                        "last_name": "Moradi",
                        "student_number": 92412196,
                        "mobile": "09151031903",
                        "email": "ashkan.mradi@gmail.com",
                        "codeforces_username": "ashkan__",
                        "_verify": true,
                        "score": 13.4,
                        "meetings": 2,
                        "questions": 1,
                        "contests": 1
                    },

                    /* 3 */
                    {
                        "first_name": "حجت",
                        "last_name": "عظیمی اسراری",
                        "student_number": 923577920,
                        "mobile": "09351377868",
                        "email": "azimi.hojjat@yahoo.com",
                        "codeforces_username": "hojjat",
                        "_verify": true,
                        "score": 13.855,
                        "meetings": 2,
                        "contests": 1,
                        "questions": 2
                    },

                    /* 4 */
                    {
                        "first_name": "Seyyed Mohammad",
                        "last_name": "Moosavi",
                        "student_number": 92422210,
                        "mobile": "09157185173",
                        "email": "lndx.acm@gmail.com",
                        "codeforces_username": "KAKTOOS",
                        "_verify": true,
                        "score": 15.185,
                        "questions": 3,
                        "contests": 2,
                        "meetings": 1
                    },

                    /* 5 */
                    {
                        "first_name": "مطهره",
                        "last_name": "شریعتمداری",
                        "student_number": 92412177,
                        "mobile": "09358062510",
                        "email": "m.shariatmadari.49@gmail.com",
                        "codeforces_username": "cardinal4991",
                        "meetings": 2,
                        "contests": 2,
                        "questions": 1,
                        "score": 18.419,

                        "_verify": true
                    },

                    /* 6 */
                    {
                        "first_name": "سید معین الدین",
                        "last_name": "سعادتی",
                        "student_number": 93412119,
                        "mobile": "09156272473",
                        "email": "saadati.moin@gmail.com",
                        "codeforces_username": "msaadati170",
                        "meetings": 0,
                        "contests": 2,
                        "questions": 1,
                        "score": 10.408,

                        "_verify": true
                    },

                    /* 7 */
                    {
                        "first_name": "ali",
                        "last_name": "gandomi",
                        "student_number": 92412113,
                        "mobile": "09158018592",
                        "email": "gandomi313@gmail.com",
                        "codeforces_username": "ali_gandomi",
                        "meetings": 0,
                        "contests": 1,
                        "questions": 0,
                        "score": 5,

                        "_verify": true
                    },

                    /* 8 */
                    {
                        "first_name": "s",
                        "last_name": "Gha",
                        "student_number": 92412163,
                        "mobile": "09154725185",
                        "email": "sabereh.ghaderi@yahoo.com",
                        "codeforces_username": "lotus9594",
                        "meetings": 1,
                        "contests": 0,
                        "questions": 0,
                        "score": 4,

                        "_verify": true
                    },

                    /* 9 */
                    {
                        "first_name": "maryam",
                        "last_name": "nazari",
                        "student_number": 93412120,
                        "mobile": "09159839903",
                        "email": "m03nazari@gmail.com",
                        "codeforces_username": "mnazari",
                        "meetings": 1,
                        "contests": 1,
                        "questions": 0,
                        "score": 9,

                        "_verify": true
                    },

                    /* 10 */
                    {
                        "first_name": "دانیال",
                        "last_name": "وفادار",
                        "student_number": 92412147,
                        "mobile": "09375171110",
                        "email": "daniel.vafadar@gmail.com",
                        "codeforces_username": "DanialV",
                        "meetings": 1,
                        "contests": 1,
                        "questions": 1,
                        "score": 9.388,

                        "_verify": true
                    },

                    /* 11 */
                    {
                        "first_name": "taravat",
                        "last_name": "anvari",
                        "student_number": 93422149,
                        "mobile": "09157109382",
                        "email": "tara.anvari96@yahoo.com",
                        "codeforces_username": "Tara-ANV",
                        "meetings": 1,
                        "contests": 2,
                        "questions": 0,
                        "score": 14,

                        "_verify": true
                    },

                    /* 12 */
                    {
                        "first_name": "narges",
                        "last_name": "aghighi",
                        "student_number": 93415113,
                        "mobile": "09158598535",
                        "email": "n.aghighi1996@gmail.com",
                        "codeforces_username": "N.AG",
                        "meetings": 1,
                        "contests": 2,
                        "questions": 0,
                        "score": 14,

                        "_verify": true
                    },

                    /* 13 */
                    {
                        "first_name": "سمانه",
                        "last_name": "خسروی",
                        "student_number": 93422146,
                        "mobile": "09368017259",
                        "email": "s_khosravi74@yahoo.com",
                        "codeforces_username": "S_khosravi",
                        "meetings": 1,
                        "contests": 0,
                        "questions": 0,
                        "score": 4,

                        "_verify": true
                    },

                    /* 14 */
                    {
                        "first_name": "amir",
                        "last_name": "gohari",
                        "student_number": 92422123,
                        "mobile": "09152467002",
                        "email": "amirgohari7070@gmail.com",
                        "codeforces_username": "night70",
                        "meetings": 2,
                        "contests": 0,
                        "questions": 0,
                        "score": 8,

                        "_verify": true
                    },

                    /* 15 */
                    {
                        "first_name": "ali",
                        "last_name": "forghani",
                        "student_number": 93412130,
                        "mobile": "09375638660",
                        "email": "forghanicall@gmail.com",
                        "codeforces_username": "forghani",
                        "meetings": 0,
                        "contests": 0,
                        "questions": 0,
                        "score": 0,

                        "_verify": true
                    },

                    /* 16 */
                    {
                        "first_name": "نیلوفر",
                        "last_name": "طبائی",
                        "student_number": 93415111,
                        "mobile": "09381382718",
                        "email": "Nila-t1996@yahoo.com",
                        "codeforces_username": "nilufar.t",
                        "meetings": 0,
                        "contests": 0,
                        "questions": 0,
                        "score": 0,

                        "_verify": true
                    },

                    /* 17 */
                    {
                        "first_name": "سپهر",
                        "last_name": "محقق",
                        "student_number": 92412147,
                        "mobile": "09302021988",
                        "email": "becca4eva@live.com",
                        "codeforces_username": "BECCA",
                        "_verify": true,
                        "contests": 2,
                        "questions": 3,
                        "score": 19.153,
                        "meetings": 2
                    },

                    /* 18 */
                    {
                        "first_name": "ali",
                        "last_name": "yazdi",
                        "student_number": 92412120,
                        "mobile": "09308677568",
                        "email": "aliyazdi1994@yahoo.com",
                        "codeforces_username": "mohamad.ali.95",
                        "_verify": true,
                        "score": 13.391,
                        "meetings": 2,
                        "questions": 1,
                        "contests": 1
                    },

                    /* 19 */
                    {
                        "first_name": "الناز",
                        "last_name": "صباغ زاده",
                        "student_number": 92412119,
                        "mobile": "09366023493",
                        "email": "a.sabaghzade@gmail.com",
                        "codeforces_username": "A.S",
                        "_verify": true,
                        "score": 13,
                        "meetings": 2,
                        "contests": 1,
                        "questions": 0
                    },

                    /* 20 */
                    {
                        "first_name": "zahra",
                        "last_name": "mirzaei",
                        "student_number": 93412150,
                        "mobile": "09158585286",
                        "email": "zahra.mirzaei75@yahoo.ca",
                        "codeforces_username": "zm96",
                        "_verify": true,
                        "score": 14,
                        "contests": 2,
                        "questions": 0,
                        "meetings": 1
                    },

                    /* 21 */
                    {
                        "first_name": "mahsa",
                        "last_name": "shah mohammad zade",
                        "student_number": 92412123,
                        "mobile": "09150730533",
                        "email": "mahsamohamadi95.mm@gmail.com",
                        "codeforces_username": "mahsamohamadi",
                        "_verify": true,
                        "score": 9,
                        "meetings": 1,
                        "contests": 1,
                        "questions": 0
                    },

                    /* 22 */
                    {
                        "first_name": "سجاد",
                        "last_name": "عبدی ده سرخ",
                        "student_number": 92412150,
                        "mobile": "09397796915",
                        "email": "kavoshgar21974@yahoo.com",
                        "codeforces_username": "msa21974",
                        "meetings": 0,
                        "contests": 0,
                        "questions": 0,
                        "score": 0,

                        "_verify": true
                    },

                    /* 23 */
                    {
                        "first_name": "علی",
                        "last_name": "تیموری",
                        "student_number": 93614155,
                        "mobile": "09367330526",
                        "email": "ali_teimoury1@yahoo.com",
                        "codeforces_username": "khordadi",
                        "meetings": 0,
                        "contests": 1,
                        "questions": 1,
                        "score": 5.452,

                        "_verify": true
                    },

                    /* 24 */
                    {
                        "first_name": "فاطمه",
                        "last_name": "مهاجر",
                        "student_number": 93415127,
                        "mobile": "09383706203",
                        "email": "f-mohajer1374@yahoo.com",
                        "codeforces_username": "mohajer",
                        "meetings": 0,
                        "contests": 0,
                        "questions": 0,
                        "score": 0,

                        "_verify": true
                    },

                    /* 25 */
                    {
                        "first_name": "محمد جواد",
                        "last_name": "اشرافی بجستانی",
                        "student_number": 93412162,
                        "mobile": "09013107889",
                        "email": "mjob.sadjad@gmail.com",
                        "codeforces_username": "Mjob",
                        "meetings": 0,
                        "contests": 0,
                        "questions": 0,
                        "score": 0,
                        "__v": 0
                    }
                ];
                var url = "http://codeforces.com/api/user.info?handles=";
                for (var i = 0; i < user.length; i++) {
                    url += user[i].codeforces_username + ";";
                    user[i].codeforces_lower = user[i].codeforces_username.toLowerCase();
                }
                request(url, function (err, response, body) {
                    if (response && !err && response.statusCode == 200) {
                        body = JSON.parse(body);
                        Number.async_for(body.result.length, function (loop) {
                            var i = loop.iteration();
                            user[i].rank = (body.result[i].rank) ? body.result[i].rank : "0";
                            user[i].rating = (body.result[i].rating) ? body.result[i].rating : 0;
                            user[i].maxRank = (body.result[i].maxRank) ? body.result[i].maxRank : "0";
                            user[i].maxRating = (body.result[i].maxRating) ? body.result[i].maxRating : 0;
                            var temp = new db.users(user[i]);
                            temp.save(function (err, doc) {
                                if (err) {
                                    console.error(err);
                                    console.mongo("Error" + err);
                                    res.STATUS_CODES = 500;
                                    res.render('error', {data: {status_code: '500', status_massage: 'Internal Server error'}});
                                }
                                else {
                                    loop.next();
                                }
                            });
                        }, function () {
                            res.send(user);
                            console.mongo("All User successfully added");
                        });
                    }
                    else {
                        console.error(response.statusCode);
                    }
                });
            }
        });
    }
};


