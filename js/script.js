(function(){
	ssm.enableDebug();
	ssm.addState({id: 'mobile', width: 767, onEnter: function(){console.log('enter mobile')}, onLeave: function(){console.log('leave mobile')}, onResize: function(){console.log('is mobile')}});
	ssm.addState({width: 1023, onEnter: function(){console.log('enter tablet')}, onLeave: function(){console.log('leave tablet')},onResize: function(){console.log('is tablet')}});
	ssm.addState({width: 9999, onEnter: function(){console.log('enter desktop')}, onLeave: function(){console.log('leave desktop')}, onResize: function(){console.log('is desktop')}});
}());