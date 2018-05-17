import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GithubEnums } from '../../@types/github';
import { GithubIssueSearchResult, GithubIssue } from '../../@types/githubIssue';
import GithubIssueState = GithubEnums.GithubIssueState;
import { DateFormatterService } from '../../service/dateFormatter/date-formatter.service';

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

    constructor(private dateFormatter: DateFormatterService) {
    }

    isOpen(issue: GithubIssue) {
        return issue.state === GithubIssueState.OPEN;
    }

    formatIssueDetails(issue: GithubIssue) {
        const created = `#${issue.number} - Created ${this.dateFormatter.toReadableDate(issue.created_at)} by ${issue.user.login}`;
        if (this.isOpen(issue)) {
            return created;
        } else {
            return `${created}, closed ${this.dateFormatter.toReadableDate(issue.closed_at)}`;
        }
    }

    loadPreviousPage() {
        this.loadPage.emit(this.paginationDetails.current_page - 1);
    }

    loadNextPage() {
        this.loadPage.emit(this.paginationDetails.current_page + 1);
    }
}
