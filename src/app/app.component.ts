import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GithubRepositorySearchResult } from './@types/githubRepository';
import { map } from 'rxjs/internal/operators';
import { RepositorySearchService } from './service/search/repository-search.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    searchResult: GithubRepositorySearchResult = null;
    error: HttpErrorResponse = null;

    constructor(private repositorySearch: RepositorySearchService) {
    }

    onQuery(value: string) {
        this.error = null;
        this.repositorySearch
            .searchRepository(value)
            .subscribe((result) => {
                this.searchResult = result;
            }, (error: HttpErrorResponse) => {
                this.searchResult = null;
                this.error = error;
            });
    }

    loadMore() {
        this.repositorySearch
            .loadMore()
            .subscribe((result) => {
                this.searchResult.items.push(...result.items);
            }, (error: HttpErrorResponse) => {
                this.error = error;
            });
    }
}
