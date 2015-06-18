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
                }

                $cols.css('height', height);
            },
            reset: function(){
                $cols.css('height', 'auto');
            }
        };
    }();


    ssm.addState({
        id: 'mobile',
        query: '(max-width: 979px)',
        onEnter: function(){
            equalCols.reset();
        }
    });

    ssm.addState({
        id: 'desktop',
        query: '(min-width: 980px)',
        onEnter: function(){
            equalCols.setup();
        }
    });
}());