(function(){
	'use strict';
	var Configuration = Backbone.Model.extend({
		defaults : {
			baseURL : '',
			site : '',
			filePath : ''
		}
	});
	var Movie = Backbone.Model.extend({
		defaults : {
			title : '', // Movie's name
			description : '', // Movie's description
			rate : '', // Movie's rate
			poster : '', // Movie's poster
			wasSaw : '' // Was or not saw the movie
		}
	});

	var ListMovies = Backbone.Collection.extend({
		url_base : 'http://api.themoviedb.org/3/search/movie?api_key=c6445617d42ba37094ff06ac4923599a&?query=',
		url : '',
		model : Movie
	});

	var MovieViewResult = Backbone.View.extend({
		tagName : 'li',
		className : 'itemMovie',

		events : {
			'click .addMovie' : 'selectMovie',
			'click .viewCard' : 'viewCard'
		},

		render : function (item){
			$(this.el).append('<h1>'+this.model.get('title')+'</h1>');
		}
	});

	var listMoviesView = Backbone.Collection.extend({

	});

	var SearchView = Backbone.View.extend({
		el : $('body'),

		events : {
			'click #search' : 'searchMovies'
		},

		initialize : function(){
			var listMovies = new ListMovies();
			this.render();
		},

		render : function () {
			$(this.el).append('<input id="search" placeholder="Search movie"/>');
			return this;
		},

		searchMovies : function (e) {
			var value = $(e.currentTarget).val(),
			url_base = 'http://api.themoviedb.org/3/search/movie?api_key=c6445617d42ba37094ff06ac4923599a&?query=';

			var listMovies = new ListMovies();
			listMovies.set({
				url : url_base + this.value
			});
			console.log(listMovies);
			listMovies.fetch({
				success : function (arrayData) {
					arrayData.toJSON();
				}
			})
		}


	});
	var searchView = new SearchView();
})();