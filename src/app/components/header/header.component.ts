import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RepositorySearchService } from '../../service/search/repository-search.service';

@Component({
    selector: 'ghr-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent {

    @Output()
    queryChange = new EventEmitter<string>();

    private previousValue;
    private updateLater;

    constructor(private repositorySearchService: RepositorySearchService) {
    }

    get isSearching() {
        return this.repositorySearchService.isSearching();
    }

    onQueryChange(query: string) {
        if (query !== this.previousValue) {
            if (this.updateLater) {
                clearTimeout(this.updateLater);
            }

            this.updateLater = setTimeout(() => {
                this.previousValue = query;
                this.queryChange.emit(query);
            }, 300);
        }
    }
}
