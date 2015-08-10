/**
 * Created by Danial Vafadar on 7/28/15.
 */
var request = require("request");
var async = require("async");
var db = require("mongo_schemas");
var bcrypt = require("encrypt");
require('console');
function ObjectId(a){
        return a;
}
module.exports.get = function(req,res){
    db.users.count(function(err,num){
       if(num > 0){
           res.render('error', {data: {status_code: '404', status_massage: 'Not Found!'}});
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
                   "_id": ObjectId("5548fd55017990a02e380e5e"),
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
                   "_id": ObjectId("554901c5017990a02e380e60"),
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
                   "_id": ObjectId("55496313017990a02e380e66"),
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
                   "_id": ObjectId("55498571017990a02e380e6c"),
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
                   "_id": ObjectId("554a848303b87aa21e22f592"),
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
                   "_id": ObjectId("554aab2c03b87aa21e22f5a5"),
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
                   "_id": ObjectId("554ab7ce03b87aa21e22f5b8"),
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
                   "_id": ObjectId("554be18f03b87aa21e22f5fb"),
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
                   "_id": ObjectId("554bfafb359ec5fc233d0157"),
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
                   "_id": ObjectId("554c00d0359ec5fc233d016d"),
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
                   "_id": ObjectId("554c06c4359ec5fc233d017e"),
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
                   "_id": ObjectId("554c089c359ec5fc233d0185"),
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
                   "_id": ObjectId("554c12b7359ec5fc233d0196"),
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
                   "_id": ObjectId("554d030c359ec5fc233d020a"),
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
                   "_id": ObjectId("555b4758359ec5fc233d0304"),
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
                   "_id": ObjectId("555ce9f0359ec5fc233d035a"),
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
                   "_id": ObjectId("5548edef017990a02e380e58"),
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
                   "_id": ObjectId("55490f00017990a02e380e63"),
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
                   "_id": ObjectId("554984e1017990a02e380e69"),
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
                   "_id": ObjectId("5549e04b017990a02e380e6e"),
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
                   "_id": ObjectId("554a2d17017990a02e380e70"),
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
                   "_id": ObjectId("55510e60359ec5fc233d025c"),
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
                   "_id": ObjectId("5553ac48359ec5fc233d0287"),
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
                   "_id": ObjectId("55579d26359ec5fc233d02c7"),
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
                   "_id": ObjectId("55b05a96b5725c6e22cb512c"),
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
           //bcrypt.hash_("AYW%MB&f&2+$pnBZQyKvM^CA@DLN=52YdmPwa47HMk3r$xM#SAjMevSKWqK6v6&Hdj?j?5px#fxp&2a63^+sx%KWNc7n=jjpTS8$wSG=bLJz$z=FxZBf89gWWW7njbVB?J8!&Qx7%sEaMypgp#xZ5AUhuaJuqzYwtLYFDsC*!?TY$!E9xf_rD2=$zSa3a29grXa43qP!h??8FS+Ej6qvQfvAykq&R8MSJLHv2yA3emeMNnF-9tJJghjZpHhTBwaqqC$+*99%EPH9%m3&7^4y2YS#Qgw_YYSdMKYVvR#jD!HwJ-jQrRzUhpD&kBQFbd7K@heabvfJfrjxuR62QT!^_MAjW$kG?nE3mAw7ycN@zcvXy%J&tbrEQYU3Mjzv$V&63YSrs!4*&9Xt^pHk8vdvYDPEVyH2aLPE@Y%V@ephJstjFRVUGXVy72phf*t3KrY6k#mQre=K*Y4yxhEFu!Z&uThQV2ZVQnyyjFK@MpTJ*q89G&75jVWfJFX*3uLszuE8PxKMyNJxP#v9Q3sKtdm#ydh#4qfeMBXfdYbcHf_uh^7c#6qU?-7?_%5=TRaDLmYMYGL-!B!3LHUKqZEQGLM=mk7SmbB_QHp#HKx#Me$NQc*S-!R#bTb%vs=Ay&Lzf&zc?h!UZCxqMFu3^9%BA7=qfp-B5v@Z4WnCY&J!FQ-d5?vuSMw9#*S*4dZ*9!ezuje8&5cEyA+XJHH=gMxJUmLk7xX=Px_fuwG3YuXNa4G$zfn87MV_rTCevx^?=^@3c*x7H%u6jNP*ejBumR47$e-PgS7R^!5M$XG?^e*y_P$xdH6e5?6TMkG6Xz_hc&$mVAxT!b78PaVgM-sPrYLB^-N@5N&ev^wnL89mjW5$ABmfkrg_6bL**k^8v!AsKQ75RR+z@+^Yd@HU%XZszJt9a&p?cveFckwWR74aNnxkMs8pqt7WkHjtD?*n==@^JKU&q4rent+GHaYLzDEkWs8e3NVAYBkYNd9-Ydn*gMJ=VTH???a*Lxgz68TL9H=Znx8^4YD$TJBt=n4h*suV8_n=#xM%=$+SE6TQ@Z%b%2ZKMtUPbp$msbR&$bQJY@8mXmpbjzH4+-LkX7G@*DFu7&KNGA&7CreMbT3Re&D%5^b5fLe3gR&ua&!3$*3BqbHkb%k*&?X+QcxuT!q#HK_%2sLCaSWU!_h=6ELSbTc$m$7uyvHAt+%HhZcSpkPfAAdhP#M=rhVz7qM--F_Ja^tEKKM*fuqqZVMra*q9w#YmtJ%U4Ldha@ySfGLVC7XTr-HruFdNphVP*f&wJxrd8w@#@akz@b4rTVaHp7-q-V%FAUe9%EPE6ERy+EnnYTVh3L=TkKH5$gbw5e8?bjV4AqDJ!zS7d+YBexQ@#daAs$!Zfv9!bdH+krNcxfQjaj8@!k^auq4EEQWYmvvyf5mGQkGU9U&En@$B2sy!=9W5?hkT+E!sjpy_vVEQYRLGhfNM9p7%V7NC6UchQE&83GXwH3=b2cfLhzv3H4kt8KV#%yqV&XrZYSQ_ssm2+8fBtr&P3H6pTXEARkH-GTsLrKc!GN*SL*5EJ#?9pg+mW4ycMRvZK=DRzYs9M3RpC*N@HHVEutv?Ygvq&Hsb#Eb9L?bsjL66cWr5ra%ZV9q^Sk7Mau=x@_q9pgwjEYdu*z43mnp#7Vj5PaNKn*agqRNuC&Rp6YmraYMQhg&=spY5pK5d+4WwJ=fLDF49t8RSMSJhMp3rQQSUQ@*^KuCBEk$N5d*JKrBWGQPeMr%p2N@!u2kbA&Lrx4VmHMYtEFpbfq#&pUFmv!$egTjkALhguDwpu#=NQ8smTpw^excfNeQgatZ227QCwUAvrBHTYhAK_BSXQCwe+5xBdKd2$46HXNtBh^+5b2Z*uyTC@YJZSHcTCZq7A62CmNK&#asqT#GAV_?jMxy$2fzWNVeaX4&#TR!Rcvv&QD?L$gU*rtFYh9g$r-sHR79xH-LsDX%zLWTA6XcLeWX6+R*WZ7@XbFCeffr^%aS#Xq!Z3PuewbUv66PU#ywz%AsNHZ-KYe2=!MPKfMxQH6g!*^7gUHH$wrnz", function (hash) {
           //    var add_admin = {
           //        username: "danialv",
           //        password: hash
           //    };
           //    db.admin(add_admin).save(function (err) {
           //        if (err) {
           //            console.error(err);
           //            console.mongo("Error" + err);
           //            res.STATUS_CODES = 500;
           //            res.render('error', {data: {status_code: '500', status_massage: 'Internal Server error'}});
           //        }
           //        else {
           //            console.mongo("Admin user successfully added");
           //        }
           //    });
           //});
       }
    });
};


