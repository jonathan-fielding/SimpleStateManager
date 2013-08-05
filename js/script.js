(function(){
	//Uncomment this line to enable debug
	//ssm.enableDebug();
	ssm.addState({id: 'mobile', width: 767, onEnter: function(){document.body.style.backgroundColor = "#ddd"}});
	ssm.addState({width: 1023, onEnter: function(){document.body.style.backgroundColor = "#eee"}});
	ssm.addState({width: 9999, onEnter: function(){document.body.style.backgroundColor = "#fff"}}).ready();;
}());