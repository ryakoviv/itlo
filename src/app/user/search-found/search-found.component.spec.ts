import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFoundComponent } from './search-found.component';

describe('SearchFoundComponent', () => {
  let component: SearchFoundComponent;
  let fixture: ComponentFixture<SearchFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
