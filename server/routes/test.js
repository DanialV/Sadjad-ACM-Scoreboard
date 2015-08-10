/**
 * Created by Danial Vafadar on 8/6/15.
 */
module.exports.get = function(req,res){
    var my_json = {
        username : "sample",
        password : "sample2",
        id : 3
    };
    res.render('test',{data : my_json });
};