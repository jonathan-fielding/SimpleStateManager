//The SimpleStateManager Debug Panel
//javascript:(function(){document.body.appendChild(document.createElement('script')).src='http://localhost:3000/bookmarklet/debugger.js';})();

;(function (window, document, undefined) {

	var initDebug = function(data){
		var	noPanels = data.panels.length,
			debugPanel = null,
			debugPanelNav = null,
			debugPanelContainer = null;

		//Create the debug panel
		debugPanel = document.createElement('div');
		debugPanel.id = "responsiveDebugger";
		debugPanel.innerHTML = data.debuggerHTML;
		document.body.appendChild(debugPanel);

		debugPanelNav = document.getElementById('rd_navItems');
		debugPanelContainer = document.getElementById('rd_panelContainer');

		//Create the panels

		for (var i = 0; i < noPanels; i++) {
			if(checkDependencies(data.panels[i].dependencies) === true){
				addPanel(debugPanelNav, debugPanelContainer, data.panels[i]);
			}
			
		};

		//Add the CSS
		addCSS(data.cssURL);

		browserResize();
	}

	var dependencies = {
		ssm: function(){
			if (typeof ssm !== 'undefined'){
				return true;
			}
			else{
				return false;
			}
		}()
	}

	var initPanels = {
		ssmStates: function(){
			console.log(ssm.getState());
		}
	};

	var checkDependencies = function(depends){
		var length = depends.length;

		for (var i = 0; i < length; i++) {
			if(dependencies[depends[i]] === false){
				return false;
			}
		};

		return true;
	};

	var addPanel = function(debugPanelNav, debugPanelContainer, panel){
		var newPanelMenuItem = document.createElement('li'),
		newPanelMenuItemAnchor = document.createElement('a'),
		newPanel = document.createElement('divs');

		//Add the menu item
		newPanelMenuItemAnchor.innerHTML = panel.name;
		newPanelMenuItemAnchor.href = "#"+panel.id;
		newPanelMenuItem.appendChild(newPanelMenuItemAnchor);
		debugPanelNav.appendChild(newPanelMenuItem);

		//Add the panel
		newPanel.innerHTML = panel.panelHTML;
		newPanel.id = panel.id;
		newPanel.className = "rd_DebugPanel";
		debugPanelContainer.appendChild(newPanel);
	};

	var addScript = function(url){
		document.body.appendChild(document.createElement('script')).src= url;
	};

	var addCSS = function(url){
		var	cssFile = document.createElement('link');
		cssFile.href = url;
		cssFile.rel = "stylesheet";
		cssFile.type = "text/css";
		document.head.appendChild(cssFile);	
	};

	var browserResize = function(){
		var browserWidth = getWidth(),
			elBrowserWidth = document.getElementById('rd_browserWidth');

		elBrowserWidth.innerHTML = browserWidth + 'px';
   	};

	var getWidth = function () {
        var x = 0;
        if (self.innerHeight) {
            x = self.innerWidth;
        } else if (document.documentElement && document.documentElement.clientHeight) {
            x = document.documentElement.clientWidth;
        } else if (document.body) {
            x = document.body.clientWidth;
        }
        return x;
    };

	//Add initialisation script and load templates
	window.rd = initDebug;
	addScript('http://localhost:3000/bookmarklet/templates.js');

	//TODO - Add debounce
	//Attach event
    if (window.attachEvent) {
        window.attachEvent('onresize', browserResize);
    } else if (window.addEventListener) {
        window.addEventListener('resize', browserResize, true);
    } else {
        //The browser does not support Javascript event binding
    }

}(window, document));