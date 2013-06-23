# Simple State Manager

Simple State Manager (SSM for short) is a responsive state manager which
allows you to target javascript at different browser widths.

## Add States

With Simple State Manager you can add multiple states based on your needs, the
most simple way to add a state is to simply pass the information about your
state to SSM using `ssm.addState`. It is important to remember that the
**width** you provide is the upper limit of your responsive state width, the
lower limit is defined simply by defining another state with a **width** which
is lower.

    
    
    ssm.addState({id: 'mobile', width: 767, onEnter: function(){console.log('enter mobile')}});
    ssm.addState({width: 1023, onEnter: function(){console.log('enter tablet')}});
    ssm.addState({width: 9999, onEnter: function(){console.log('enter desktop')}});
    

If you wish to use one command to add multiple states using one command you
can use ssm.addStates to which you should pass an array of states.

    
    
    ssm.addStates([
        {id: 'mobile', width: 767, onEnter: function(){console.log('enter mobile')}},
        {id: 'tablet',width: 1023, onEnter: function(){console.log('enter tablet')}},
        {id: 'desktop',width: 9999, onEnter: function(){console.log('enter desktop')}}
    ]);
    

## Remove States

Sometimes it may be necessary to remove a state, if we have the **id** for the
state we can easily remove the state, to remove the mobile state from our
above example we simply use:

    
    
    ssm.removeState('mobile');
    

## Ready

Once you have finished setting up your states you should run `ssm.ready()`
which will setup the states.

    
    
    ssm.ready()
    

As SSM is chaninable you can even fire the `ssm.ready()` method by simply
adding `.ready()` onto your original command

    
    
    ssm.addStates([
        {id: 'mobile', width: 767, onEnter: function(){console.log('enter mobile')}},
        {id: 'tablet',width: 1023, onEnter: function(){console.log('enter tablet')}},
        {id: 'desktop',width: 9999, onEnter: function(){console.log('enter desktop')}}
    ]).ready();
    

## Debug Mode

To enable the debug mode you simply need to run `ssm.enableDebug()`, this will
add a width meter to the bottom right corner of the viewport area.

    
    
    ssm.enableDebug();
    

## Full API

Method Description

ssm.addState

Add a new state, expects an object literal, properties avaliable - id
(optional), width (required), onEnter (optional), onResize (optional), onLeave
(optional)

ssm.addStates

Add multiple new states, expects an array of object literals, properties
avaliable - id (optional), width (required), onEnter (optional), onResize
(optional), onLeave (optional)

ssm.removeState

Remove a state, expects one property, the id of the state to be removed.

ssm.ready

Tells the page that states have been added and we can fire the onEnter event
for the current state.

ssm.enableDebug

Enables a debug mode which shows a width meter to the corner of the page.

## Browser Support

There are a number of browsers that we have tested support, as we test more
browsers we will update this list

  * Chrome
  * Firefox
  * Internet Explorer 8+ (6 & 7 are untested)
  * Safari
  * Opera

## Planned Features

Enable multiple methods to be attached to each state

Allow overlapping states so that JS can span multiple states
