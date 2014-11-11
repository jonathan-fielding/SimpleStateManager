(function(){
    // This is simply an example of SSM, you wouldn't use it for changing a background color
    // but instead would use Media Queries for this. SSM is meant for javascript states where
    // your doing something you couldn't otherwise do with Media Queries.

    ssm.addState({
        id: 'mobile',
        maxWidth: 767,
        onEnter: function(){
            document.getElementById('hero').style.backgroundColor = "#003350";
        }
    });

    ssm.addState({
        id: 'tablet',
        minWidth: 768,
        maxWidth: 991,
        onEnter: function() {
            document.getElementById('hero').style.backgroundColor = "#00446a";
        }
    });

    ssm.addState({
        id: 'desktop',
        minWidth: 992,
        onEnter: function(){
            document.getElementById('hero').style.backgroundColor = "#07669c";
        }
    });

    ssm.ready();

    //Enable debug mode
    //document.body.appendChild(document.createElement('script')).src='http://www.simplestatemanager.com/bookmarklet/debugger.js';

    $.ajax({
        dataType: "json",
        url: "https://api.github.com/users/SimpleStateManager/repos?callback=?",
        success: function(data){
            var html = '';

            for (var i = 0; i < data.data.length; i++) {
                if(data.data[i].full_name !== "SimpleStateManager/SimpleStateManager"){
                    html += "<li><a href='"+data.data[i].html_url+"'>" + data.data[i].full_name + "</a> - " + data.data[i].description + "</li>";
                }
            }

            $('#plugins').html(html);
        }
    });
}());