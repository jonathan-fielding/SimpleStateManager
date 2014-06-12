# Simple State Manager 2.2.5

[![Build Status](https://travis-ci.org/SimpleStateManager/SimpleStateManager.png?branch=master)](https://travis-ci.org/SimpleStateManager/SimpleStateManager) [![Code Climate](https://codeclimate.com/github/SimpleStateManager/SimpleStateManager.png)](https://codeclimate.com/github/SimpleStateManager/SimpleStateManager)

Simple State Manager (SSM for short) is a javascript state manager for responsive websites. It is built to be light weight, has no dependencies (except javascript of course) and aims to be really easy to simply drop into your project ready to use.

As a state manager, SSM allows you to target different javascript towards different states of your site. It allows you to define as many states as your site requires and allows you to have independent Enter, Leave and Resize events for each of the states.

##Getting started

To get started with SSM the first step is to include it in your project, you can do this in two ways

* Download and add the ssm.js (or ssm.min.js) file to your site
* Use Bower to add to your project using bower install SimpleStateManager

##Documentation
Documentation can be found at http://www.simplestatemanager.com

##Release Log


###2.2.5 - June 12, 2014
* Fixed issue where it didnt work when you zoom the browser

###2.2.4 - March 12, 2014
* Fixed issue where respond.js would trick SimpleStateManager into thinking the matchMedia API was fully supported.

###2.2.3 - February 14, 2014
* Fixed issue where the width of the browser would not always match the media query

###2.2.2 - February 12, 2014
* Fixed issue where config options were required otherwise there would be an error

###2.2.1 - January 31, 2014
* Fixed build issue

###2.2.0 - January 29, 2014
* Added ssm.isActive to allow us to test if a state is active

###2.1.0 - December 23, 2013
* Added config option API which allows you to add your own SimpleStateManager config options along with the test to see if they are valid
* Rewrote how testing of minWidth and maxWidth is handled to use the new config option API
* Added new unit tests to improve code coverage

###2.0.3 - October 7, 2013
* Fixed issue where browser width was not updated correctly

###2.0.2 - September 26, 2013
* Fixed issue where leave events fired incorrectly

###2.0.1 - September 18, 2013
* Fixed issue where ssm.js could not be placed in the head of the document

###2.0.0 - September 13, 2013
* Major API changes to all states mangement methods, please read through the new API documention if upgrading
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

###1.1.0 - August 9, 2013
* Added .removeAllStates method

###1.0.2 - August 6, 2013
* AMD Support
* Replaced Debounce with timeout
* New Site

###1.0.1 - June 24, 2013
* Added Debounce to SSM (Thanks Kevin)

###1.0.0 - June 22, 2013
* Initial release

## Planned Features

* Improve documentation

## License

License: MIT (http://www.opensource.org/licenses/mit-license.php)
