import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubRepository, GithubRepositorySearchResult } from '../../@types/githubRepository';
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
                result.items = result.items.map((item) => {
                    this.limitLength(item, 'name');
                    this.limitLength(item, 'full_name');
                    this.limitLength(item, 'description', 512);
                    return item;
                });
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

    private limitLength(item: GithubRepository, field: string, maxLength = 150) {
        if (item[field] &&
            item[field].length > maxLength) {
            item[field] = item[field].substring(0, maxLength - 3) + '...';
        }
        return item;
    }
}
