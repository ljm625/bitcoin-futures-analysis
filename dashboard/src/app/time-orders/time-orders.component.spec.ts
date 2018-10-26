import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOrdersComponent } from './time-orders.component';

describe('TimeOrdersComponent', () => {
  let component: TimeOrdersComponent;
  let fixture: ComponentFixture<TimeOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
