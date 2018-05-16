import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GithubEnums } from '../../@types/github';
import { GithubIssueSearchResult, GithubIssue } from '../../@types/githubIssue';
import GithubIssueState = GithubEnums.GithubIssueState;

@Component({
    selector: 'ghr-repository-details',
    templateUrl: './repository-details.component.html',
    styleUrls: ['./repository-details.component.less']
})
export class RepositoryDetailsComponent {

    @Input()
    issueSearchResult: GithubIssueSearchResult;

    @Input()
    paginationDetails: PaginationDetails;

    @Output()
    loadPage = new EventEmitter<number>();

    constructor() {
    }

    isOpen(issue: GithubIssue) {
        return issue.state === GithubIssueState.OPEN;
    }

    formatIssueDetails(issue: GithubIssue) {
        return `#${issue.number} by ${issue.user.login}`;
    }

    loadPreviousPage() {
        this.loadPage.emit(this.paginationDetails.current_page - 1);
    }

    loadNextPage() {
        this.loadPage.emit(this.paginationDetails.current_page + 1);
    }
}
