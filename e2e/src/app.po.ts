import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get('/');
    }

    getSearchBar() {
        return element(by.css('ghr-header input'));
    }
}
