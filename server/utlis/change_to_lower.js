/**
 * Created by Danial Vafadar on 8/10/15.
 */
var db = require("mongo_schemas");
String.change_to_lower = function(){
    db.users.find({},{}).lean().exec(function(err,user){
            db.users.find({}, {}).remove(function (err2) {
                if(err2){
                    console.error(err2);
                    console.mongo("Error " + err2);
                    res.STATUS_CODES = 500;
                }
                else {
                    Number.async_for(user.length, function (loop) {
                        var i = loop.iteration();
                        user[i].codeforces_lower = user[i].codeforces_username.toLowerCase();
                        var temp = new db.users(user[i]);
                        temp.save(function (err3) {
                            if (err3) {
                                console.error(err3);
                                console.mongo("Error " + err3);
                                res.STATUS_CODES = 500;
                            }
                            else {

                                loop.next();
                            }
                    });
                },function () {
                        console.mongo("codeforces username are now lower case");
                });
            }
        });
    });
};