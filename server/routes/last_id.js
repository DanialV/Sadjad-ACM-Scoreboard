/**
 * Created by Danial Vafadar on 8/4/15.
 */
var db = require("mongo_schemas");
module.exports.get = function(req,res){
    if(typeof req.session.username == 'undefined'){
        res.redirect(301, '/scoreboard');
    }
    else {
        if(req.xhr) {
            var _contest_id = Number(req.originalUrl.split('/')[3]);
            var contest_id = {
                'last_id': _contest_id
            };
            db.last_id.remove(function (err) {
                if (err) {
                    console.error(err);
                    console.mongo(err, "Error");
                    res.STATUS_CODES = 500;
                    res.render('last_id_update', {
                        data: {
                            status_code: '500',
                            status_massage: 'Internal Server error',
                            type: 'Error'
                        }
                    });
                }
                else {
                    db.last_id(contest_id).save(function (err) {
                        if (err) {
                            console.error(err);
                            console.mongo("Error" + err);
                            res.STATUS_CODES = 500;
                            res.render('last_id_update', {
                                data: {
                                    status_code: '500',
                                    status_massage: 'Internal Server error',
                                    type: 'Error'
                                }
                            });
                        }
                        else {
                            res.render('last_id_update', {data: {message: 'Contest Id is now updated', type: 'OK'}});
                            console.mongo("Contest Id is now updated");
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