var App = Ember.Application.create();

//Router
App.Router.map(function() {
	this.resource('bags', function() {
		this.resource('bag', {path:':bag_id'}); // '/#/bags/bag_id'
	});
});

App.ApplicationRoute = Ember.Route.extend({
	setupController: function() {
		this.controllerFor('food').set('model', App.Food.find());
	}
})

App.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('bags');
	}
});

App.BagsRoute = Ember.Route.extend ({
	model: function() {
		return App.Bag.find();
	}
});

//App.BagRoute = Ember.Route.extend ({
//	model: function(params) {
//		return App.Bag.find(params.table_id);
//	}
//});

//App.BagsController = Ember.ArrayController.extend();

//App.BagController = Ember.ObjectController.extend();

App.FoodController = Ember.ArrayController.extend({
	addFood: function(food) {
		var bag = this.controllerFor('bag').get('model'),
			tabItems = bag.get('tab.tabItems');
		tabItems.createRecord({
			food: food,
			cents: food.get('cents')
		});
	}
});

App.TabController = Ember.ObjectController.extend({
	sortProperties: ['id']
});

//View Helpers
Ember.Handlebars.registerBoundHelper('money', function(value) {
	return (value % 100 === 0 ?
			value / 100 + '.00' :
			parseInt(value / 100, 10) + '.' + value % 100);
});

// Models

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});

App.Bag = DS.Model.extend({
  tab: DS.belongsTo('App.Tab')
});

App.Tab = DS.Model.extend({
  tabItems: DS.hasMany('App.TabItem'),
  cents: function() {
	  return this.get('tabItems').getEach('cents').reduce(function(accum, item) {
	  	return accum + item;
	}, 0);
  }.property('tabItems.@each.cents')
});

App.TabItem = DS.Model.extend({
  cents: DS.attr('number'),
  food: DS.belongsTo('App.Food')
});

App.Food = DS.Model.extend({
  name: DS.attr('string'),
  imageUrl: DS.attr('string'),
  cents: DS.attr('number')
});

App.Bag.FIXTURES = [{
  id: 1,
  tab: 1
}, {
  id: 2,
  tab: 2
}, {
  id: 3,
  tab: 3
}, {
  id: 4,
  tab: 4
}, {
  id: 5,
  tab: 5
}, {
  id: 6,
  tab: 6
}];

App.Tab.FIXTURES = [{
  id: 1,
  tabItems: []
}, {
  id: 2,
  tabItems: []
}, {
  id: 3,
  tabItems: []
}, {
  id: 4,
  tabItems: []
//  tabItems: [400, 401, 402, 403, 404]
}, {
  id: 5,
  tabItems: []
}, {
  id: 6,
  tabItems: []
}];

App.TabItem.FIXTURES = [{
  id: 400,
  cents: 150,
  food: 1
}, {
  id: 401,
  cents: 300,
  food: 2
}, {
  id: 402,
  cents: 300,
  food: 3
}, {
  id: 403,
  cents: 250,
  food: 4
}, {
  id: 404,
  cents: 199,
  food: 5
}, {
  id: 405,
  cents: 200,
  food: 6
}];

App.Food.FIXTURES = [{
  id: 1,
  name: 'Beets',
  imageUrl: '',
  cents: 150
}, {
  id: 2,
  name: 'Kale',
  imageUrl: '',
  cents: 300
},  {
  id: 3,
  name: 'Potato',
  imageUrl: '',
  cents: 300
},{
  id: 4,
  name: 'Broccoli',
  imageUrl: '',
  cents: 250
}, {
  id: 5,
  name: 'Carrots',
  imageUrl: '',
  cents: 199
}, {
  id: 6,
  name: 'Squash',
  imageUrl: '',
  cents: 200
}];
