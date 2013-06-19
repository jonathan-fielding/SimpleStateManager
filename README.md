SimpleStateManager
==================

Simple State Manager (SSM for short) is a responsive state manager which allows you to target javascript at different browser widths.

##Add States
With Simple State Manager you can add multiple states based on your needs, the most simple way to add a state is to simply pass the information about your state to SSM using <code>ssm.addState</code>. It is important to remember that the <strong>width</strong> you provide is the upper limit of your responsive state width, the lower limit is defined simply by defining another state with a <strong>width</strong> which is lower.

ssm.addState({id: 'mobile', width: 767, onEnter: function(){console.log('enter mobile')}});
ssm.addState({width: 1023, onEnter: function(){console.log('enter tablet')}});
ssm.addState({width: 9999, onEnter: function(){console.log('enter desktop')}});

If you wish to use one command to add multiple states using one command you can use ssm.addStates to which you should pass an array of states.

ssm.addStates([{id: 'mobile', width: 767, onEnter: function(){console.log('enter mobile')}},{id: 'tablet',width: 1023, onEnter: function(){console.log('enter tablet')}},{id: 'desktop',width: 9999, onEnter: function(){console.log('enter desktop')}}]);

##Remove States

##Debug Mode

//Enable the SSM debug mode
ssm.enableDebug();

##Planned Features

Enable multiple methods to be attached to each state
Allow overlapping states so that JS can span multiple states

