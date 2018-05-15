import { Component, Input } from '@angular/core';
import { GithubIssue, GithubIssueSearchResult, GithubIssueState } from '../../@types/github';

@Component({
    selector: 'ghr-repository-details',
    templateUrl: './repository-details.component.html',
    styleUrls: ['./repository-details.component.less']
})
export class RepositoryDetailsComponent {

    @Input()
    issueSearchResult: GithubIssueSearchResult;

    constructor() {
    }

    isOpen(issue: GithubIssue) {
        return issue.state === GithubIssueState.OPEN;
    }
}
