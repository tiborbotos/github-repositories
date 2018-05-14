import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { RepositorySearchService } from '../../service/search/repository-search.service';

class RepositorySearchStub {
    searching = false;

    isSearching() {
        return this.searching;
    }
}

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [MatToolbarModule, MatIconModule],
            providers: [
                {provide: RepositorySearchService, useClass: RepositorySearchStub}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a search bar', () => {
        const element: HTMLElement = fixture.nativeElement;

        expect(element.querySelector('input')).toBeDefined();
    });

    it('should start a search on search bar changes', fakeAsync(() => {
        const queryString = 'xxx';
        let queriedString;
        spyOn(component.queryChange, 'emit');

        component.queryChange.subscribe((value) => {
            queriedString = value;
        });

        component.onQueryChange(queryString);
        tick(1000);
        fixture.detectChanges();

        expect(component.queryChange.emit).toHaveBeenCalledWith(queryString);
    }));

    it('should not start new search until a specific time', fakeAsync(() => {
        spyOn(component.queryChange, 'emit');

        component.onQueryChange('x');
        tick(1);
        expect(component.queryChange.emit).not.toHaveBeenCalled();

        component.onQueryChange('y');
        tick(1000);

        expect(component.queryChange.emit).toHaveBeenCalled();
    }));

    it('should not start new search for the same search request', fakeAsync(() => {
        const emitSpy = spyOn(component.queryChange, 'emit');

        component.onQueryChange('x');
        tick(1000);
        expect(component.queryChange.emit).toHaveBeenCalled();

        emitSpy.calls.reset();
        component.onQueryChange('x');
        tick(1000);

        expect(component.queryChange.emit).not.toHaveBeenCalled();
    }));
});
