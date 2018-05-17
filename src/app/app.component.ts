import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RepositorySearchService } from './service/search/repository-search.service';
import { GithubRepositorySearchResult } from './@types/githubRepository';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { FormattingUtilsService } from './service/formattingUtils/formatting-utils.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    searchResult: GithubRepositorySearchResult = null;
    error: HttpErrorResponse = null;
    private snackBar: MatSnackBarRef<SimpleSnackBar>;

    constructor(private repositorySearch: RepositorySearchService,
                private formattingUtils: FormattingUtilsService,
                private snackBarService: MatSnackBar) {
    }

    onQuery(value: string) {
        this.error = null;
        if (value.trim() === '') {
            this.searchResult = null;
        } else {
            this.repositorySearch
                .searchRepository(value)
                .subscribe((result) => {
                    this.searchResult = result;
                }, (error: HttpErrorResponse) => {
                    this.searchResult = null;
                    this.handleError(error);
                });
        }
    }

    loadMore() {
        this.repositorySearch
            .loadNextPageOfLastRepositorySearch()
            .subscribe((result) => {
                this.searchResult.items.push(...result.items);
            }, this.handleError.bind(this));
    }

    private handleError(error: HttpErrorResponse) {
        this.error = error;

        if (this.snackBar) {
            this.snackBar.dismiss();
        }

        this.snackBar = this.snackBarService.open(this.formattingUtils.formatHttpError(this.error));
    }
}
