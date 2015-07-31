/**
 * Created by Danial Vafadar on 7/31/15.
 */
String.error = function(err,res){
    console.error(err);
    console.mongo(err,"Error");
    res.sendStatus(500);
};