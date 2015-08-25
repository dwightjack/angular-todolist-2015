import progressTemplate from './progress.html';

function myProgress() {

    return {
        restrict: 'EA',
        replace: true,
        template: progressTemplate,
        transclude: true,
        scope: {
            perc: '=myProgressPerc'
        }//,
        //link: function (scope, element, attrs) {
        //    //var value = scope.$eval(attrs.myProgress);
        //    var progressbar = angular.element(element.find('div')[0]);
        //
        //    scope.$watch(attrs.myProgress, function (newValue) {
        //        if (!angular.isNumber(newValue) || isNaN(newValue)) {
        //            newValue = 0;
        //        }
        //        progressbar
        //            .css('width', newValue + '%')
        //            .attr('aria-valuenow', parseInt(newValue));
        //
        //    });
        //
        //}

    };

}


export default myProgress;