rd({
	"cssURL"		: "http://localhost:3000/bookmarklet/debugger.css",
	"debuggerHTML"	: "<div id='rd_nav'><ul id='rd_navItems'><li><a href='#' id='rd_close'>Close</a></li></ul></div><div id='rd_panelContainer'></div><div id='rd_footer'><a href='#' id='rd_toggleSidebar' class='rd_pull_left'>Toggle Sidebar</a> <p class='rd_pull_right'>Browser width: <span id='rd_browserWidth'>0px</span></p></div>",
	"defaultPanel"	: "rd",
	"panels" : [
		{
			"id" 		: "overview",
			"name"		: "Overview",
			"panelHTML"	: "test",
			"init"			: "",
			"dependencies"	: []
		},
		{
			"id" 		: "generate",
			"name"		: "Media Queries",
			"panelHTML"	: "",
			"init"			: "",
			"dependencies"	: []
		},
		{
			"id" 			: "states",
			"name"			: "SSM States",
			"panelHTML"		: "",
			"init"			: "ssmStates",
			"dependencies"	: ["ssm"]
		}
	]
});