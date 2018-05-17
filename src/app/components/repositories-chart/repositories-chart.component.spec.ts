import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoriesChartComponent } from './repositories-chart.component';

describe('RepositoriesChartComponent', () => {
    let component: RepositoriesChartComponent;
    let fixture: ComponentFixture<RepositoriesChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepositoriesChartComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RepositoriesChartComponent);
        component = fixture.componentInstance;
        component.searchResult = {
            total_count: 0,
            incomplete_results: false,
            items: []
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
