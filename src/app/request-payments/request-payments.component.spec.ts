import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPaymentsComponent } from './request-payments.component';

describe('RequestPaymentsComponent', () => {
  let component: RequestPaymentsComponent;
  let fixture: ComponentFixture<RequestPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
