(function(){
    ssm.addState({
        id: 'mobile',
        maxWidth: 767,
        onEnter: function(){
            document.body.style.backgroundColor = "#aaa";
        }
    });

    ssm.addState({
        id: 'tablet',
        minWidth: 768,
        maxWidth: 1023,
        onEnter: function(){
            document.body.style.backgroundColor = "#ddd";
        }
    });

    ssm.addState({
        id: 'desktop',
        minWidth: 1024,
        onEnter: function(){
            document.body.style.backgroundColor = "#fff";
        }
    });

    ssm.ready();
}());