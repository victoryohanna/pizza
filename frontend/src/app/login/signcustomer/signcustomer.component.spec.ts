import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigncustomerComponent } from './signcustomer.component';

describe('SigncustomerComponent', () => {
  let component: SigncustomerComponent;
  let fixture: ComponentFixture<SigncustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigncustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigncustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
