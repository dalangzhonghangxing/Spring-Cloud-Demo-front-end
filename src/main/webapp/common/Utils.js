(function() {
	"use strict";

	var Utils = angular.module('Utils', [ 'ngCookies', 'ngStorage' ]);

	Utils.config([ '$httpProvider', '$cookiesProvider', config ]);
	function config($httpProvider, $cookiesProvider) {
		$httpProvider.defaults.withCredentials = true;
		$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
		$httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

		$cookiesProvider.defaults.path = '/';
	}

	Utils.service('PathUtils', [ PathUtils ]);
	function PathUtils() {
		var vm = this;
		var SERVICE_API_ROOT = "http://localhost:8050/";

		vm.qualifiedAPIPath = qualifiedAPIPath;

		function qualifiedAPIPath(url) {
			return SERVICE_API_ROOT + url;
		}
	}
	
	Utils.service('LocalStorage', ['$localStorage', LocalStorage]);
    function LocalStorage($localStorage) {
        var vm = this;

        vm.setItem = setItem;
        vm.getItem = getItem;

        function setItem(key, value) {
            $localStorage[key] = value;
        }

        function getItem(key) {
            return $localStorage[key];
        }
    }
})();