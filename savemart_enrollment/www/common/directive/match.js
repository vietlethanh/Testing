angular.module('MCMRelationshop.Directive.Match', [])
	.directive('match', ['$parse',
	function ($parse) {
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function (scope, elem, attrs, ctrl) {
				if (!ctrl) return;
				if (!attrs['match']) return;
				var firstPassword = $parse(attrs['match']);
				var validator = function (value) {
					var temp = firstPassword(scope),v;
					value = value || '';
					temp = temp || ''; 					
					v = value === temp;
					ctrl.$setValidity('match', v);
					return value;
				}
				ctrl.$parsers.unshift(validator);
				ctrl.$formatters.push(validator);
				attrs.$observe('match', function (confirmPassword) {
					validator(ctrl.$viewValue);
				});

			}
		}
	}
]);
