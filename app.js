var mediaModel = {
	// action to be called when "next page" is clicked
	media: ko.observableArray(data),
	pageSize: ko.observable(5),
	pageCurrent: ko.observable(0),
	maxPage: function() {
		return Math.ceil(this.media().length / this.pageSize());
	},
	pageCount: function() {
		// set the user-friendly page count
		return (this.pageCurrent() + 1) + " of " + this.maxPage();
	},
	nextPage: function() {
		// action to be called when "next page" is clicked
		if((this.pageCurrent() + 1) < this.maxPage()) {
			this.pageCurrent(this.pageCurrent() + 1);
		}
	},
	previousPage: function() {
		// action to be called when "previous page" is clicked
		if(this.pageCurrent() >= 1) {
			this.pageCurrent(this.pageCurrent() - 1);
		}
	}
};

// convert things to a number, and reset page count
// when selecting a new page size
mediaModel.pageSize.subscribe(function(newValue){
   if(typeof newValue === "string"){
       mediaModel.pageSize(parseInt(newValue));
   }
   mediaModel.pageCurrent(0);
}, mediaModel);

// output the current page of items
mediaModel.pagedGrid = ko.dependentObservable(function() {
	var size = this.pageSize();
	var start = this.pageCurrent() * size;
	return this.media.slice(start, start + size);
}, mediaModel);

ko.applyBindings(mediaModel);