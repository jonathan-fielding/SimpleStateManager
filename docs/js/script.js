(function(){
    // This is simply an example of SSM, you wouldn't use it for changing a background color
    // but instead would use Media Queries for this. SSM is meant for javascript states where
    // your doing something you couldn't otherwise do with Media Queries.

    ssm.addState({
        id: 'mobile',
        maxWidth: 767,
        onEnter: function(){
            document.getElementById('home').style.backgroundColor = "#daa23e";
        }
    });

    ssm.addState({
        id: 'tablet',
        minWidth: 768,
        maxWidth: 1023,
        onEnter: function(){
            document.getElementById('home').style.backgroundColor = "#f0b958";
        }
    });

    ssm.addState({
        id: 'desktop',
        minWidth: 1024,
        onEnter: function(){
            document.getElementById('home').style.backgroundColor = "#e8a631";
        }
    });

    ssm.ready();

    //Enable debug mode
    //document.body.appendChild(document.createElement('script')).src='http://localhost:3000/bookmarklet/debugger.js';
}());