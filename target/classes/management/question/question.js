(function() {
	var ManagementApp = angular.module('ManagementApp');
	
	ManagementApp.controller("QuestionCtrl", [ '$uibModal','Connection', 'PathUtils', QuestionCtrl]);

	function QuestionCtrl($uibModal,Connection, PathUtils) {
		var vm = this;

		vm.totalItems = 0;
		vm.currentPage = 0;
		vm.numPerPage = 15;
		vm.maxSize = 7;

		vm.pageChange = pageChange;
		vm.deleteItem = deleteItem;
		vm.addQuestionModel = addQuestionModel;

		init();

		function init() {
			pageChange();
		}

		function pageChange() {
			getQuestion();
		}
		
		function addQuestionModel(i){
			$uibModal.open({
                animation: true,
                templateUrl: 'examHandler.html',
                controller: 'ExamCtrl',
                controllerAs: 'examCtrl',
                resolve: {
                    sc: vm,
                    index:i
                }
            });
		}

		function deleteItem(id) {
			var params = {
				'id' : id,
				'currentPage' : vm.currentPage,
				'numPerPage' : vm.numPerPage
			};

			Connection.delete("test/question", params, function(res) {
				vm.items = res.content;
				vm.totalItems = res.totalElements;
			});
		}

		function getQuestion() {
			var params = {
				'currentPage' : vm.currentPage,
				'numPerPage' : vm.numPerPage
			};

			Connection.get("test/questions", params, function(res) {
				vm.items = res.content;
				vm.totalItems = res.totalElements;
			});
		}
	}
	
	ManagementApp.controller("ExamCtrl", [ '$uibModalInstance','Connection', 'PathUtils','sc','index',
	                                       ExamCtrl]);
	function ExamCtrl($uibModalInstance,Connection,PathUtils,sc,index){
		var vm = this;
		
		vm.item = {};
		
		vm.submit = submit;
		vm.cancel = cancel;
		
		init();
		
		function init(){
			if(index != -1)
				vm.item=angular.copy(sc.items[index]);
		}
		function submit(){
			vm.item.A = vm.item.a;
			vm.item.B = vm.item.b;
			vm.item.C = vm.item.c;
			vm.item.D = vm.item.d;
			if(index == -1){
				var params={
					"question":vm.item,
					'currentPage' : sc.currentPage,
					'numPerPage' : sc.numPerPage
				};
				Connection.post("test/question",params,function (res){
					sc.items = res.content;
					sc.totalItems = res.totalElements;
				});
			}else{
				var params={
						"question":vm.item,
						'currentPage' : sc.currentPage,
						'numPerPage' : sc.numPerPage
					};
					Connection.put("test/question",params,function (res){
						sc.items[index] = vm.item;
					});
			}
			cancel();
		}
		
		function cancel(){
			$uibModalInstance.dismiss('cancel');
		}
		
	}
})();