(function(){
    // This is simply an example of SSM, you wouldn't use it for changing a background color
    // but instead would use Media Queries for this. SSM is meant for javascript states where
    // your doing something you couldn't otherwise do with Media Queries.

    ssm.addState({
        id: 'mobile',
        query: '(max-width: 767px)',
        onEnter: function(){
            document.getElementById('hero').style.backgroundColor = "#3f0071";
        }
    });

    ssm.addState({
        id: 'tablet',
        query: '(min-width: 768px) and (max-width: 991px)',
        onEnter: function() {
            document.getElementById('hero').style.backgroundColor = "#652995";
        }
    });

    ssm.addState({
        id: 'desktop',
        query: '(min-width: 992px)',
        onEnter: function(){
            document.getElementById('hero').style.backgroundColor = "#663399";
        }
    });

    //Enable debug mode
    //document.body.appendChild(document.createElement('script')).src='http://www.simplestatemanager.com/bookmarklet/debugger.js';

    $.ajax({
        dataType: "json",
        url: "https://api.github.com/users/SimpleStateManager/repos?callback=?",
        success: function(data){
            var html = '';
            var name = "";

            for (var i = 0; i < data.data.length; i++) {
                name = data.data[i].full_name;

                if(name !== "SimpleStateManager/SimpleStateManager" && name !== "SimpleStateManager/SSM-Site" && name !== "SimpleStateManager/SimpleStateManager-Snippets" && name !== "SimpleStateManager/SSM-for-dart"){
                    html += "<li><a href='"+data.data[i].html_url+"'>" + data.data[i].full_name + "</a> - " + data.data[i].description + "</li>";
                }
            }

            $('#plugins').html(html);
        }
    });
}());