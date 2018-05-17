import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryListItemComponent } from './repository-list-item.component';
import { MatIconModule, MatSnackBar } from '@angular/material';
import { Component, Input } from '@angular/core';
import { RepositorySearchService } from '../../service/search/repository-search.service';
import { Observable, Subscriber } from 'rxjs';
import { FormattingUtilsService } from '../../service/formattingUtils/formatting-utils.service';

@Component({selector: 'ghr-repository-details', template: ''})
class RepositoryDetailsStubComponent {
    @Input()
    issueSearchResult: any;

    @Input()
    paginationDetails: any;

    @Input()
    openIssuesCount: any;

    @Input()
    disablePagination: any;
}

class RepositorySearchStub {
    maxIssuesDisplayedPerPage: 2;
    loadIssues() {}
}

class FormattingUtilsServiceStub {
    largeIntegerToReadable() {}
    formatHttpError() {
    }
}

class MatSnackBarStub {
    open() {
    }
}

describe('RepositoryListItemComponent', () => {
    let component: RepositoryListItemComponent;
    let fixture: ComponentFixture<RepositoryListItemComponent>;
    let injectedSearchService: RepositorySearchService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepositoryListItemComponent, RepositoryDetailsStubComponent],
            imports: [MatIconModule],
            providers: [
                {provide: RepositorySearchService, useClass: RepositorySearchStub},
                {provide: FormattingUtilsService, useClass: FormattingUtilsServiceStub},
                {provide: MatSnackBar, useClass: MatSnackBarStub}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RepositoryListItemComponent);
        component = fixture.componentInstance;
        component.item = {
            id: 1,
            name: 'foo',
            full_name: 'xx/foo',
            owner: null,
            private: false,
            description: 'bar',
            fork: false,
            html_url: 'http://foo.bar',
            homepage: 'xxx',
            size: 1,
            stargazers_count: 2,
            watchers_count: 3,
            has_issues: false,
            has_projects: false,
            has_downloads: false,
            has_wiki: false,
            has_pages: false,
            forks_count: 0,
            archived: false,
            open_issues_count: 4,
            license: null,
            forks: 5,
            open_issues: 6,
            watchers: 7,
            score: 8
        };
        fixture.detectChanges();
        injectedSearchService = TestBed.get(RepositorySearchService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display basic information', () => {
        const text = fixture.nativeElement.textContent;
        expect(text).toContain(component.item.full_name);
        expect(text).toContain(component.item.html_url);
        expect(text).toContain(component.item.description);
    });

    it('should load issues', () => {
        const dummyResult = {
            total_count: 1
        };

        const loadIssuesSpy = spyOn(injectedSearchService, 'loadIssues')
            .and
            .returnValue(Observable.create((observer) => {
                observer.next(dummyResult);
                observer.complete();
            }));

        component.loadIssues();

        expect(loadIssuesSpy).toHaveBeenCalled();
    });
});
