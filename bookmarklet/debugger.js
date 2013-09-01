//The SimpleStateManager Debug Panel
//javascript:(function(){document.body.appendChild(document.createElement('script')).src='http://localhost:3000/bookmarklet/debugger.js';})();

;(function (window, document, undefined) {

	var initDebug = function(data){
		var	noPanels = data.panels.length,
			debugPanel = null,
			debugPanelNav = null;

		//Create the debug panel
		debugPanel = document.createElement('div');
		debugPanel.id = "responsiveDebugger";
		debugPanel.innerHTML = data.debuggerHTML;
		document.body.appendChild(debugPanel);

		debugPanelNav = document.getElementById('rd_navItems');

		//Create the panels

		for (var i = 0; i < noPanels; i++) {
			addPanel(debugPanelNav, data.panels[i]);
		};

		//Add the CSS
		addCSS(data.cssURL);
	}

	var addPanel = function(debugPanelNav, panel){
		var newPanelMenuItem = document.createElement('li'),
		newPanelMenuItemAnchor = document.createElement('a');
		newPanelMenuItemAnchor.innerHTML = panel.name;

		newPanelMenuItem.appendChild(newPanelMenuItemAnchor);
		debugPanelNav.appendChild(newPanelMenuItem);
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

	//Add initialisation script
	window.rd = initDebug;
	addScript('http://localhost:3000/bookmarklet/templates.js');

}(window, document));