import { AppPage } from './app.po';
import { browser, by, element, protractor } from 'protractor';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should start the application', () => {
        page.navigateTo();
        expect(page.getSearchBar().getAttribute('placeholder')).toContain('Search');
    });

    it('should be able to search for a github repository', () => {
        element(by.css('input')).sendKeys('angular/angular');

        browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.css('.result-count'))));

        expect(element(by.css('.result-count')).getText()).toContain('repository, displayed 30');
        expect(element.all(by.css('.item')).get(1).getText()).toContain('angular/angular');
    });

    it('should load issues', () => {
        element.all(by.css('.details--issues')).get(1).click();

        browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.css('ghr-repository-details'))));

        expect(element.all(by.css('ghr-repository-details .issue')).count()).toBeGreaterThan(0);
    });
});
