import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackOrdersComponent } from './stack-orders.component';

describe('StackOrdersComponent', () => {
  let component: StackOrdersComponent;
  let fixture: ComponentFixture<StackOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
