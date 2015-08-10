/**
 * Created by Danial Vafadar on 8/7/15.
 */
module.exports.get = function(req,res){
    if(typeof req.session.username == 'undefined'){
        res.render('navbar',{data : { 'role' : 0 }});
    }
    else{
        if(req.xhr) {
            res.render('navbar', {data: {role: req.session.username}});
        }
        else{
            res.render('error',{ data : {status_code : '550',status_massage : 'Permission denied'}});
        }
    }
};