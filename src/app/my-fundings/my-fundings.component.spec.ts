import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFundingsComponent } from './my-fundings.component';

describe('MyFundingsComponent', () => {
  let component: MyFundingsComponent;
  let fixture: ComponentFixture<MyFundingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFundingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFundingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
