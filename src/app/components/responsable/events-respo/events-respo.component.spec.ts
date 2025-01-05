import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsRespoComponent } from './events-respo.component';

describe('EventsRespoComponent', () => {
  let component: EventsRespoComponent;
  let fixture: ComponentFixture<EventsRespoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsRespoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsRespoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
