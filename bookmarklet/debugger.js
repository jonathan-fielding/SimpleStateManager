//The SimpleStateManager Debug Panel
//javascript:(function(){document.body.appendChild(document.createElement('script')).src='http://www.simplestatemanager.com/bookmarklet/debugger.js';})();

;(function (window, document, undefined) {

	//polyfill
	if (!document.getElementsByClassName) {
		document.getElementsByClassName = function(search) {
			var d = document, elements, pattern, i, results = [];
			if (d.querySelectorAll) { // IE8
				return d.querySelectorAll("." + search);
			}
			if (d.evaluate) { // IE6, IE7
				pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
				elements = d.evaluate(pattern, d, null, 0, null);
				while ((i = elements.iterateNext())) {
					results.push(i);
				}
			} else {
				elements = d.getElementsByTagName("*");
				pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
				for (i = 0; i < elements.length; i++) {
					if ( pattern.test(elements[i].className) ) {
						results.push(elements[i]);
					}
				}
			}
			return results;
		}
	}

	var initDebug = function(data){
		var	noPanels = data.panels.length,
			debugPanel = null,
			debugPanelNav = null,
			debugPanelContainer = null

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
				addPanel(debugPanelNav, debugPanelContainer, data.panels[i],i);
				
				if(data.panels[i].init !== ''){
					initPanels[data.panels[i].init]();
				}
				
			}
		}

		addEvent(document.getElementById('rd_navItems'), "click", function(e) {
			// Firefox and IE access the target element different. e.target, and event.srcElement, respectively.
			var target = e ? e.target : window.event.srcElement
				targetTab = null,
				panels = document.getElementsByClassName('rd_DebugPanel'),
				panelCount = panels.length;
			
			globTarget = target;

			if ( target.nodeName.toLowerCase() === 'a' ) {
				if(target.id === "rd_close"){
					document.getElementById('responsiveDebugger').style.display = "none";
				}
				else{
					targetTab = document.getElementById(target.getAttribute('href').replace('#',''));
					for (var i = 0; i < panelCount; i++) {
						panels[i].style.display = "none";
					};
					targetTab.style.display = "block";
				}
				
			}

			console.log(e);

			return false;
		});

		//Add the CSS
		addCSS(data.cssURL);

		browserResize();
	};

	var dependencies = {
		ssm: function(){
			if (typeof ssm !== 'undefined'){
				return true;
			}
			else{
				return false;
			}
		}()
	};

	var initPanels = {
		overview: function(){

		},
		ssmStates: function(){
			var ssmStates = ssm.getStates(),
				stateCount = ssmStates.length,
				panel = document.getElementById('rd_states'), 
				panelHTML = '<ul>';

			for (var i = 0; i < stateCount; i++) {
				panelHTML += "<li>";
				panelHTML += "<h2>" + ssmStates[i].id +"</h2>";
				panelHTML += "<p>minWidth : " + ssmStates[i].minWidth +"</p>";
				panelHTML += "<p>maxWidth : " + ssmStates[i].maxWidth +"</p>";
				panelHTML += "</li>";
			};

			panelHTML += '</ul>'

			document.getElementById('rd_states').innerHTML = panelHTML;
		}
	};

	var addEvent = function(obj, evt, fn, capture) {  
        if ( window.attachEvent ) {  
            obj.attachEvent("on" + evt, fn);  
        }  
        else {  
            if ( !capture ) capture = false; // capture  
            obj.addEventListener(evt, fn, capture);
        }  
    }  

	var checkDependencies = function(depends){
		var length = depends.length;

		for (var i = 0; i < length; i++) {
			if(dependencies[depends[i]] === false){
				return false;
			}
		};

		return true;
	};

	var addPanel = function(debugPanelNav, debugPanelContainer, panel,i){
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
		if(i !== 0){
			newPanel.style.display = "none";
		}
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