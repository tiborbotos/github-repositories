import { TestBed, async, inject, getTestBed } from '@angular/core/testing';

import { RepositorySearchService } from './repository-search.service';
import { HttpClient, HttpClientModule, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubRepositorySearchResult } from '../../@types/githubRepository';

describe('RepositorySearchService', () => {
    let injector;
    let service: RepositorySearchService;
    let httpMock: HttpTestingController;


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RepositorySearchService],
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ]
        });

        injector = getTestBed();
        service = injector.get(RepositorySearchService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
        backend.verify();
    }));

    it('should call github api and return an Observable', () => {
        const dummyRes: GithubRepositorySearchResult = {
            total_count: 0,
            items: []
        };

        service.searchRepository('foo').subscribe(result => {
            expect(result.total_count).toBe(0);
        });

        const req = httpMock.expectOne(`${service.SEARCH_URL}foo`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyRes);
    });
});
