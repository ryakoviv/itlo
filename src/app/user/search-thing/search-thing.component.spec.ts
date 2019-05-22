import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchThingComponent } from './search-thing.component';

describe('SearchThingComponent', () => {
  let component: SearchThingComponent;
  let fixture: ComponentFixture<SearchThingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchThingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchThingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
