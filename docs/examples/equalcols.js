(function(){
    var equalCols = function(){
        var $cols = $('.col'),
            colCount = $cols.length;

        return {
            setup: function(){
                var height = 0, tempHeight = 0;
                for (var i = 0; i < colCount; i++) {
                    tempHeight = $cols.eq(i).height();

                    if(tempHeight > height){
                        height = tempHeight;
                    }
                };
                 $cols.css('height', height)
            },
            reset: function(){
                $cols.css('height', 'auto')
            }
        }
    }();


    ssm.addState({
        id: 'mobile',
        maxWidth: 979,
        onEnter: function(){
            equalCols.reset();
        }
    });

    ssm.addState({
        id: 'desktop',
        minWidth: 980,
        onEnter: function(){
            equalCols.setup();
        }
    });

    ssm.ready();
}());