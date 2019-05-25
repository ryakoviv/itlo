import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditThingComponent } from './create-edit-thing.component';

describe('CreateEditThingComponent', () => {
  let component: CreateEditThingComponent;
  let fixture: ComponentFixture<CreateEditThingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditThingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditThingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
