(function(){

	'use strict';

	var api_key = 'api_key=c6445617d42ba37094ff06ac4923599a';
	var Configuration = Backbone.Model.extend({
		url: 'http://api.themoviedb.org/3/configuration?&api_key=c6445617d42ba37094ff06ac4923599a',
		defaults : {
			baseURL : '',
			site : '',
			filePath : ''
		}
	});

	var Movie = Backbone.Model.extend({
		defaults : {
			title : '', // Movie's name
			overview : '', // Movie's description
			userRate : '', // Movie's rate
			posterPath : '', // Movie's poster
			wasSaw :  false// Was or not saw the movie
		}
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
			return this;
		}
	});

	var ListMovies = Backbone.Collection.extend({
		url : 'http://api.themoviedb.org/3/search/movie',
		model : Movie,
		parse : function (response) {
			return response.results;
		}
	});

	var SearchView = Backbone.View.extend({
		el : $('body'),

		events : {
			'click #search' : 'searchMovies'
		},

		initialize : function(){
			this.listMovies = new ListMovies();
			this.listMovies.bind('add', this.appendResult);
			this.render();
		},

		render : function () {
			$(this.el).append('<input id="inputSearch" placeholder="Search movie"/> <input id="search" type="submit"  value="Search"/>');
			$(this.el).append('<ul></ul>');
			return this;
		},

		searchMovies : function (e) {
			var that = this;

			this.listMovies.url += '?' + api_key + '&query=' + $(this.el).find('#inputSearch').val();

			this.listMovies.fetch({
				success : function (objectData) {
					that.setMoviesList(objectData);
				}
			});
		},

		setMoviesList : function (objectData) {
			var results = objectData.toJSON(),
			that = this;

			_.each(results, function(val){
				var movie = new Movie({
					title : val.title,
					overview : val.overview,
					posterPath : val.poster_path
				});

				that.listMovies.add(movie);
			});
			console.log(this.listMovies.toJSON());
		},

		appendResult : function (item) {
			var itemMovie = new MovieViewResult({
				model : item
			});
			$('ul',this.el).append(itemMovie.render().el)
		}

	});

	var searchView = new SearchView();
})();