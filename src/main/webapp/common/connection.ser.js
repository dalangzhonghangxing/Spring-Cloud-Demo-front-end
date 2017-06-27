(function(){
	"use strict";
	
	var Utils = angular.module('Utils');
	Utils.service('Connection',['$http','PathUtils',Connection]);
	
	function Connection($http,PathUtils){
		var conn = {};
        var vm = {};
        conn.errorHandler = errorHandler;
        conn.post = post;
        conn.get = get;
        conn.delete = deleteImpl;
        conn.patch = patch;
        conn.put = put;
        conn.postByBody = postByBody;

        return conn;

        function invoke(method, args) {
            var url = args[0];
            var httpCfg = args[1];
            var callback = args[2];
            httpCfg["url"] = PathUtils.qualifiedAPIPath(url);
            httpCfg["method"] = method;
            if (args.length > 3) {
                var additionalCfg = args[3];
                for (var fieldName in additionalCfg) {
                    httpCfg[fieldName] = additionalCfg[fieldName];
                }
            }
            $http(httpCfg).success(function (response) {
                callback(response);
            }).error(conn.errorHandler);
        }

        function post(url, params, callback) {
            arguments[1] = {
                params: params
            };
            invoke("post", arguments)
        }

        function postByBody(url, params, callback) {
            arguments[1] = {
                data: params
            };
            invoke("post", arguments)
        }

        function get(url, params, callback) {
            arguments[1] = {
                params: params
            };
            invoke("get", arguments)
        }

        function putByRequestBody(url, params, callback) {
            arguments[1] = {
                data: params
            };
            invoke("put", arguments)
        }

        function put(url, params, callback) {
            arguments[1] = {
                params: params
            };
            invoke("put", arguments)
        }

        function deleteImpl(url, params, callback) {
            arguments[1] = {
                params: params
            };
            invoke("delete", arguments)
        }

        function patch(url, params, callback) {
            arguments[1] = {
                data: params
            };
            invoke("patch", arguments)
        }
        
        function errorHandler(){
        	alert("出错啦！")
        }
	}
})();