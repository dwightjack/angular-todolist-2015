describe('Application E2E testing', () => {

    //it('should render a form', function () {
    //    browser.get('index.html');
    //    expect(element(by.tagName('form')).isPresent()).toBe(true);
    //});

    beforeEach(() => {
        browser.get('/');
    });

    it('should enable submit button when todo title is filled', () => {

        const newTitle = 'a title' + Date.now();

        let submit = element(by.css('form .btn-primary')),
            title = element(by.id('title'));

        expect(submit.isEnabled()).toBe(false);

        title.sendKeys(newTitle);

        expect(submit.isEnabled()).toBe(true);

    });


    it('should add a todo item at the end of the list on button submit', () => {

        const newTitle = 'a title' + Date.now();

        let submit = element(by.css('form .btn-primary')),
            title = element(by.id('title'));

        title.sendKeys(newTitle);


        submit.click().then(() => {
            let lastTodo = element.all(by.repeater('todo in list.todos')).last();
            expect(lastTodo.$('h1.h4').getText()).toBe(newTitle);
        });

    });

    it('should alter progressbar when a todo is completed', () => {

        let progressbar = $('.progress'),
            firstTodo = element.all(by.repeater('todo in list.todos')).first();

        progressbar.evaluate('main.getPercentage()').then((currentPerc) => {
            firstTodo.$('input[name="completed"]').click().then(() => {
                expect(progressbar.evaluate('main.getPercentage()')).not.toBe(currentPerc);
            });
        });

    });

    //it('should remove a todo when clicking on remove icon', () => {
    //
    //    let todoList = element.all(by.repeater('todo in list.todos')),
    //        count = todoList.count();
    //
    //    console.log(todoList.first().element(by.css('a.glyphicon-trash')).click());
    //    //todoList.first().element(by.css('a.glyphicon-trash')).click().then(() => {
    //    //    expect(element.all(by.repeater('todo in list.todos')).count()).toBe(count - 1);
    //    //});
    //
    //});

});