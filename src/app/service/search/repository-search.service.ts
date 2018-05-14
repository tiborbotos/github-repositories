import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubRepository } from '../../@types/githubRepository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { GithubIssueSearchResult, GithubRepositorySearchResult } from '../../@types/githubSearchResult';

interface GithubRepositorySearchParameters {
    repositoryName: string;
    page?: number;
}

@Injectable({
    providedIn: 'root'
})
export class RepositorySearchService {
    readonly SEARCH_URL = 'https://api.github.com/search/repositories?q=';
    readonly SEARCH_ISSUES_URL = 'https://api.github.com/search/issues?q=repo:';

    private lastSearch: GithubRepositorySearchParameters;
    private searching: boolean;

    constructor(private http: HttpClient) {
    }

    /**
     * Is the repository search is currently ongoing
     * @returns {boolean}
     */
    isSearching() {
        return this.searching;
    }

    /**
     * Searches github using REST API by the specified repository name
     * @param {string} repositoryName name of the repository
     * @param {number} [page] page index, starting from one, optional
     * @returns {Observable<GithubRepositorySearchResult>}
     */
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
     * Loads the next page of the last repository search
     * @returns {Observable<GithubRepositorySearchResult>}
     */
    loadNextPageOfLastRepositorySearch() {
        if (!this.lastSearch.page) {
            this.lastSearch.page = 1;
        } else {
            this.lastSearch.page++;
        }
        return this.searchRepository(this.lastSearch.repositoryName, this.lastSearch.page);
    }

    /**
     * Loads github issues of a repository using REST API by the specified repository name
     * @param {string} repositoryName full name of the repository
     * @param {number} [page] page index, starting from one, optional
     * @returns {Observable<GithubRepositorySearchResult>}
     */
    loadIssues(repositoryName: string, page = 1) {
        return this.http
            .get<GithubIssueSearchResult>(`${this.SEARCH_ISSUES_URL}${repositoryName}&page=${page}`);
    }

    private limitLength(item: GithubRepository, field: string, maxLength = 150) {
        if (item[field] &&
            item[field].length > maxLength) {
            item[field] = item[field].substring(0, maxLength - 3) + '...';
        }
        return item;
    }
}
