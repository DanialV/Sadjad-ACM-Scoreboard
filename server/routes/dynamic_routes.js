/**
 * Created by Danial Vafadar on 7/18/15.
 */
var indexes = [
    'navbar',
    'login'
];
module.exports = function(app){
    app.route('/').get(function(req,res){
        res.render('index');
    });
    indexes.forEach(function(index){
            try {
                app.route('/' + index)
                    .get(function(req,res){
                        if(req.xhr)
                            res.render(index);
                        else res.send("Just XHR request have a permission to access");
                        }).post(require('./'+index).post);

            } catch(e) {
            }
    });
};
