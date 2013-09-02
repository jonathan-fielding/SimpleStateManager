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
			addPanel(debugPanelNav, debugPanelContainer, data.panels[i]);
		};

		//Add the CSS
		addCSS(data.cssURL);
	}

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

	//Add initialisation script
	window.rd = initDebug;
	addScript('http://localhost:3000/bookmarklet/templates.js');

}(window, document));