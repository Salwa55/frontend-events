import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDispoComponent } from './events-dispo.component';

describe('EventsDispoComponent', () => {
  let component: EventsDispoComponent;
  let fixture: ComponentFixture<EventsDispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsDispoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsDispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
