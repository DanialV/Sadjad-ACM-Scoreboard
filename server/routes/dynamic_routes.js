/**
 * Created by Danial Vafadar on 7/18/15.
 */
var indexes = [
    'show_scoreboard',
    'login',
    'navbar'
];
var route_postfix = 'scoreboard/';
module.exports = function(app){
    app.route('/').get(function(req,res,next){
        res.redirect(301, '/scoreboard');
    });
    app.route('/'+route_postfix).get(function(req,res){
        res.render('index');
    });
    indexes.forEach(function(index){
        app.route('/' + route_postfix +  index)
            .get(function(req,res){
                if(req.xhr)
                    res.render(index);
                else res.render('error',{data : {status_code : '550',status_massage : 'Permission denied'}});
            });
    });
    app.route('/'+ route_postfix + 'scoreboard_info').get(require('./scoreboard_info').get);
    //todo : all of this route are temporary and should chnage in admin page
    app.route('/' + route_postfix + 'codeforces_core').get(require('./codeforces_core').get);
    app.route('/' + route_postfix + 'update_score').get(require('./update_codeforces_score').get);
    app.route('/' + route_postfix + 'users').get(require('../utlis/Wrench').get);
    app.route('/' + route_postfix + 'contest_id/:id').get(require('./last_id').get);

};
