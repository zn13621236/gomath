import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalPickerComponent } from './cal-picker.component';

describe('CalPickerComponent', () => {
  let component: CalPickerComponent;
  let fixture: ComponentFixture<CalPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
