dojo.provide("ideapad.IdeaElement");
dojo.require("dijit.dijit");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("ideapad.IdeaElement",
	[dijit._Widget, dijit._Templated],
	{
		templatePath: dojo.moduleUrl("ideapad", "templates/IdeaElement.html"),
        itemId: null,
		
		constructor: function(){

		},

		postCreate: function(){
            this._parseItemId();
		},

        onEditClick: function(){
            this.toggle();
        },

        onDeleteClick: function(){
            this.deleteItem();
        },

        onDeleteError: function(){
            alert("An error ocurred while deleting.");
        },

        onDeleteSuccess: function(){
            this.destroy();
        },

        onFindIdeaDetailsSuccess: function(response, ioArgs){
            console.debug("success!", arguments);
            this.titleNode.value = response.idea.title;
            this.descriptionNode.value = response.idea.description;
        },

        onFindIdeaDetailsError: function(){
            alert("An error ocurred while trying to retrieve details");
        },

        onUpdateClicked: function(evt){
            dojo.xhrPost({
                content: { id: this.itemId },
                url: "/ideas/update",
                form: this.ideaFormNode,
                load: dojo.hitch(this, "onUpdateSuccess"),
                error: dojo.hitch(this, "onUpdateError"),
                handleAs: 'json'
            });
            dojo.stopEvent(evt);
        },

        onUpdateSuccess: function(response, ioArgs){
            this.contract();
            this.containerNode.innerHTML = response.idea.title;
        },

        onUpdateError: function(){
            alert("An error occurred while trying to update");
        },

        deleteItem: function(){
            dojo.xhrDelete({
                url: "/ideas/" + this.itemId,
                load: dojo.hitch(this, "onDeleteSuccess"),
                error: dojo.hitch(this, "onDeleteError")
            });
        },

        contract: function(){
            dojo.style(this.ideaFormNode, "display", "none");
        },

        expand: function(){
            dojo.style(this.ideaFormNode, "display", "block");
            this.findIdeaDetails();
        },

        findIdeaDetails: function(){
            dojo.xhrGet({
                url: "/ideas/show/" + this.itemId,
                load: dojo.hitch(this, "onFindIdeaDetailsSuccess"),
                handleAs: "json",
                error: dojo.hitch(this, "onFindIdeaDetailsError")
            });
        },

        toggle: function(){
            var displayStyle = dojo.style(this.ideaFormNode, "display");
            if (displayStyle == 'none'){
                this.expand();
            } else {
                this.contract();
            }
        },

        _parseItemId: function(){
            this.itemId = this.id.split("_")[1];
        }
	}
);