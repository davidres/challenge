(function(){

	'use strict';

	var CONFIG = {
		api_key : 'c6445617d42ba37094ff06ac4923599a',
		URL_MOVIES : 'http://api.themoviedb.org/3/search/movie',
		APP_CONTAINER : '.APP-CONTAINER'
	};

	var eventAggregator = _.extend({}, Backbone.Events);

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

		events : {
			'click .addMovie' : 'addMovie',
			'click .viewCard' : 'viewCard'
		},

		initialize : function () {
			this.template = Handlebars.compile($('#item-movie-tpl').html());
		},

		render : function () {
			$(this.el).append(this.template(this.model.toJSON()));
			return this;
		},

		viewCard : function () {
			var cardView = new CardView({
				model : this.model
			});

			$(CONFIG.APP_CONTAINER).empty().append(cardView.render().el);

			app.navigate('card');
		},

		addMovie : function () {
			console.log("ADD MV");
		}
	});

	var ListMovies = Backbone.Collection.extend({
		url : CONFIG.URL_MOVIES,

		model : Movie,

		parse : function (response) {
			return response.results;
		}
	});

	var SearchView = Backbone.View.extend({
		el : $(CONFIG.APP_CONTAINER),

		events : {
			'click #search' : 'searchMovies'
		},

		initialize : function(){
			this.template = Handlebars.compile($('#movie-search').html());
			this.listMovies = new ListMovies();
			this.listMovies.bind('add', this.appendResult);
			this.render();
		},

		render : function () {
			$(this.el).append(this.template());
			return this;
		},

		searchMovies : function (e) {
			var that = this;

			this.listMovies.url += '?api_key=' + CONFIG.api_key + '&query=' + $(this.el).find('#inputSearch').val();

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
		},

		appendResult : function (item) {
			var itemMovie = new MovieViewResult({
				model : item
			});

			$('.listMovies',this.el).append(itemMovie.render().el);
		}

	});
	
	var CardView = Backbone.View.extend({
		el : $(CONFIG.APP_CONTAINER),

		initialize : function () {
			this.template = Handlebars.compile($("#card-movie-tpl").html());
		},

		render : function () {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
	});

	var APP = Backbone.Router.extend({
		routes : {
			'' : 'home',
			'home': 'home',
			'search' : 'search',
			'card' : 'viewCard'
		},

		home : function () {
			var searchView = new SearchView();
		},

		viewCard : function (item) {
			var cardView = new CardView({
				model : item
			});
		}
	});

	var app = new APP();
	Backbone.history.start();
})();