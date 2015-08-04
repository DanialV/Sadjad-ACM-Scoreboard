/**
 * Created by Danial Vafadar on 7/20/15.
 */
var route_postfix = 'scoreboard/'   ;
var pc3 = (function(){
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    function compare_score(a,b){
        if(a.score < b.score)return 1;
        else if(a.score > b.score)return -1;
        else return 0;
    }
    function compare_rating(a,b){
        if(a.rating < b.rating)return 1;
        else if(a.rating > b.rating)return -1;
        else return 0;
    }
    function compare_maxRating(a,b){
        if(a.maxRating < b.maxRating)return 1;
        else if(a.maxRating > b.maxRating)return -1;
        else return 0;
    }
    function append_tr(scoreboard_info){
        for(var i=0 ; i<scoreboard_info.length ; i++) {
            var herfs = "http://codeforces.com/profile/" + scoreboard_info[i].codeforces_username;
            if (i < 3) {
                $('#tbody').append(
                    '<tr class="success">'
                    + "<td>" + (i + 1) + "</td>"
                    + '<td><a href='+ herfs + '>' + scoreboard_info[i].codeforces_username + '</a></td>'
                    + '<td>' + scoreboard_info[i].score.toFixed(3) + '</td>'
                    + '<td>' + scoreboard_info[i].rating + '</td>'
                    + '<td>' + scoreboard_info[i].maxRating + '</td>'
                    + '<td>' + scoreboard_info[i].rank + '</td>'
                    + '<td>' + scoreboard_info[i].maxRank + '</td>'
                    + '</tr>'
                );
            }
            else if (i > 21) {
                $('#tbody').append(
                    '<tr class="danger">'
                    + "<td>" + (i + 1) + "</td>"
                    + '<td><a href='+ herfs + '>' + scoreboard_info[i].codeforces_username + '</a></td>'
                    + '<td>' + scoreboard_info[i].score.toFixed(3) + '</td>'
                    + '<td>' + scoreboard_info[i].rating + '</td>'
                    + '<td>' + scoreboard_info[i].maxRating + '</td>'
                    + '<td>' + scoreboard_info[i].rank + '</td>'
                    + '<td>' + scoreboard_info[i].maxRank + '</td>'
                    + '</tr>'
                );
            }
            else {
                $('#tbody').append(
                    '<tr class="active">'
                    + "<td>" + (i + 1) + "</td>"
                    + '<td><a href='+ herfs + '>' + scoreboard_info[i].codeforces_username + '</a></td>'
                    + '<td>' + scoreboard_info[i].score.toFixed(3) + '</td>'
                    + '<td>' + scoreboard_info[i].rating + '</td>'
                    + '<td>' + scoreboard_info[i].maxRating + '</td>'
                    + '<td>' + scoreboard_info[i].rank + '</td>'
                    + '<td>' + scoreboard_info[i].maxRank + '</td>'
                    + '</tr>'
                );
            }
        }
    }
    function scoreboard(){
       $.ajax({
          url : '/'+ route_postfix + 'scoreboard_info',
          type : 'GET',
           success : function(scoreboard_info){
               $.ajax({
                   url : '/'+ route_postfix + 'show_scoreboard',
                   type : 'GET',
                   success : function(scoreboard_table){
                       console.dir(scoreboard_info);
                       $("#main").html(scoreboard_table);
                       $("#sub").html("Scoreboard");
                       append_tr(scoreboard_info);
                       var table = $("#scoreboard tbody");

                       table.find('tr').each(function (i) {
                           var $tds = $(this).find('td');
                               var rank = $tds.eq(5).text();
                           if(rank == 0) {
                               $tds.eq(5).html("No Contest");
                               $tds.eq(6).html("No Contest");

                           }

                       });
                       $(document).ready(function() {
                           $('table.tableSorter').tableSort({
                               sortBy: ['numeric', 'text', 'numeric', 'numeric', 'numeric', 'nosort' , 'nosort'],
                               speed: 600,
                               delay: 10
                           });
                       });
                   },
                   error : function(err){
                       toastr.error( err.status + " " + err.statusText + "!","Oops!");
                   }
               });
           },
           error : function(err){
               toastr.error( err.status + " " + err.statusText,"Oops!");
           }

       });
   }
    function load_login(){
        $.ajax({
            url : '/' + route_postfix +'login',
            type : 'GET',
            success : function(html){
                $("#login").html(html);
            },
            error : function(err){
                toastr.error( err.status + " " + err.statusText,"Oops!");
            }

        });
    }
    function load_navbar(){
        $.ajax({
            url : '/' + route_postfix +'navbar',
           type : 'GET',
            success : function(html){
                $("#nav").html(html);
                load_login();
            },
            error : function(err){
                toastr.error( err.status + " " + err.statusText,"Oops!");
            }

        });
    }
    function load_everything(){
        scoreboard();
        load_navbar();
    }
    return{
        _load_login: load_everything
    };
})();
pc3._load_login();