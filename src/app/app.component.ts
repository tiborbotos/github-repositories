import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubRepositorySearchResult } from './@types/githubRepository';
import { map } from 'rxjs/internal/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    constructor() {
    }
}
