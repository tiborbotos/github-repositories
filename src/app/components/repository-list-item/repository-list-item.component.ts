import { Component, Input, OnInit } from '@angular/core';
import { GithubRepository } from '../../@types/githubRepository';

@Component({
    selector: 'ghr-repository-list-item',
    templateUrl: './repository-list-item.component.html',
    styleUrls: ['./repository-list-item.component.less']
})
export class RepositoryListItemComponent {

    @Input()
    item: GithubRepository;

    constructor() {
    }

}
