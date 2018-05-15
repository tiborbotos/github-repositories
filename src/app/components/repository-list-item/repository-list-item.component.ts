import { Component, Input } from '@angular/core';
import { RepositorySearchService } from '../../service/search/repository-search.service';
import { GithubIssueSearchResult, GithubRepository } from '../../@types/github';

@Component({
    selector: 'ghr-repository-list-item',
    templateUrl: './repository-list-item.component.html',
    styleUrls: ['./repository-list-item.component.less']
})
export class RepositoryListItemComponent {

    @Input()
    item: GithubRepository;

    issueSearchResult: GithubIssueSearchResult;

    constructor(private repositorySearchService: RepositorySearchService) {
    }

    loadIssues() {
        this.repositorySearchService
            .loadIssues(this.item.full_name)
            .subscribe((issueSearchResult) => {
                this.issueSearchResult = issueSearchResult;
            });
    }
}
