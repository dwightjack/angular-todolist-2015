describe('Progress directive tests', () => {
    let $rootScope, $compile, $scope, compiledElement;

    beforeEach(angular.mock.module(require('app/application').name));

    beforeEach(() => {

        angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
            $scope = $rootScope.$new();
            $scope.progress = 10;
        });

        compiledElement = $compile('<article my-progress my-progress-perc="progress">test</article>')($scope);
        $scope.$digest();
    });

    it('should pass a percentage value to the isolated scope', function () {

        let isolateScope = compiledElement.isolateScope();

        expect(isolateScope.perc).toBe(10);

        //changing outer scope
        $scope.progress = 30;
        $scope.$digest();
        expect(isolateScope.perc).toBe(30);

    });

    it('should replace containing element', function () {

        expect(compiledElement[0].tagName).not.toBe('ARTICLE');

    });

    it('should transclude text', function () {

        let text = compiledElement[0].querySelector('.progress-bar').innerText;

        expect(text).toBe('test');

    });


    it('should generate a boostrap progress bar', function () {

        var child = angular.element(compiledElement.find('div')[0]);

        expect(compiledElement.attr('class')).toContain('progress');
        expect(child.attr('class')).toContain('progress-bar');
        expect(child.css('width')).toBe('10%');

    });
});
