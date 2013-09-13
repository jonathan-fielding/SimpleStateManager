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

		Gator(document.getElementById('rd_navItems')).on("click", 'a', function(e) {
			// // Firefox and IE access the target element different. e.target, and event.srcElement, respectively.
			var target = this,
				targetTab = null,
				panels = document.getElementsByClassName('rd_DebugPanel'),
				panelCount = panels.length;

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
				panelHTML += "<h2>id: " + ssmStates[i].id +"</h2>";
				panelHTML += "<p>minWidth : " + ssmStates[i].minWidth +"</p>";
				panelHTML += "<p>maxWidth : " + ssmStates[i].maxWidth +"</p>";
				panelHTML += "<p>onEnter : " + ssmStates[i].onEnter +"</p>";
				panelHTML += "<p>onLeave : " + ssmStates[i].onLeave +"</p>";
				panelHTML += "<p>onResize : " + ssmStates[i].onResize +"</p>";
				panelHTML += "</li>";
			};

			panelHTML += '</ul>'

			document.getElementById('rd_states').innerHTML = panelHTML;
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


//Gator
/* gator v1.2.2 craig.is/riding/gators */
(function(){function q(a,b,c){if("_root"==b)return c;if(a!==c){var d;k||(a.matches&&(k=a.matches),a.webkitMatchesSelector&&(k=a.webkitMatchesSelector),a.mozMatchesSelector&&(k=a.mozMatchesSelector),a.msMatchesSelector&&(k=a.msMatchesSelector),a.oMatchesSelector&&(k=a.oMatchesSelector),k||(k=e.matchesSelector));d=k;if(d.call(a,b))return a;if(a.parentNode)return m++,q(a.parentNode,b,c)}}function s(a,b,c,e){d[a.id]||(d[a.id]={});d[a.id][b]||(d[a.id][b]={});d[a.id][b][c]||(d[a.id][b][c]=[]);d[a.id][b][c].push(e)}
function t(a,b,c,e){if(d[a.id])if(!b)for(var f in d[a.id])d[a.id].hasOwnProperty(f)&&(d[a.id][f]={});else if(!e&&!c)d[a.id][b]={};else if(!e)delete d[a.id][b][c];else if(d[a.id][b][c])for(f=0;f<d[a.id][b][c].length;f++)if(d[a.id][b][c][f]===e){d[a.id][b][c].splice(f,1);break}}function u(a,b,c){if(d[a][c]){var k=b.target||b.srcElement,f,g,h={},n=g=0;m=0;for(f in d[a][c])d[a][c].hasOwnProperty(f)&&(g=q(k,f,l[a].element))&&e.matchesEvent(c,l[a].element,g,"_root"==f,b)&&(m++,d[a][c][f].match=g,h[m]=d[a][c][f]);
b.stopPropagation=function(){b.cancelBubble=!0};for(g=0;g<=m;g++)if(h[g])for(n=0;n<h[g].length;n++){if(!1===h[g][n].call(h[g].match,b)){e.cancel(b);return}if(b.cancelBubble)return}}}function r(a,b,c,k){function f(a){return function(b){u(g,b,a)}}if(this.element){a instanceof Array||(a=[a]);c||"function"!=typeof b||(c=b,b="_root");var g=this.id,h;for(h=0;h<a.length;h++)k?t(this,a[h],b,c):(d[g]&&d[g][a[h]]||e.addEvent(this,a[h],f(a[h])),s(this,a[h],b,c));return this}}function e(a,b){if(!(this instanceof
e)){for(var c in l)if(l[c].element===a)return l[c];p++;l[p]=new e(a,p);return l[p]}this.element=a;this.id=b}var k,m=0,p=0,d={},l={};e.prototype.on=function(a,b,c){return r.call(this,a,b,c)};e.prototype.off=function(a,b,c){return r.call(this,a,b,c,!0)};e.matchesSelector=function(){};e.cancel=function(a){a.preventDefault();a.stopPropagation()};e.addEvent=function(a,b,c){a.element.addEventListener(b,c,"blur"==b||"focus"==b)};e.matchesEvent=function(){return!0};window.Gator=e})();
