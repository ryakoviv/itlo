import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLostComponent } from './search-lost.component';

describe('SearchLostComponent', () => {
  let component: SearchLostComponent;
  let fixture: ComponentFixture<SearchLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
