import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryDetailsComponent } from './repository-details.component';
import { MatButtonModule, MatIconModule } from '@angular/material';

describe('RepositoryDetailsComponent', () => {
    let component: RepositoryDetailsComponent;
    let fixture: ComponentFixture<RepositoryDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepositoryDetailsComponent],
            imports: [MatIconModule, MatButtonModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RepositoryDetailsComponent);
        component = fixture.componentInstance;
        component.issueSearchResult = {
            total_count: 1,
            incomplete_results: false,
            items: []
        };

        component.paginationDetails = {
            current_page: 1,
            max_pages: 1
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
