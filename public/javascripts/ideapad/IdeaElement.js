dojo.provide("ideapad.IdeaElement");
dojo.require("dijit.dijit");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("ideapad.IdeaElement",
	[dijit._Widget, dijit._Templated],
	{
		templatePath: dojo.moduleUrl("ideapad", "templates/IdeaElement.html"),
        itemId: null,
        isNew: false,

		constructor: function(args, node){
            if (args.isNew != null){
                this.isNew = args.isNew;
            }
		},

		postCreate: function(){
            this._parseItemId();
		},

        onCreateSuccess: function(response, ioArgs){
            this.contract();
            this.updateUI(response);
        },

        onCreateError: function(response, ioArgs){
            alert("An error occurred while trying to create");
        },

        onEditClick: function(){
            this.toggle();
        },

        onDeleteClick: function(){
            if (this.isNew){
                this.destroy();
            } else {
                this.deleteItem();
            }
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
            dojo.stopEvent(evt);
            if (this.isNew){
                this.createIdea();
            } else {
                this.updateIdea();
            }
        },

        onUpdateSuccess: function(response, ioArgs){
            this.contract();
            this.updateUI(response);
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
            if (!this.isNew){
                this.findIdeaDetails();
            }
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

        createIdea: function(){
            dojo.xhrPost({
                url: "/ideas/create",
                form: this.ideaFormNode,
                load: dojo.hitch(this, "onCreateSuccess"),
                error: dojo.hitch(this, "onCreateError"),
                handleAs: 'json'
            });
        },

        updateIdea: function(){
            dojo.xhrPost({
                content: { id: this.itemId },
                url: "/ideas/update",
                form: this.ideaFormNode,
                load: dojo.hitch(this, "onUpdateSuccess"),
                error: dojo.hitch(this, "onUpdateError"),
                handleAs: 'json'
            });
        },

        updateUI: function(response){
            var newId = "idea_" + response.idea.id;
            if (this.isNew){
                this.itemId = response.idea.id;
                this.domNode.id = "idea_" + response.idea.id;
                this.isNew = false;
            }
            this.containerNode.innerHTML = response.idea.title;
        },

        _parseItemId: function(){
            this.itemId = this.id.split("_")[1];
        }
	}
);