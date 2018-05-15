import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, Input } from '@angular/core';
import { RepositorySearchService } from './service/search/repository-search.service';

@Component({selector: 'ghr-header', template: ''})
class HeaderStubComponent {
}

@Component({selector: 'ghr-repository-list', template: ''})
class RepositoryListStubComponent {
    @Input()
    searchResult: any;
}

class RepositorySearchStub {
    searchRepository() {
    }

    loadMore() {
    }
}

describe('AppComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                HeaderStubComponent,
                RepositoryListStubComponent
            ],
            providers: [
                {provide: RepositorySearchService, useClass: RepositorySearchStub}
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
