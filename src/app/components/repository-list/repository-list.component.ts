import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GithubRepositorySearchResult } from '../../@types/githubSearchResult';

@Component({
    selector: 'ghr-repository-list',
    templateUrl: './repository-list.component.html',
    styleUrls: ['./repository-list.component.less']
})
export class RepositoryListComponent {

    @Input()
    searchResult: GithubRepositorySearchResult;

    @Output()
    loadMore = new EventEmitter<void>();

    constructor() {
    }

    get hasStatusMessage() {
        return this.isStatusNoResult ||
            this.isStatusEmptySearchResult;
    }

    get isStatusNoResult() {
        return !this.searchResult;
    }

    get isStatusEmptySearchResult() {
        return this.searchResult && this.searchResult.total_count === 0;
    }

    get isStatusIncompleteResult() {
        return this.searchResult && this.searchResult.incomplete_results;
    }

    onLoadMoreClicked() {
        this.loadMore.emit();
    }

    formatResultCount() {
        if (this.searchResult && this.searchResult.total_count > 0) {
            if (this.searchResult.items.length < this.searchResult.total_count) {
                return `Found ${this.searchResult.total_count} repository, displayed ${this.searchResult.items.length}`;
            } else {
                return `Found ${this.searchResult.total_count} repository`;
            }
        }
    }
}
