(function() {
	'use strict';

	angular.module('app').controller('RegisterCtrl', RegisterCtrl);

	RegisterCtrl.$inject = ['$scope','$state','Auth'];

	function RegisterCtrl($scope, $state,  Auth) {
		$scope.error = false;

		$scope.register = function(form) {
			var user = {
				username : $scope.username,
				password : $scope.password,
				password2: $scope.password2,
				email: $scope.email
			}

			Auth.register(user)
			.success(function() {
				console.log('user registred successfully');
				$state.go('login');
			})
			.error(function() {
				$scope.error = true;
				$scope.errorMessage = 'Something went wrong';
			})

		}
	} 

})();