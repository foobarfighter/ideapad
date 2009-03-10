dependencies ={
	layers:	 [
		{
			name: "ideapad.js",
			dependencies: [
				"drails.common",
				"drails.monkey",
                "diji.dijit",
                "dijit.layout.ContentPane",
                "dijit.layout.TabContainer",
                "ideapad.IdeaElement"
			]
		}
	],
	prefixes: [
		[ 'ideapad', '../../ideapad' ],
		[ "dijit", "../dijit" ],		// Uncomment if you are using dijit
		//[ "dojox", "../dojox" ],		// Uncomment if you are using dojox modules
		[ "drails", "../drails" ]
	]
};