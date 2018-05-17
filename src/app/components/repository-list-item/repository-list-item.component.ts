import { Component, Input } from '@angular/core';
import { RepositorySearchService } from '../../service/search/repository-search.service';
import { GithubIssueSearchResult } from '../../@types/githubIssue';
import { GithubRepository } from '../../@types/githubRepository';
import { FormattingUtilsService } from '../../service/formattingUtils/formatting-utils.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'ghr-repository-list-item',
    templateUrl: './repository-list-item.component.html',
    styleUrls: ['./repository-list-item.component.less']
})
export class RepositoryListItemComponent {

    @Input()
    item: GithubRepository;

    issueSearchResult: GithubIssueSearchResult;
    isLoading = false;
    issuesLoaded = false;
    paginationDetails: PaginationDetails;

    constructor(private repositorySearchService: RepositorySearchService,
                private formattingUtils: FormattingUtilsService,
                private snackBarService: MatSnackBar) {
    }

    closeIssues($event) {
        $event.stopPropagation();
        this.issuesLoaded = false;
        this.isLoading = false;
        this.issueSearchResult = null;
        this.paginationDetails = null;
    }

    loadIssues() {
        if (!this.issuesLoaded) {
            this.isLoading = true;
            this.repositorySearchService
                .loadIssues(this.item.full_name)
                .subscribe(this.updateSearchResult.bind(this), this.handleError.bind(this));
        }
    }

    loadPage(page: number) {
        this.isLoading = true;
        this.repositorySearchService
            .loadIssues(this.item.full_name, page)
            .subscribe((issueSearchResult) => {
                this.updateSearchResult(issueSearchResult, page);
            }, this.handleError.bind(this));
    }

    largeIntegerToReadable(num: number) {
        return this.formattingUtils.largeIntegerToReadable(num);
    }

    private updateSearchResult(issueSearchResult: GithubIssueSearchResult,
                               requestedPage: number) {
        this.issueSearchResult = issueSearchResult;
        this.issuesLoaded = true;
        this.isLoading = false;
        this.updatePaginationDetails(issueSearchResult, requestedPage);
    }

    private updatePaginationDetails(issueSearchResult: GithubIssueSearchResult,
                                    requestedPage = 1) {
        const max_pages = Math.ceil(issueSearchResult.total_count / this.repositorySearchService.maxIssuesDisplayedPerPage);

        this.paginationDetails = {
            max_pages,
            current_page: requestedPage
        };
    }

    private handleError(error: HttpErrorResponse) {
        this.snackBarService.open(this.formattingUtils.formatHttpError(error), 'Dismiss');
    }
}
