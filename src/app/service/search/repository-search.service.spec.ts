import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { RepositorySearchService } from './repository-search.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubRepositorySearchResult } from '../../@types/github';

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
        const dummyRes = getDummyResponse(),
            searchQuery = 'foo';

        service.searchRepository(searchQuery).subscribe(result => {
            expect(result.total_count).toBe(dummyRes.total_count);
        });

        const req = httpMock.expectOne(`${service.SEARCH_URL}${searchQuery}&page=1`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyRes);
    });

    it('should load second page of last searched repository', () => {
        const dummyResPage1 = getDummyResponse(1),
            dummyResPage2 = getDummyResponse(2),
            searchQuery = 'foo';

        service.searchRepository(searchQuery).subscribe((page1) => {
            expect(page1.total_count).toBe(dummyResPage1.total_count);

            // send second request
            service.loadNextPageOfLastRepositorySearch().subscribe((page2) => {
                expect(page2.total_count).toBe(dummyResPage2.total_count);
            });
        });

        const req1 = httpMock.expectOne(`${service.SEARCH_URL}${searchQuery}&page=1`);
        expect(req1.request.method).toBe('GET');
        req1.flush(dummyResPage1);

        const req2 = httpMock.expectOne(`${service.SEARCH_URL}${searchQuery}&page=2`);
        expect(req2.request.method).toBe('GET');
        req2.flush(dummyResPage2);

    });

    function getDummyResponse(total_count = 0): GithubRepositorySearchResult {
        return {
            total_count,
            incomplete_results: false,
            items: []
        };
    }
});
