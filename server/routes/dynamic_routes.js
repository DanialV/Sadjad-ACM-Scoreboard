/**
 * Created by Danial Vafadar on 7/18/15.
 */
var indexes = [
    'login',
    'last_id_html',
    'register'
];
var file_route = [
    'scoreboard_info',
    'navbar',
    'user_update',
    'codeforces_core',
    'update_score',
    'last_id',
    'new_user',
    'admin'
];
var route_postfix = 'scoreboard/';
module.exports = function(app){
    app.route('/').get(function(req,res){
        res.redirect(301, '/' + route_postfix);
    });
    app.route('/' + route_postfix +'logout').get(function(req,res){
        if(req.xhr){
            req.session = null;
            res.send(true);
        }
        else{
            res.render('error',{data : {status_code : '550',status_massage : 'Permission denied'}});
        }
    });
    app.route('/'+route_postfix).get(function(req,res){
        if(typeof req.session.username == 'undefined'){
            res.render('index',{data : { 'version' : global.init.version , 'role' : 0 }});
        }
        else{
            res.render('index',{data : { 'version' : global.init.version , role : req.session.username}});
        }
    });
    indexes.forEach(function(index){
        try {
            app.route('/' + route_postfix +  index)
                .get(function(req,res){
                    if(req.xhr) {
                        res.render(index , {csrfToken : req.csrfToken()});
                    }
                    else res.render('error',{data : {status_code : '550',status_massage : 'Permission denied'}});
                }).post(require('./' + index).post);
        } catch(e) {

        }
    });
    file_route.forEach(function(index){
        try {
            if(index == 'last_id' )
                app.route('/'+ route_postfix + index + '/:id').get(require('./'+index).get);
            else  app.route('/'+ route_postfix + index).get(require('./'+index).get).post(require('./' + index).post);
        } catch(e) {

        }
    });
    //app.route('/scoreboard/users').get(require('../utlis/Wrench').get);
};
