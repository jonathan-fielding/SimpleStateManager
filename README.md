# Simple State Manager

[![Build Status](https://travis-ci.org/jonathan-fielding/SimpleStateManager.png?branch=master)](https://travis-ci.org/jonathan-fielding/SimpleStateManager)

Simple State Manager (SSM for short) is a javascript state manager for responsive websites. It is built to be light weight, has no dependencies (except javascript of course) and aims to be really easy to simply drop into your project ready to use.

As a state manager, SSM allows you to target different javascript towards different states of your site. It allows you to define as many states as your site requires and allows you to have independent Enter, Leave and Resize events for each of the states.

##Getting started

To get started with SSM the first step is to include it in your project, you can do this in two ways

* Download and add the ssm.js (or ssm.min.js) file to your site
* Use Bower to add to your project using bower install SimpleStateManager

##Documentation
Documentation can be found at http://www.simplestatemanager.com

##Release Log

###2.0.0 - September 13, 2013
* Ability to overlap your states
* Debug mode removed - replaced with a new debug tool (currently early alpha) which will continue to be expanded to allow better responsive debugging
* Define min-width and max-width values for each state
* Easier to extend SSM (it is now encouraged)

###1.3.0 - August 10, 2013
* Added .removeStates method
* Added unit tests using QUnit
* Integrated Travis CI

###1.2.0 - August 9, 2013
* Added .getState method

###.1.0 - August 9, 2013
* Added .removeAllStates method

###1.0.2 - August 6, 2013
* AMD Support
* Replaced Debounce with timeout
* New Site

###1.0.1 - Jun 24, 2013
* Added Debounce to SSM (Thanks Kevin)

###1.0.0 - Jun 22, 2013
* Initial release

## Planned Features

* Enable multiple methods to be attached to each state

* Allow overlapping states so that JS can span multiple states

## License

License: MIT (http://www.opensource.org/licenses/mit-license.php)
