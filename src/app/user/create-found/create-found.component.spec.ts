import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFoundComponent } from './create-found.component';

describe('CreateFoundComponent', () => {
  let component: CreateFoundComponent;
  let fixture: ComponentFixture<CreateFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
