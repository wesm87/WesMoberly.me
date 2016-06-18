import Ember            from 'ember';
import Resolver         from './resolver';
import config           from './config/environment';
import loadInitializers from 'ember-load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

const App = Ember.Application.extend({
	Resolver,
	modulePrefix:    config.modulePrefix,
	podModulePrefix: config.podModulePrefix,
	LOG_TRANSITIONS: true,
});

loadInitializers( App, config.modulePrefix );

export default App;
