import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryListComponent } from './repository-list.component';
import { Component, Input } from '@angular/core';

@Component({selector: 'ghr-repository-list-item', template: ''})
class RepositoryListItemStubComponent {
    @Input()
    item: any;
}

@Component({selector: 'ghr-repositories-chart', template: ''})
class RepositoriesChartStubComponent {
    @Input()
    searchResult: any;
}

describe('RepositoryListComponent', () => {
    let component: RepositoryListComponent;
    let fixture: ComponentFixture<RepositoryListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepositoryListComponent, RepositoryListItemStubComponent, RepositoriesChartStubComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RepositoryListComponent);
        component = fixture.componentInstance;
        component.searchResult = null;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
