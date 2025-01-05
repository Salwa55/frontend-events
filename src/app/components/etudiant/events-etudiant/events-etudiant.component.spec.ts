import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsEtudiantComponent } from './events-etudiant.component';

describe('EventsEtudiantComponent', () => {
  let component: EventsEtudiantComponent;
  let fixture: ComponentFixture<EventsEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
