import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryListItemComponent } from './repository-list-item.component';
import { MatIconModule } from '@angular/material';

describe('RepositoryListItemComponent', () => {
    let component: RepositoryListItemComponent;
    let fixture: ComponentFixture<RepositoryListItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepositoryListItemComponent],
            imports: [MatIconModule]
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
});
