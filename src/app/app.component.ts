import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    constructor(private repositorySearch: RepositorySearchService) {
    }

    onQuery(value: string) {
        console.log(value);
        this.repositorySearch
            .searchRepository(value)
            .subscribe((result) => {
                this.searchResult = result;
            });
    }
}
