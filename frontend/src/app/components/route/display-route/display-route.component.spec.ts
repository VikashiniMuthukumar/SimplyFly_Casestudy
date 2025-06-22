import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRouteComponent } from './display-route.component';

describe('DisplayRouteComponent', () => {
  let component: DisplayRouteComponent;
  let fixture: ComponentFixture<DisplayRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
