import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeOrdersComponent } from './volume-orders.component';

describe('VolumeOrdersComponent', () => {
  let component: VolumeOrdersComponent;
  let fixture: ComponentFixture<VolumeOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
