import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubRepositorySearchResult } from '../../@types/githubRepository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

interface GithubRepositorySearchParameters {
    repositoryName: string;
    page?: number;
}

@Injectable({
    providedIn: 'root'
})
export class RepositorySearchService {
    readonly SEARCH_URL = 'https://api.github.com/search/repositories?q=';

    private lastSearch: GithubRepositorySearchParameters;
    private searching: boolean;

    constructor(private http: HttpClient) {
    }

    isSearching() {
        return this.searching;
    }

    searchRepository(repositoryName: string, page = 1): Observable<GithubRepositorySearchResult> {
        this.lastSearch = {
            repositoryName,
            page
        };
        this.searching = true;

        return this.http
            .get<GithubRepositorySearchResult>(`${this.SEARCH_URL}${repositoryName}&page=${page}`)
            .pipe(map((result) => {
                this.searching = false;
                return result;
            }));
    }

    /**
     * Loads the next page of the previous search
     * @returns {Observable<GithubRepositorySearchResult>}
     */
    loadMore() {
        if (!this.lastSearch.page) {
            this.lastSearch.page = 1;
        } else {
            this.lastSearch.page++;
        }
        return this.searchRepository(this.lastSearch.repositoryName, this.lastSearch.page);
    }
}
