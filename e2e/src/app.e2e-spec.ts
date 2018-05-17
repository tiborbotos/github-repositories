import { AppPage } from './app.po';

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
    });

    it('should load issues', () => {
    });

    it('should paginate issues', () => {
    });
});
