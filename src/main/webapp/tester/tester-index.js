(function() {
	var TesterApp = angular.module('TesterApp', [ 'Utils', 'ngRoute',
			'ui.bootstrap', 'ngAnimate' ]);

	TesterApp.controller('QuestionSettingCtrl', [ 'Connection', 'LocalStorage',
			QuestionSettingCtrl ]);

	function QuestionSettingCtrl(Connection, LocalStorage) {
		var vm = this;

		vm.answer = new Array(30);

		vm.submit = submit;

		init();

		function init() {
			getQuestion();
		}

		function getQuestion() {
			var id = LocalStorage.getItem("id");

			var params = {
				"id" : id
			};

			Connection.get("/test/test-questions", params, function(res) {
				vm.items = res.questions;
			})
		}

		function submit() {
			var id = LocalStorage.getItem("id");
			var params = {
				"id" : id,
				"answer" : vm.answer
			};

			Connection.post("/test/submit", params, function(res) {
				alert("您做对了"+res.corrects+"题!");
			})
		}
	}
})();