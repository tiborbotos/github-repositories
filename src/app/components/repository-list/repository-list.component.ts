import { Component, Input, OnInit } from '@angular/core';
import { GithubRepositorySearchResult, GithubUser } from '../../@types/githubRepository';

@Component({
    selector: 'ghr-repository-list',
    templateUrl: './repository-list.component.html',
    styleUrls: ['./repository-list.component.less']
})
export class RepositoryListComponent {

    @Input()
    searchResult: GithubRepositorySearchResult;

    constructor() {
    }

    get hasStatusMessage() {
        return !this.searchResult ||
            (this.searchResult && this.searchResult.total_count === 0);
    }

    loadMore() {
    }

}
