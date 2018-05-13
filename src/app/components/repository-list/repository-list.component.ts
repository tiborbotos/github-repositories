import { Component, OnInit } from '@angular/core';
import { GithubRepositorySearchResult, GithubUser } from '../../@types/githubRepository';

@Component({
    selector: 'ghr-repository-list',
    templateUrl: './repository-list.component.html',
    styleUrls: ['./repository-list.component.less']
})
export class RepositoryListComponent implements OnInit {

    searchResult: GithubRepositorySearchResult;

    constructor() {
    }

    ngOnInit() {
        this.searchResult = {
            total_count: 1,
            items: [{
                id: 1,
                name: 'bootstrap',
                full_name: 'btw/bootstrap',
                owner: null,
                html_url: 'https://github.com/bootstrap',
                private: false,
                description: 'PLEASE READ THE PROJECT STATUS BELOW.  Native AngularJS (Angular) directives for Bootstrap. ' +
                'Smaller footprint (20kB gzipped), no 3rd party JS dependencies (jQuery, bootstrap JS) required. Please read ' +
                'the README.md file before submitting an issue!',
                fork: false,
                homepage: 'https://getboostrap.com',
                size: 1351,
                stargazers_count: 524,
                watchers_count: 12144,
                has_issues: true,
                has_projects: true,
                has_downloads: true,
                has_wiki: false,
                has_pages: false,
                forks_count: 4241,
                archived: false,
                open_issues_count: 3314,
                license: {name: 'MIT'},
                forks: 2411,
                open_issues: 414,
                watchers: 9381,
                score: 143.132
            }]
        };
    }

}
