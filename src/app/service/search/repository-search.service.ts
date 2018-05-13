import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubRepositorySearchResult } from '../../@types/githubRepository';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RepositorySearchService {
    readonly SEARCH_URL = 'https://api.github.com/search/repositories?q=';

    constructor(private http: HttpClient) {
    }

    searchRepository(repositoryName: string): Observable<GithubRepositorySearchResult> {
        return this.http
            .get<GithubRepositorySearchResult>(`${this.SEARCH_URL}${repositoryName}`);
    }
}
