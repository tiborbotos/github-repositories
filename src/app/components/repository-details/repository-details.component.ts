import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GithubEnums } from '../../@types/github';
import { GithubIssueSearchResult, GithubIssue } from '../../@types/githubIssue';
import GithubIssueState = GithubEnums.GithubIssueState;
import { FormattingUtilsService } from '../../service/formattingUtils/formatting-utils.service';

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

    @Input()
    openIssuesCount: number;

    @Output()
    loadPage = new EventEmitter<number>();

    constructor(private formattingUtilsService: FormattingUtilsService) {
    }

    formatIssuesCount() {
        if (this.issueSearchResult.total_count > 0) {
            const closed = this.issueSearchResult.total_count - this.openIssuesCount;
            return `${this.openIssuesCount} open ${this.formattingUtilsService.pluralIfNeeded(this.openIssuesCount, 'issues', 'issue')},`
                + ` ${closed} closed of ${this.issueSearchResult.total_count}`;
        } else {
            return `This repository doesn't have any issue`;
        }
    }

    isOpen(issue: GithubIssue) {
        return issue.state === GithubIssueState.OPEN;
    }

    formatIssueDetails(issue: GithubIssue) {
        const created = `#${issue.number} - Created ${this.formattingUtilsService.toReadableDate(issue.created_at)} by ${issue.user.login}`;
        if (this.isOpen(issue)) {
            return created;
        } else {
            return `${created}, closed ${this.formattingUtilsService.toReadableDate(issue.closed_at)}`;
        }
    }

    loadPreviousPage() {
        this.loadPage.emit(this.paginationDetails.current_page - 1);
    }

    loadNextPage() {
        this.loadPage.emit(this.paginationDetails.current_page + 1);
    }
}
