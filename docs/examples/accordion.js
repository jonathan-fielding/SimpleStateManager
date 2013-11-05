(function(){
    // This is simply an example of SSM, you wouldn't use it for changing a background color
    // but instead would use Media Queries for this. SSM is meant for javascript states where
    // your doing something you couldn't otherwise do with Media Queries.

    ssm.addState({
        id: 'mobile',
        maxWidth: 767,
        onEnter: function(){
            var $items = $('.items');
            $items.addClass('mobile-accordion');
            $items.find('h2').next().hide();
        },
        onLeave: function(){
            var $items = $('.items');
            $items.removeClass('mobile-accordion');
            $items.find('h2').next().show();
        }
    });

    ssm.ready();

    $('body').on('click', '.mobile-accordion h2', function(){
        $(this).next().toggle();
    });
}());