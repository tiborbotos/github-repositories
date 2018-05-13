import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'ghr-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

    @Output()
    onQueryChange = new EventEmitter<string>();

    private updateLater;

    constructor() {
    }

    ngOnInit() {
    }

    queryChange(query: string) {
        if (this.updateLater) {
            clearTimeout(this.updateLater);
        }

        this.updateLater = setTimeout(() => {
            this.onQueryChange.emit(query);
        }, 300);
    }
}
