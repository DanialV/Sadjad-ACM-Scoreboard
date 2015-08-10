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
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    function post_login(){

        $("#login_form").submit(function(event){
            event.preventDefault();
        });
        $("#send_login").click(function(){
            var _data = {};
            _data.username = $("#username").val();
            _data.password = $("#password").val();
            $.ajax({
                url : '/' + route_postfix +'login',
                type : 'POST',
                data : _data,
                success : function(ok){
                    if(ok == true){
                        $.ajax({
                            url : '/' + route_postfix +'admin',
                            type : 'GET',
                            success : function(html){
                                $("#main").html(html);
                                $("#sub").html("Admin");
                                load_navbar(false);
                                exit();
                                codeforces_update();
                                log();
                                update_score();
                                user_update();
                                last_id();
                                new_user();
                            },
                            error : function(err){
                                toastr.error( err.status + " " + err.statusText,"Oops!");
                            }
                        });
                    }
                    else {
                        toastr.error("Username or Password is incorrect","Oops!");
                    }
                },
                error : function(err){
                    toastr.error( err.status + " " + err.statusText,"Oops!");
                }

            });
        });
    }
    function post_register(){
        var all_request = null;
        if(all_request != null)all_request.abort();
        $("#register_form").validate({
            submitHandler: function() {
                var _data = $("#register_form").serializeObject();
                all_request = $.ajax({
                    url : '/' + route_postfix +'register',
                    type : 'POST',
                    data : _data,
                    success : function(ok){
                        if(ok == true){
                            toastr.success("Waiting for admin approval","Success");
                        }
                        else if(ok == "duplicate") {
                            toastr.error("Your have already registered if your username is not on scoreboard table waite for admin approval ","Oops!");
                        }
                        else{
                            toastr.error("Your Codeforces Username is invalid","Oops!");
                        }
                    },
                    error : function(err){
                        toastr.error( err.status + " " + err.statusText,"Oops!");
                    }

                });
            },
            errorClass:"errors",
            errorPlacement: function (error, element){
                error.insertAfter(element);
            },
            highlight: function(element, errorClass) {
                $(element).parent().addClass("has-error");
                $(element).fadeOut(function() {
                    $(element).fadeIn();
                });

            },
            unhighlight: function(element) { // <-- fires when element is valid
                $(element).parent().removeClass("has-error").addClass('has-success');
            }
        });
    }
    function scoreboard(){
       $.ajax({
          url : '/'+ route_postfix + 'scoreboard_info',
          type : 'GET',
           success : function(scoreboard_table){
               $("#main").html(scoreboard_table);
               $("#sub").html("Scoreboard");
               var table = $("#scoreboard tbody");
               table.find('tr').each(function () {
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
                    post_login();
                },
                error : function(err){
                    toastr.error( err.status + " " + err.statusText,"Oops!");
                }

            });
        $("#register").click(function(){
            $.ajax({
                url : '/' + route_postfix +'register',
                type : 'GET',
                success : function(html){
                    $("#main").html(html);
                    post_register();
                },
                error : function(err){
                    toastr.error( err.status + " " + err.statusText,"Oops!");
                }

            });
        });
    }
    function load_admin(){
        $("#admin").click(function(){
            $.ajax({
                url : '/' + route_postfix +'admin',
                type : 'GET',
                success : function(html){
                    $("#main").addClass("fade-handel");
                    $("#main").html(html);
                    $("#sub").html("Admin");
                    exit();
                    codeforces_update();
                    log();
                    update_score();
                    user_update();
                    last_id();
                    new_user();
                },
                error : function(err){
                    toastr.error( err.status + " " + err.statusText,"Oops!");
                }
            });
        });}
    function log(){
        $("#log").click(function(){
            $.ajax({
                url : '/' + route_postfix +'admin',
                type : 'GET',
                success : function(html){
                    $("#main").addClass("fade-handel");
                    $("#main").html(html);
                    $("#sub").html("Admin");
                    exit();
                    codeforces_update();
                    update_score();
                    user_update();
                    last_id();
                    new_user();
                },
                error : function(err){
                    toastr.error( err.status + " " + err.statusText,"Oops!");
                }
            });
        });
    }
    function exit(){
        $("#logout").click(function(){
            $.ajax({
                url : '/' + route_postfix +'logout',
                type : 'GET',
                success : function(res){
                    console.log(res);
                    if(res){
                        window.location.replace('/' + route_postfix);
                    }
                },
                error : function(err){
                    toastr.error( err.status + " " + err.statusText,"Oops!");
                }
            });
        });
    }
    function codeforces_update(){
        $("#codeforces_update").click(function(){
            $.ajax({
                url : '/' + route_postfix +'codeforces_core',
                type : 'GET',
                success : function(res){
                    $("#main").html(res);
                    log();
                    exit();
                    update_score();
                    user_update();
                    last_id();
                    new_user();
                },
                error : function(err){
                    toastr.error( err.status + " " + err.statusText,"Oops!");
                }
            });
        });
    }
    function update_score(){
        $("#score_update").click(function(){
            $.ajax({
                url : '/' + route_postfix +'update_score',
                type : 'GET',
                success : function(html){
                    $("#main").html(html);
                    log();
                    exit();
                    codeforces_update();
                    user_update();
                    last_id();
                    new_user();
                },
                error : function(err){
                    toastr.error( err.status + " " + err.statusText,"Oops!");
                }
            });
        });
    }
    function user_update(){
        $("#user_update").click(function(){
            $.ajax({
                url : '/' + route_postfix +'user_update',
                type : 'GET',
                success : function(html){
                    $("#main").html(html);
                    log();
                    exit();
                    codeforces_update();
                    update_score();
                    last_id();
                    new_user();
                },
                error : function(err){
                    toastr.error( err.status + " " + err.statusText,"Oops!");
                }
            });
        });
    }
    function last_id(){
        $("#id_update").click(function(){
            $.ajax({
                url : '/' + route_postfix +'last_id_html',
                type : 'GET',
                success : function(html){
                    $("#main").html(html);
                    log();
                    exit();
                    codeforces_update();
                    update_score();
                    new_user();
                    $("#id_form").submit(function(event){
                        event.preventDefault();
                    });
                    $("#id_form_submit").click(function(){
                        var _id = $("#_last_id").val();
                        $.ajax({
                            url : '/' + route_postfix +'last_id' + '/' + _id,
                            type : 'GET',
                            success : function(htmlـ2){
                                $("#second_main").html(htmlـ2);
                            },
                            error : function(err){
                                toastr.error( err.status + " " + err.statusText,"Oops!");
                            }
                        });
                    });

                },
                error : function(err){
                    toastr.error( err.status + " " + err.statusText,"Oops!");
                }
            });
        });
    }
    function new_user(){
        $("#new_user").click(function(){
            $.ajax({
                url : '/' + route_postfix +'new_user',
                type : 'GET',
                success : function(html){
                    $("#main").html(html);
                    $('#user_verify').on('click','tr td :button:contains(Accept)',function(e){
                        var username = $(this).attr('id');
                        var tr = this;
                        username = username.split('_');
                        $.ajax({
                            url : '/' + route_postfix +'new_user',
                            type : 'Post',
                            data : {
                                result : "ok",
                                codeforces_username : username[1]
                            },
                            success : function(_res){
                                if(_res){
                                    $(tr).closest('tr').remove();
                                    toastr.success("User has been added to the scoreboard","Accepted!");

                                }
                                else{
                                    toastr.error("Looks Like there is problem","Oops!");
                                }
                            },
                            error : function(err){
                                toastr.error( err.status + " " + err.statusText,"Oops!");
                            }
                        });
                    });
                    $('#user_verify').on('click','tr td :button:contains(Reject)',function(e){
                        var username = $(this).attr('id');
                        var tr = this;
                        username = username.split('_');
                        $.ajax({
                            url : '/' + route_postfix +'new_user',
                            type : 'Post',
                            data : {
                                result : "delete",
                                codeforces_username : username[1]
                            },
                            success : function(_res){
                                if(_res){
                                    $(tr).closest('tr').remove();
                                    toastr.success("User has been deleted","Deleted!");

                                }
                                else{
                                    toastr.error("Looks Like there is problem","Oops!");
                                }
                            },
                            error : function(err){
                                toastr.error( err.status + " " + err.statusText,"Oops!");
                            }
                        });
                    });
                    log();
                    exit();
                    codeforces_update();
                    update_score();
                    last_id();
                    user_update();
                    new_user();
                },
                error : function(err){
                    toastr.error( err.status + " " + err.statusText,"Oops!");
                }
            });
        });
    }
    function load_navbar(admin){
        $.ajax({
            url : '/' + route_postfix +'navbar',
            type : 'GET',
            success : function(html){
                $("#nav").html(html);
                if(admin){
                    load_login();
                    load_admin();
                }
            },
            error : function(err){
                toastr.error( err.status + " " + err.statusText,"Oops!");
            }
        });
    }

    function load_everything(){
        load_navbar(true);
        scoreboard();
    }
    return{
        _load_login: load_everything
    };
})();
pc3._load_login();