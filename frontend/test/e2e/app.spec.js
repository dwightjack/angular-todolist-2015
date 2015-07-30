describe('Application E2E testing', () => {

    //it('should render a form', function () {
    //    browser.get('index.html');
    //    expect(element(by.tagName('form')).isPresent()).toBe(true);
    //});

    beforeEach(() => {
        browser.get('/');
    });

    it('should enable submit button when todo title is filled', () => {

        let submit = element(by.css('form .btn-primary'));
        let title = element(by.id('title'));

        expect(submit.isEnabled()).toBe(false);

        title.sendKeys('my todo');

        expect(submit.isEnabled()).toBe(true);

    });


    it('should add a todo item un button submit', () => {

        let submit = element(by.css('form .btn-primary'));
        let title = element(by.id('title'));

        title.sendKeys('my todo');


        submit.click().then(() => {
            let firstTodo = element.all(by.repeater('todo in list.todos')).last();
            expect(firstTodo.$('h1.h4').getText()).toBe('my todo');
        });

        //expect(submit.isEnabled()).toBe(true);

    });

});