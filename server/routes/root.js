/**
 * Created by Danial Vafadar on 7/18/15.
 */
module.exports = function(app){
//////////////////////////////////////////Config Part/////////////
    /////Route configuration /////
    require('./dynamic_routes')(app);
// catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

// error handlers

// development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                data : {
                    status_code: (err.status || 500),
                    status_massage: err.message
                }
            });
        });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};