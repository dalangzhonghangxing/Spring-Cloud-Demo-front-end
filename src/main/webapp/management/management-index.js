(function() {
	var ManagementApp = angular.module('ManagementApp', [ 'Utils', 'ngRoute','ui.bootstrap', 'ngAnimate' ]);
	ManagementApp.config([ '$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl : 'question/question.html'
		}).when('question.html',{
			templateUrl : 'question/question.html'
		});
	} ]);
})();