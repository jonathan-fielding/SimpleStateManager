(function(){
	
	var browserState = {
		width: 1024,
		height: 800
	};

	//
	// Mock implementation of a Media Query List
	//

	function mediaQueryList(mediaQuery) {
		this.mediaQuery = mediaQuery;
		this.test = parseMediaQuery(mediaQuery);

		this.matches = testAgainstState(this.test);
	}

	mediaQueryList.prototype = {
		addListener: function(callback) {
			this.callback = callback;
		},

		removeListener: function(){
			
		},

		callback: null
	};

	//
	// We use the dispatcher to add 
	//

	function mediaQueryListDispatcher() {
		this.mqls = [];
	}

	mediaQueryListDispatcher.prototype = {
		add: function(mediaQuery) {
			var newMql = new mediaQueryList(mediaQuery);

			this.mqls.push(newMql);

			return newMql;
		},
		setTest: function(options) {
			browserState = {
				width: options.width || browserState.width,
				height: options.height || browserState.height
			};

			for (var i = this.mqls.length - 1; i >= 0; i--) {
                var list = this.mqls[i];
            }
		}
	};

	function parseMediaQuery(mediaQuery) {
		var expressions = mediaQuery.match(/\(min-width: [0-9]{0,5}px\)|\(max-width: [0-9]{0,5}px\)/g);
		var parsedArr = [];

		if(expressions) {
			for (var i = 0; i < expressions.length; i++) {
				var expression = expressions[i];
				var parsedItem = {
					minWidth: expression.match('min-width') ? true : false,
					maxWidth: expression.match('max-width') ? true : false,
					value: parseInt(mediaQuery.match(/[0-9]{1,5}/g) ? mediaQuery.match(/[0-9]{1,5}/g)[0] : 0)
				};

				parsedArr.push(parsedItem);
			}
		}

		return parsedArr;
	}

	function testAgainstState(tests) {
		for (var i = tests.length - 1; i >= 0; i--) {
			var test = tests[i];

			if (test.minWidth && browserState.width < test.value) {
				return false;
			}
			else if (test.maxWidth && browserState.width > test.value) {
				return false;
			}
		}

		return true;
	}

	dispatcher = new mediaQueryListDispatcher();

	window.matchMedia = dispatcher.add.bind(dispatcher);
	window.matchMedia.set = dispatcher.setTest.bind(dispatcher);

})(window);