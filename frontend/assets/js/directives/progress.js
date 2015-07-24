module.exports = function myProgress() {

    return {
        restrict: 'AC',
        template: '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" ng-transclude></div></div>',
        replace: true,
        transclude: true,
        link: function (scope, element, attrs) {
            //var value = scope.$eval(attrs.myProgress);
            var progressbar = angular.element(element.find('div')[0]);

            scope.$watch(attrs.myProgress, function (newValue) {
                if (!angular.isNumber(newValue) || isNaN(newValue)) {
                    newValue = 0;
                }
                progressbar
                    .css('width', newValue + '%')
                    .attr('aria-valuenow', parseInt(newValue));

            });

        }
    }
};