/**
 * Created by Danial Vafadar on 7/20/15.
 */
//todo : add error should handle with toaster
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
    function post_login(){
        $("#submit").click(function(e){
            $("#login").submit(function(e){
                e.preventDefault();
            });
            var _data = {};
            _data.username = $("#username").val();
            $.ajax({
                url : '/login',
                type : 'POST',
                data : _data,
                success : function(res){
                    if(res){
                        if(_data.username == "tourist")
                            toastr.success('Tourist  logged in :)','WooW');
                        else toastr.success('YES');
                    }
                    else{
                        console.log("NO");
                        toastr.error('NO');
                    }
                },
                error : function(err){
                    toastr.error('Looks like the server is Down','Opps : ');
                }
            });
        });
    }
   function load_login(){
       $.ajax({
          url : '/login',
          type : 'GET',
           success : function(login){
                   $("#main").html(login);
                   $("#sub").html("Login");
                   post_login();
           },
           error : function(err){
               throw err;
           }

       });
   }
    function load_navbar(){
        $.ajax({
            url : '/navbar',
           type : 'GET',
            success : function(html){
                $("#nav").html(html);
            },
            error : function(err){
                console.log(err);
            }

        });
    }
    function load_everything(){
        load_login();
        load_navbar();
    }
    return{
        _load_login: load_everything
    };
})();
pc3._load_login();