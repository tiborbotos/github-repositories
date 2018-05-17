import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryDetailsComponent } from './repository-details.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { RepositorySearchService } from '../../service/search/repository-search.service';
import { FormattingUtilsService } from '../../service/formattingUtils/formatting-utils.service';
import { GithubEnums } from '../../@types/github';
import { GithubIssue, GithubIssueLabel } from '../../@types/githubIssue';

class FormattingUtilsServiceStub {
    pluralIfNeeded(num, plural, singular) {
    }
}

describe('RepositoryDetailsComponent', () => {
    let component: RepositoryDetailsComponent;
    let fixture: ComponentFixture<RepositoryDetailsComponent>;
    let injectedFormattingService: FormattingUtilsService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepositoryDetailsComponent],
            imports: [MatIconModule, MatButtonModule],
            providers: [
                {provide: FormattingUtilsService, useClass: FormattingUtilsServiceStub}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RepositoryDetailsComponent);
        component = fixture.componentInstance;
        component.issueSearchResult = {
            total_count: 0,
            incomplete_results: false,
            items: []
        };

        component.paginationDetails = {
            current_page: 1,
            max_pages: 1
        };

        component.openIssuesCount = 0;

        fixture.detectChanges();
        injectedFormattingService = TestBed.get(FormattingUtilsService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should format issues count for empty list', () => {
        expect(component.formatIssuesCount()).toBe('This repository doesn\'t have any issue');
    });

    it('should format issues count for non empty issues list', () => {
        component.issueSearchResult.total_count = 4;
        component.openIssuesCount = 3;
        component.issueSearchResult.items.push(getOpenIssue());

        const pluralCallSpy = spyOn(injectedFormattingService, 'pluralIfNeeded').and.returnValue('pluralCall');

        expect(component.formatIssuesCount()).toBe('3 open pluralCall, 1 closed of 4');
        expect(pluralCallSpy).toHaveBeenCalled();
    });

    it('should be able to decide if an issue is open', () => {
        const openIssue = {state: GithubEnums.GithubIssueState.OPEN} as GithubIssue,
            closedIssue = {state: GithubEnums.GithubIssueState.CLOSED} as GithubIssue;
        expect(component.isOpen(openIssue)).toBeTruthy();
        expect(component.isOpen(closedIssue)).toBeFalsy();
    });

    it('should load previous page', () => {
        const loadPageSpy = spyOn(component.loadPage, 'emit');

        component.paginationDetails = {
            current_page: 2,
            max_pages: 2
        };
        component.loadPreviousPage();

        expect(loadPageSpy).toHaveBeenCalledWith(1);
    });

    it('should load next page', () => {
        const loadPageSpy = spyOn(component.loadPage, 'emit');

        component.paginationDetails = {
            current_page: 1,
            max_pages: 2
        };
        component.loadNextPage();

        expect(loadPageSpy).toHaveBeenCalledWith(2);
    });
});

function getOpenIssue() {
    return {
        id: 1,
        url: '',
        title: '',
        user: {
            id: 1,
            login: '',
            avatar_url: '',
            gravatar_id: '',
            url: '',
            type: GithubEnums.GithubUserType.ORGANIZATION,
        },
        state: GithubEnums.GithubIssueState.OPEN,
        locked: false,
        assignee: null,
        assignees: [],
        labels: [],
        comments: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        closed_at: new Date().toISOString(),
        author_association: null,
        body: '',
        number: 2,
        score: 1
    };
}
