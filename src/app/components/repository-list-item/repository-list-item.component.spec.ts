import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryListItemComponent } from './repository-list-item.component';

describe('RepositoryListItemComponent', () => {
  let component: RepositoryListItemComponent;
  let fixture: ComponentFixture<RepositoryListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
